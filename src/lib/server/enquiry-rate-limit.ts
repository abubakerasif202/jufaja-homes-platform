import { createHash, createHmac } from 'node:crypto';
import { isIP } from 'node:net';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_LOCAL_KEYS = 1_000;
const UPSTASH_TIMEOUT_MS = 2_500;

type LimitResult =
  | { status: 'allowed' }
  | { status: 'limited'; retryAfterSeconds: number }
  | { status: 'unavailable' };

type LocalEntry = { count: number; expiresAt: number };

const runtimeGlobal = globalThis as typeof globalThis & {
  __jufajaEnquiryRateLimit?: Map<string, LocalEntry>;
};
const localCounters = (runtimeGlobal.__jufajaEnquiryRateLimit ??= new Map());

const script = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('PEXPIRE', KEYS[1], ARGV[1])
end
return count
`;

function requestIp(request: Request): string | null {
  const header = request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for');
  const candidate = header?.split(',', 1)[0]?.trim();
  return candidate && isIP(candidate) ? candidate : null;
}

function checkLocalLimit(fingerprint: string, now: number): LimitResult {
  for (const [key, entry] of localCounters) {
    if (entry.expiresAt <= now) localCounters.delete(key);
  }

  const current = localCounters.get(fingerprint);
  if (!current || current.expiresAt <= now) {
    if (localCounters.size >= MAX_LOCAL_KEYS) {
      const oldest = localCounters.keys().next().value;
      if (oldest) localCounters.delete(oldest);
    }
    localCounters.set(fingerprint, { count: 1, expiresAt: now + WINDOW_MS });
    return { status: 'allowed' };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      status: 'limited',
      retryAfterSeconds: Math.max(1, Math.ceil((current.expiresAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { status: 'allowed' };
}

export async function consumeEnquiryRateLimit(request: Request): Promise<LimitResult> {
  const now = Date.now();
  const ip = requestIp(request);
  const isProduction = process.env.NODE_ENV === 'production';
  if (!ip && isProduction) return { status: 'unavailable' };

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url && !token) {
    if (isProduction) return { status: 'unavailable' };
    const fingerprint = createHash('sha256').update(ip ?? 'local-development').digest('hex');
    return checkLocalLimit(fingerprint, now);
  }
  if (!url || !token) return { status: 'unavailable' };

  let endpoint: URL;
  try {
    endpoint = new URL(url);
  } catch {
    return { status: 'unavailable' };
  }
  if (endpoint.protocol !== 'https:' || !endpoint.hostname.endsWith('.upstash.io')) {
    return { status: 'unavailable' };
  }

  const bucket = Math.floor(now / WINDOW_MS);
  const fingerprint = createHmac('sha256', token).update(ip ?? 'local-development').digest('hex');
  const key = `jufaja:enquiry:v1:${fingerprint}:${bucket}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(['EVAL', script, '1', key, String(WINDOW_MS * 2)]),
      cache: 'no-store',
      signal: AbortSignal.timeout(UPSTASH_TIMEOUT_MS),
    });
    if (!response.ok) return { status: 'unavailable' };

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== 'object' || !('result' in payload)) {
      return { status: 'unavailable' };
    }
    const count = payload.result;
    if (typeof count !== 'number' || !Number.isSafeInteger(count) || count < 1) {
      return { status: 'unavailable' };
    }
    if (count <= MAX_REQUESTS) return { status: 'allowed' };

    return {
      status: 'limited',
      retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now % WINDOW_MS)) / 1000)),
    };
  } catch {
    return { status: 'unavailable' };
  }
}
