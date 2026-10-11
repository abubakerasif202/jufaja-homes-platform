const test = require('node:test');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { createServer } = require('node:http');
const { chromium } = require('playwright');

test('Preview bypass header cannot follow a redirect to a second origin', async () => {
  const { installScopedPreviewBypass } = await import('../scripts/remote-design-image-verification.mjs');
  const received = [];
  const destination = createServer((req, res) => { received.push({ origin: 'destination', token: req.headers['x-vercel-protection-bypass'] }); res.end('destination'); });
  await new Promise(resolve => destination.listen(0, '127.0.0.1', resolve));
  const destinationOrigin = `http://127.0.0.1:${destination.address().port}`;
  const source = createServer((req, res) => { received.push({ origin: 'source', token: req.headers['x-vercel-protection-bypass'] }); res.writeHead(302, { location: destinationOrigin }); res.end(); });
  await new Promise(resolve => source.listen(0, '127.0.0.1', resolve));
  const sourceOrigin = `http://127.0.0.1:${source.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'msedge' });
    const context = await browser.newContext();
    await installScopedPreviewBypass(context, sourceOrigin, 'disposable-test-token');
    const page = await context.newPage();
    await page.goto(sourceOrigin);
    assert.equal(received.find(item => item.origin === 'source').token, 'disposable-test-token');
    assert(received.some(item => item.origin === 'destination'));
    assert(received.filter(item => item.origin === 'destination').every(item => item.token === undefined));
  } finally {
    await browser?.close();
    await Promise.all([new Promise(resolve => source.close(resolve)), new Promise(resolve => destination.close(resolve))]);
  }
});

test('remote image evidence hashes downloaded bytes and rejects HTML authentication responses', async () => {
  const { inspectRemoteDesignImage } = await import('../scripts/remote-design-image-verification.mjs');
  const expectedBody = Buffer.from('expected webp bytes');
  const actualBody = Buffer.from('<html>Authentication required</html>');
  const record = { slug: 'example', image: { path: '/images/designs/example.webp', bytes: expectedBody.length, sha256: createHash('sha256').update(expectedBody).digest('hex') } };
  let requested;
  const request = { get: async (url, options) => {
    requested = { url, options };
    return { status: () => 401, headers: () => ({ 'content-type': 'text/html; charset=utf-8' }), body: async () => actualBody };
  } };
  const result = await inspectRemoteDesignImage(request, new URL('https://example.test'), record);
  assert.equal(requested.url, 'https://example.test/images/designs/example.webp');
  assert.equal(requested.options.maxRedirects, 0);
  assert.equal(result.status, 401);
  assert.equal(result.contentType, 'text/html; charset=utf-8');
  assert.equal(result.downloaded.sha256, createHash('sha256').update(actualBody).digest('hex'));
  assert.equal(result.downloaded.bytes, actualBody.length);
  assert.equal(result.passed, false);
  assert.equal(result.issues.length, 4);
});

test('remote image succeeds only on image/webp, HTTP 200 and actual matching bytes', async () => {
  const { inspectRemoteDesignImage } = await import('../scripts/remote-design-image-verification.mjs');
  const body = Buffer.from('webp bytes');
  const record = { slug: 'example', image: { path: '/images/designs/example.webp', bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') } };
  const request = { get: async () => ({ status: () => 200, headers: () => ({ 'content-type': 'image/webp' }), body: async () => body }) };
  assert.equal((await inspectRemoteDesignImage(request, new URL('https://example.test'), record)).passed, true);
});

test('QA accepts only explicitly named project previews and omits credential-bearing URLs', async () => {
  const { isPermittedDesignQaBase } = await import('../scripts/remote-design-image-verification.mjs');
  const host = 'jufaja-homes-platform-j0cwrn857-abubakerasif202s-projects.vercel.app';
  assert.equal(isPermittedDesignQaBase(new URL(`https://${host}`), 'true', host), true);
  assert.equal(isPermittedDesignQaBase(new URL(`https://${host}`), 'true', ''), false);
  assert.equal(isPermittedDesignQaBase(new URL(`https://${host}`), 'false', host), false);
  assert.equal(isPermittedDesignQaBase(new URL('https://other.vercel.app'), 'true', 'other.vercel.app'), false);
  assert.equal(isPermittedDesignQaBase(new URL(`https://${host}?secret=example`), 'true', host), false);
});

test('authenticated browser evidence hashes network body with actual HTTP content type', async () => {
  const { inspectAuthenticatedBrowserDesignImage } = await import('../scripts/remote-design-image-verification.mjs');
  const body = Buffer.from('downloaded authenticated bytes');
  const record = { slug: 'example', image: { path: '/images/designs/example.webp', bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') } };
  const url = 'https://example.test/images/designs/example.webp';
  let navigated;
  let calls = 0;
  const cdp = {
    readEvents: async () => (++calls === 1 ? { cursor: 1, events: [] } : { cursor: 2, hasMore: false, events: [{ params: { requestId: 'actual-request', response: { url, status: 200, mimeType: 'image/webp', headers: { 'Content-Type': 'image/webp' } } } }] }),
    send: async (method, params) => {
      assert.equal(method, 'Network.getResponseBody');
      assert.equal(params.requestId, 'actual-request');
      return { body: body.toString('base64'), base64Encoded: true };
    },
  };
  const result = await inspectAuthenticatedBrowserDesignImage({ goto: async value => { navigated = value; } }, cdp, new URL('https://example.test'), record);
  assert.equal(navigated, url);
  assert.equal(result.passed, true);
  assert.equal(result.contentType, 'image/webp');
  assert.equal(result.downloaded.sha256, record.image.sha256);
});
