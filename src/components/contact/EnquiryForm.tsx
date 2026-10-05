'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ENQUIRY_TYPES, type EnquiryContext } from '@/lib/enquiry-context';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function EnquiryForm({ context = { enquiryType: 'General enquiry', target: '' } }: { context?: EnquiryContext }) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState('');
  const pendingRequest = useRef<AbortController | null>(null);

  useEffect(() => () => {
    pendingRequest.current?.abort();
    pendingRequest.current = null;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pendingRequest.current) return;
    const controller = new AbortController();
    pendingRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          enquiryType: values.enquiryType,
          suburb: values.suburb,
          honeypot: values.website,
          targetDesignName: context.target,
        }),
      });
      const result: { success?: boolean; error?: unknown } = await response.json();
      if (pendingRequest.current !== controller) return;
      if (!response.ok || result.success !== true) {
        setError(typeof result.error === 'string' ? result.error : 'Your enquiry could not be sent. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
      form.reset();
    } catch {
      if (pendingRequest.current !== controller) return;
      setError(controller.signal.aborted
        ? 'The response took too long. We could not confirm delivery. Please contact JUFAJA before sending the same enquiry again.'
        : 'We could not connect to the enquiry service. Check your connection and try again.');
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
      if (pendingRequest.current === controller) pendingRequest.current = null;
    }
  }

  if (status === 'sent') {
    return <div role="status" className="rounded-sm border border-jufaja-gold/40 bg-white p-8 shadow-jufaja-soft">
      <p className="eyebrow">Enquiry sent</p>
      <h2 className="type-h3 mt-2 font-serif text-jufaja-forest">Thank you for getting in touch.</h2>
      <p className="mt-3 text-sm leading-6 text-jufaja-muted">Your message has been sent to JUFAJA Constructions.</p>
      <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline mt-6">Send another enquiry</button>
    </div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-jufaja-border bg-white p-5 shadow-jufaja-soft sm:p-8">
      {context.target && <p className="rounded-sm border border-jufaja-gold/40 bg-jufaja-cream p-4 text-sm text-jufaja-forest"><strong>Enquiring about:</strong> {context.target}</p>}
      {status === 'error' && <p role="alert" className="border border-jufaja-burgundy-700/25 bg-jufaja-burgundy-700/5 p-3 text-sm leading-6 text-jufaja-burgundy-800">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" maxLength={120} required className="min-h-12 w-full rounded-sm border border-jufaja-border px-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600" />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Email <span aria-hidden="true">*</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required className="min-h-12 w-full rounded-sm border border-jufaja-border px-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Phone <span aria-hidden="true">*</span></label>
          <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={40} required className="min-h-12 w-full rounded-sm border border-jufaja-border px-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600" />
        </div>
        <div>
          <label htmlFor="contact-suburb" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Suburb or build location</label>
          <input id="contact-suburb" name="suburb" autoComplete="address-level2" maxLength={120} className="min-h-12 w-full rounded-sm border border-jufaja-border px-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-project" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Project type</label>
        <select id="contact-project" name="enquiryType" defaultValue={context.enquiryType} className="min-h-12 w-full rounded-sm border border-jufaja-border bg-white px-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600">
          {ENQUIRY_TYPES.map(type => <option key={type}>{type}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-jufaja-forest-900">Message</label>
        <textarea id="contact-message" name="message" defaultValue={context.target ? `I would like to discuss ${context.target}.` : ''} rows={5} maxLength={4000} className="w-full rounded-sm border border-jufaja-border p-3 text-base text-jufaja-forest-950 focus:border-jufaja-gold-600" />
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-xs leading-6 text-jufaja-muted">Your details are used to respond to this enquiry. <Link href="/privacy" className="text-jufaja-forest underline underline-offset-4">Read about enquiry privacy</Link>. Please avoid sending sensitive personal or financial information.</p>
      <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-65 sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
