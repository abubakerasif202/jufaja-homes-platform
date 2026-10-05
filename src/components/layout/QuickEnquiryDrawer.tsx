'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ENQUIRY_TYPES } from '@/lib/enquiry-context';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function QuickEnquiryDrawer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [targetContext, setTargetContext] = useState<string>('');
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const pendingRequest = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestType: 'General enquiry',
    suburbOrCouncil: '',
    ownLand: false,
    message: '',
    honeypot: '',
  });

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const context = (event as CustomEvent<{ context?: string }>).detail?.context;
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (!pendingRequest.current && !isSubmitted) {
        setTargetContext(context ?? '');
        setFormData(data => ({ ...data, interestType: context ? 'Home design' : 'General enquiry' }));
      }
      setIsOpen(true);
    };

    window.addEventListener('open-enquiry-drawer', handleOpen);
    return () => window.removeEventListener('open-enquiry-drawer', handleOpen);
  }, [isSubmitted]);

  useEffect(() => () => {
    pendingRequest.current?.abort();
    pendingRequest.current = null;
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const background = [...document.querySelectorAll<HTMLElement>('body > header, body > main, body > footer')];
    const previousInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        previousFocus.current?.focus();
      }
      if (event.key === 'Tab' && dialog.current) {
        const focusable = [...dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')].filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialog.current.contains(document.activeElement))) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !dialog.current.contains(document.activeElement))) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.removeEventListener('keydown', onKeyDown);
      previousFocus.current?.focus();
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingRequest.current) return;
    const controller = new AbortController();
    pendingRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetDesignName: targetContext,
        }),
      });

      const result: { success?: boolean; error?: unknown } = await res.json();
      if (pendingRequest.current !== controller) return;
      if (res.ok && result.success === true) {
        setIsSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', interestType: 'General enquiry', suburbOrCouncil: '', ownLand: false, message: '', honeypot: '' });
      } else {
        setError(typeof result.error === 'string' ? result.error : 'The enquiry could not be sent. Please try again.');
      }
    } catch {
      if (pendingRequest.current !== controller) return;
      setError(controller.signal.aborted
        ? 'The response took too long. We could not confirm delivery. Please contact JUFAJA before sending the same enquiry again.'
        : 'We could not connect to the enquiry service. Please check your connection and try again.');
    } finally {
      window.clearTimeout(timeout);
      if (pendingRequest.current === controller) {
        pendingRequest.current = null;
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Floating CTA Pill */}
      {pathname !== '/contact' && <div data-dialog-open={isOpen} className="mobile-enquiry-rail fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (!pendingRequest.current && !isSubmitted) {
              setTargetContext('');
              setFormData(data => ({ ...data, interestType: 'General enquiry' }));
            }
            previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            setIsOpen(true);
          }}
          className="mobile-enquiry-cta flex items-center gap-2.5 btn btn-primary shadow-2xl group cursor-pointer"
        >
          <MessageSquare aria-hidden="true" className="w-4 h-4" />
          <span>Enquire Now</span>
        </button>
      </div>}

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <button
            type="button"
            aria-label="Close enquiry form"
            className="enquiry-drawer__backdrop absolute inset-0 bg-jufaja-forest-950/40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="enquiry-drawer__panel fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
            <section ref={dialog} role="dialog" aria-modal="true" aria-labelledby="enquiry-title" className="flex w-screen max-w-md flex-col border-l border-jufaja-gold/20 bg-white shadow-2xl">
              
              {/* Drawer Header */}
              <div className="bg-jufaja-forest p-6 text-white flex justify-between items-center border-b border-jufaja-gold/20">
                <div>
                  <h2 id="enquiry-title" className="type-h3 font-serif text-white">
                    Enquire With JUFAJA
                  </h2>
                  <p className="text-xs text-jufaja-ivory/70 mt-0.5 font-sans">
                    {targetContext ? `Enquiring about: ${targetContext}` : 'Start your building journey today'}
                  </p>
                </div>
                <button
                  ref={closeButton}
                  type="button"
                  aria-label="Close enquiry form"
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm text-jufaja-ivory/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-jufaja-ivory/30">
                {isSubmitted ? (
                  <div role="status" className="py-12 text-center space-y-4">
                    <CheckCircle2 aria-hidden="true" className="w-16 h-16 text-jufaja-forest mx-auto" />
                    <h3 className="type-h3 font-serif text-jufaja-forest">Enquiry Received</h3>
                    <p className="text-xs sm:text-sm text-jufaja-muted max-w-xs mx-auto font-sans leading-relaxed">
                      Thank you for contacting JUFAJA Constructions. Your enquiry has been sent.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="btn btn-primary mt-6"
                    >
                      Close Window
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setError('');
                        setTargetContext('');
                      }}
                      className="btn btn-outline mt-3"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <fieldset disabled={isSubmitting} className="min-w-0 space-y-4">
                    {error && <p role="alert" className="rounded-sm border border-jufaja-burgundy-700/25 bg-jufaja-burgundy-700/5 px-3 py-2 text-sm text-jufaja-burgundy-800">{error}</p>}
                    <div>
                      <label htmlFor="enquiry-name" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="enquiry-name"
                        maxLength={120}
                        name="name"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="enquiry-phone" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="enquiry-phone"
                          maxLength={40}
                          name="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0400 000 000"
                          className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="enquiry-email" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="enquiry-email"
                          maxLength={254}
                          name="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="enquiry-type" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        I am interested in:
                      </label>
                      <select
                        id="enquiry-type"
                        value={formData.interestType}
                        onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                      >
                        {ENQUIRY_TYPES.map(type => <option key={type}>{type}</option>)}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="enquiry-suburb" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Build Suburb / Council Area
                      </label>
                      <input
                        type="text"
                        id="enquiry-suburb"
                        maxLength={120}
                        name="address-level2"
                        autoComplete="address-level2"
                        value={formData.suburbOrCouncil}
                        onChange={(e) => setFormData({ ...formData, suburbOrCouncil: e.target.value })}
                        placeholder="e.g. Camden, Liverpool, Penrith"
                        className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                      />
                    </div>

                    <div className="flex min-h-11 items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="enquiry-own-land"
                        checked={formData.ownLand}
                        onChange={(e) => setFormData({ ...formData, ownLand: e.target.checked })}
                        className="w-4 h-4 text-jufaja-gold rounded border-jufaja-border focus:ring-jufaja-gold accent-jufaja-gold"
                      />
                      <label htmlFor="enquiry-own-land" className="text-xs text-jufaja-muted font-medium">
                        I already own or have purchased land
                      </label>
                    </div>

                    <div>
                      <label htmlFor="enquiry-message" className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Message / Block Details
                      </label>
                      <textarea
                        id="enquiry-message"
                        maxLength={4000}
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your land width, timeframe, or desired features..."
                        className="w-full px-3.5 py-2.5 rounded-sm border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-base bg-white"
                      />
                    </div>

                    {/* Honeypot field */}
                    <input
                      type="text"
                      className="absolute -left-[10000px] h-px w-px overflow-hidden"
                      aria-hidden="true"
                      tabIndex={-1}
                      name="website"
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="btn btn-primary w-full cursor-pointer disabled:cursor-wait disabled:opacity-65"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send aria-hidden="true" className="w-4 h-4" />
                          <span>Submit Free Enquiry</span>
                        </>
                      )}
                    </button>

                    <p className="pt-2 text-center text-xs leading-5 text-jufaja-muted">Your details are used to respond to this enquiry. <Link href="/privacy" onClick={() => setIsOpen(false)} className="text-jufaja-forest underline underline-offset-4">Enquiry privacy</Link>.</p>
                    </fieldset>
                  </form>
                )}
              </div>

            </section>
          </div>
        </div>
      )}
    </>
  );
}
