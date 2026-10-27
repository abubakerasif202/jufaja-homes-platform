import { NextResponse } from 'next/server';
import { lookupSite, validLocation } from '@/lib/planning/service';
import { acquirePlanningRequest } from '@/lib/planning/request-limit';
export const runtime = 'nodejs';
export const maxDuration = 30;
export async function GET(request: Request) {
  const url = new URL(request.url);
  const longitude = Number(url.searchParams.get('longitude')), latitude = Number(url.searchParams.get('latitude'));
  if (url.search.length > 300 || !validLocation(longitude, latitude)) return NextResponse.json({ error: 'Choose a location in NSW.' }, { status: 400 });
  const release = acquirePlanningRequest(request);
  if (!release) return NextResponse.json({ error: 'Too many planning requests. Please wait a minute.' }, { status: 429, headers: { 'Retry-After': '60' } });
  try { return NextResponse.json(await lookupSite(longitude, latitude), { headers: { 'Cache-Control': 'private, no-store' } }); }
  catch { return NextResponse.json({ error: 'Planning lookup could not be completed. Please retry.' }, { status: 503 }); }
  finally { release(); }
}
