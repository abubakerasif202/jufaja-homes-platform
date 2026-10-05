const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const { POST } = load('src/app/api/enquiry/route.ts', {
  '@/lib/server/enquiry-rate-limit': { consumeEnquiryRateLimit: async () => ({ status: 'allowed' }) },
});
const request = body => new Request('http://localhost/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const valid = { name: 'QA Test', email: 'qa@example.com', phone: '0412345678', enquiryType: 'Home design', targetDesignName: 'Blaxland Series', message: 'Test only' };

test('actual route rejects incomplete, malformed and oversized submissions without delivery', async () => {
  for (const [body, status] of [[{}, 400], [{ ...valid, email: 'invalid' }, 400], [{ ...valid, phone: '123' }, 400], [{ ...valid, phone: 'not-a-phone0412345678' }, 400], [{ ...valid, message: 'x'.repeat(21000) }, 413]]) {
    assert.equal((await POST(request(body))).status, status);
  }
  assert.equal((await POST(new Request('http://localhost/api/enquiry', { method: 'POST', body: '{}' }))).status, 415);
});

test('actual route retains enquiry context, reports delivery failures and traps spam', async () => {
  const originalFetch = global.fetch;
  const keys = ['RESEND_API_KEY', 'ENQUIRY_TO_EMAIL', 'ENQUIRY_FROM_EMAIL'];
  const originalEnvironment = keys.map(key => process.env[key]);
  try {
    process.env.RESEND_API_KEY = 'test-placeholder';
    process.env.ENQUIRY_TO_EMAIL = 'team@example.com';
    process.env.ENQUIRY_FROM_EMAIL = 'website@example.com';
    let delivered;
    global.fetch = async (_url, options) => {
      delivered = JSON.parse(options.body);
      return new Response(JSON.stringify({ id: 'mock-delivery' }), { status: 200 });
    };
    assert.equal((await POST(request(valid))).status, 200);
    assert.match(delivered.text, /Design or package: Blaxland Series/);
    assert.match(delivered.text, /Enquiry type: Home design/);
    assert.equal(delivered.reply_to, 'qa@example.com');
    assert.equal(delivered.subject, 'Website enquiry: Home design');
    for (const payload of [{}, { id: '' }, { id: 123 }, null]) {
      global.fetch = async () => new Response(JSON.stringify(payload), { status: 200 });
      assert.equal((await POST(request(valid))).status, 502, 'unconfirmed provider response must not report success');
    }
    global.fetch = async () => new Response('invalid json', { status: 200 });
    assert.equal((await POST(request(valid))).status, 502);
    global.fetch = async () => new Response('{}', { status: 500 });
    const failed = await POST(request(valid));
    assert.equal(failed.status, 502);
    assert.equal((await failed.json()).success, false);
    global.fetch = async () => { throw new Error('Spam must not attempt delivery'); };
    assert.equal((await POST(request({ ...valid, honeypot: 'spam' }))).status, 200);
    delete process.env.RESEND_API_KEY;
    assert.equal((await POST(request(valid))).status, 503);
  } finally {
    global.fetch = originalFetch;
    keys.forEach((key, i) => { if (originalEnvironment[i] === undefined) delete process.env[key]; else process.env[key] = originalEnvironment[i]; });
  }
});
