import { createHash } from 'node:crypto';

export async function installScopedPreviewBypass(context, origin, token) {
  await context.route('**/*', async route => {
    if (new URL(route.request().url()).origin !== origin) return route.continue();
    // Fulfil redirects without following them with a private header. The next
    // browser request passes through the origin check independently.
    const response = await route.fetch({ headers: { ...route.request().headers(), 'x-vercel-protection-bypass': token }, maxRedirects: 0 });
    return route.fulfill({ response });
  });
}

function imageEvidence(record, status, contentType, body) {
  const expected = { bytes: record.image.bytes, sha256: record.image.sha256 };
  const downloaded = { bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') };
  const issues = [];
  if (status !== 200) issues.push(`HTTP ${status}`);
  if (!/^image\/webp(?:;|$)/i.test(contentType)) issues.push('Expected image/webp');
  if (downloaded.bytes !== expected.bytes) issues.push('Byte count differs from registry');
  if (downloaded.sha256 !== expected.sha256) issues.push('SHA-256 differs from registry');
  return { slug: record.slug, path: record.image.path, status, contentType, expected, downloaded, passed: issues.length === 0, issues };
}

/** Use the supported browser CDP capability; keeps existing authentication in the browser. */
export async function inspectAuthenticatedBrowserDesignImage(tab, cdp, base, record) {
  const url = new URL(record.image.path, base).href;
  const methods = ['Network.responseReceived'];
  let { cursor } = await cdp.readEvents({ methods });
  await tab.goto(url);
  let responseEvent;
  let hasMore;
  do {
    const result = await cdp.readEvents({ methods, afterSequence: cursor });
    responseEvent ??= result.events.find(event => event.params?.response?.url === url);
    cursor = result.cursor;
    hasMore = result.hasMore;
  } while (hasMore && !responseEvent);
  if (!responseEvent) throw new Error('Original image HTTP response was not captured');
  const response = responseEvent.params.response;
  const responseBody = await cdp.send('Network.getResponseBody', { requestId: responseEvent.params.requestId });
  const body = Buffer.from(responseBody.body, responseBody.base64Encoded ? 'base64' : 'utf8');
  const contentType = Object.entries(response.headers ?? {}).find(([name]) => name.toLowerCase() === 'content-type')?.[1] ?? response.mimeType ?? '';
  return imageEvidence(record, response.status, contentType, body);
}

/** Inspect the actual HTTP response body, including non-image error responses. */
export async function inspectRemoteDesignImage(request, base, record) {
  const url = new URL(record.image.path, base);
  const expected = { bytes: record.image.bytes, sha256: record.image.sha256 };
  try {
    const response = await request.get(url.href, { maxRedirects: 0, timeout: 30000 });
    const body = await response.body();
    const contentType = response.headers()['content-type'] ?? '';
    return imageEvidence(record, response.status(), contentType, body);
  } catch (error) {
    // Never include raw request diagnostics, which can contain authentication headers.
    return { slug: record.slug, path: url.pathname, status: null, contentType: null, expected, downloaded: null, passed: false, issues: [error.name === 'TimeoutError' ? 'Request timed out' : 'Request failed before a complete response was received'] };
  }
}

export function isPermittedDesignQaBase(base, live, previewHost) {
  if (base.username || base.password || base.search || base.hash || base.pathname !== '/') return false;
  if (['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) return ['http:', 'https:'].includes(base.protocol);
  const production = ['jufaja-homes-platform.vercel.app', 'www.jufajaconstructions.com.au', 'jufajaconstructions.com.au'];
  const explicitPreview = previewHost === base.hostname && /^jufaja-homes-platform-[a-z0-9-]+-abubakerasif202s-projects\.vercel\.app$/.test(previewHost);
  return live === 'true' && base.protocol === 'https:' && (production.includes(base.hostname) || explicitPreview);
}
