import { NextResponse } from 'next/server';
import { lookupAddress } from '@/lib/planning/service';
import { acquirePlanningRequest } from '@/lib/planning/request-limit';
export const runtime = 'nodejs';
export const maxDuration = 30;
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.search.length > 800 || !url.searchParams.get('roadName')?.trim() || !(url.searchParams.get('suburb')?.trim() || url.searchParams.get('postCode')?.trim()) || [...url.searchParams.values()].some(v => v.length > 100 || /[\u0000-\u001f]/.test(v))) {
    return NextResponse.json({ error: 'Enter a street name and suburb or postcode. Keep each field under 100 characters.' }, { status: 400 });
  }
  const release = acquirePlanningRequest(request);
  if (!release) return NextResponse.json({ error: 'Too many planning requests. Please wait a minute.' }, { status: 429, headers: { 'Retry-After': '60' } });
  try { return NextResponse.json(await lookupAddress(url.searchParams), { headers: { 'Cache-Control': 'private, no-store' } }); }
  catch { return NextResponse.json({ error: 'The NSW address service is unavailable. Please retry or use the official Spatial Viewer.' }, { status: 503 }); }
  finally { release(); }
}
