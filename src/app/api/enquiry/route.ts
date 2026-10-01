import { NextResponse } from 'next/server';
import { consumeEnquiryRateLimit } from '@/lib/server/enquiry-rate-limit';

export const runtime = 'nodejs';

const clean = (value: unknown, maxLength: number) =>
  typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength)
    : '';

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') {
    return NextResponse.json({ success: false, error: 'Please submit the form using the website.' }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    const maxBytes = 20_000;
    const contentLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > maxBytes) {
      return NextResponse.json({ success: false, error: 'Your message is too long. Please shorten it and try again.' }, { status: 413 });
    }
    if (!request.body) {
      return NextResponse.json({ success: false, error: 'The form could not be read. Please try again.' }, { status: 400 });
    }

    const reader = request.body.getReader();
    const decoder = new TextDecoder('utf-8', { fatal: true });
    const chunks: string[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return NextResponse.json({ success: false, error: 'Your message is too long. Please shorten it and try again.' }, { status: 413 });
      }
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
    const raw = chunks.join('');
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, error: 'The form could not be read. Please check the fields and try again.' }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'The form could not be read. Please try again.' }, { status: 400 });
  }

  if (clean(body.website, 500) || clean(body.honeypot, 500)) {
    return NextResponse.json({ success: true, message: 'Enquiry received' });
  }

  const name = clean(body.name ?? body.fullName, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const suburb = clean(body.suburb ?? body.suburbOrCouncil, 120);
  const enquiryType = clean(body.enquiryType ?? body.interestType, 80) || 'General enquiry';
  const target = clean(body.targetDesignName, 120);
  const landStatus = body.ownLand === true ? 'Land owned' : 'Land not confirmed';
  const message = clean(body.message, 4_000);
  const phoneDigits = phone.replace(/\D/g, '');

  if (!name || !email || !phone) {
    return NextResponse.json({ success: false, error: 'Name, phone number and email address are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return NextResponse.json({ success: false, error: 'Please enter a valid phone number.' }, { status: 400 });
  }

  const rateLimit = await consumeEnquiryRateLimit(request);
  if (rateLimit.status === 'limited') {
    return NextResponse.json(
      { success: false, error: 'Too many enquiries were sent from this connection. Please wait before trying again.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
    );
  }
  if (rateLimit.status === 'unavailable') {
    return NextResponse.json(
      { success: false, error: 'The enquiry service is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { success: false, error: 'The enquiry service is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website enquiry: ${enquiryType}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Suburb / build location: ${suburb || 'Not provided'}`,
          `Enquiry type: ${enquiryType}`,
          `Land status: ${landStatus}`,
          `Design or package: ${target || 'Not provided'}`,
          '',
          'Message:',
          message || 'No message provided',
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!delivery.ok) {
      return NextResponse.json(
        { success: false, error: 'Your enquiry could not be sent just now. Please try again later.' },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, error: 'Your enquiry could not be sent just now. Please try again later.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, message: 'Your enquiry has been sent to JUFAJA Constructions.' });
}
