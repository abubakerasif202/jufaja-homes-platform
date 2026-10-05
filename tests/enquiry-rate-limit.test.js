const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-typescript.cjs');
const { consumeEnquiryRateLimit } = load('src/lib/server/enquiry-rate-limit.ts');

const request = ip => new Request('https://example.com/api/enquiry', {
  headers: ip ? { 'x-vercel-forwarded-for': ip } : {},
});

test('production enquiry rate limiting fails closed and validates the shared counter', async () => {
  const originalFetch = global.fetch;
  const keys = ['NODE_ENV', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'];
  const originalEnvironment = keys.map(key => process.env[key]);
  try {
    process.env.NODE_ENV = 'production';
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    assert.equal((await consumeEnquiryRateLimit(request('192.0.2.1'))).status, 'unavailable');

    process.env.UPSTASH_REDIS_REST_URL = 'https://qa-placeholder.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-placeholder';
    global.fetch = async () => { throw new Error('Missing or malformed client IP must not reach the provider'); };
    assert.equal((await consumeEnquiryRateLimit(request())).status, 'unavailable');
    assert.equal((await consumeEnquiryRateLimit(request('invalid-ip'))).status, 'unavailable');

    for (const count of [1, 5]) {
      global.fetch = async (_url, options) => {
        const command = JSON.parse(options.body);
        assert.equal(command[0], 'EVAL');
        assert.ok(!command[3].includes('192.0.2.1'), 'stored counter key must not expose the raw IP');
        return new Response(JSON.stringify({ result: count }));
      };
      assert.equal((await consumeEnquiryRateLimit(request('192.0.2.1'))).status, 'allowed');
    }
    global.fetch = async () => new Response(JSON.stringify({ result: 6 }));
    const limited = await consumeEnquiryRateLimit(request('192.0.2.1'));
    assert.equal(limited.status, 'limited');
    assert.ok(limited.retryAfterSeconds >= 1 && limited.retryAfterSeconds <= 600);

    for (const payload of [{ result: true }, { result: '1' }, { result: 0 }, { result: 1.5 }, {}, null]) {
      global.fetch = async () => new Response(JSON.stringify(payload));
      assert.equal((await consumeEnquiryRateLimit(request('192.0.2.1'))).status, 'unavailable');
    }
    global.fetch = async () => new Response('{}', { status: 503 });
    assert.equal((await consumeEnquiryRateLimit(request('192.0.2.1'))).status, 'unavailable');
    global.fetch = async () => { throw new Error('provider unavailable'); };
    assert.equal((await consumeEnquiryRateLimit(request('192.0.2.1'))).status, 'unavailable');
  } finally {
    global.fetch = originalFetch;
    keys.forEach((key, index) => {
      if (originalEnvironment[index] === undefined) delete process.env[key];
      else process.env[key] = originalEnvironment[index];
    });
  }
});
