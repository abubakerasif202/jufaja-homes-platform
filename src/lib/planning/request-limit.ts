// Per-instance protection bounds upstream concurrency and request bursts. For a
// multi-instance deployment also configure the hosting firewall's shared quota.
const clients = new Map<string, { count: number; reset: number }>();
let active = 0;
export function acquirePlanningRequest(request: Request): (() => void) | null {
  const now = Date.now();
  for (const [key, entry] of clients) if (entry.reset <= now) clients.delete(key);
  const key = ((request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for'))?.split(',')[0]?.trim() || 'unknown').slice(0, 80);
  const entry = clients.get(key);
  if (active >= 6 || (entry && entry.count >= 20) || (!entry && clients.size >= 1000)) return null;
  clients.set(key, { count: (entry?.count || 0) + 1, reset: entry?.reset || now + 60_000 });
  active++;
  let released = false;
  return () => { if (!released) { active--; released = true; } };
}
