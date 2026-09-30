'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Phone, CheckCircle2, MessageSquare } from 'lucide-react';

export default function QuickEnquiryDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [targetContext, setTargetContext] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestType: 'New Build',
    suburbOrCouncil: '',
    ownLand: false,
    message: '',
    honeypot: '',
  });

  useEffect(() => {
    const handleOpen = (e?: CustomEvent) => {
      if (e?.detail?.context) {
        setTargetContext(e.detail.context);
      }
      setIsOpen(true);
      setIsSubmitted(false);
    };

    window.addEventListener('open-enquiry-drawer' as any, handleOpen);
    return () => window.removeEventListener('open-enquiry-drawer' as any, handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetDesignName: targetContext,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating CTA Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setTargetContext('');
            setIsOpen(true);
          }}
          className="flex items-center gap-2.5 bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-jufaja-gold cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-jufaja-gold group-hover:rotate-6 transition-transform" />
          <span className="tracking-wider uppercase">Enquire Now</span>
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-jufaja-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-jufaja-gold/20">
              
              {/* Drawer Header */}
              <div className="bg-jufaja-forest p-6 text-white flex justify-between items-center border-b border-jufaja-gold/20">
                <div>
                  <h3 className="text-xl font-serif font-bold tracking-tight text-white">
                    Enquire With JUFAJA
                  </h3>
                  <p className="text-xs text-jufaja-ivory/70 mt-0.5 font-sans">
                    {targetContext ? `Enquiring about: ${targetContext}` : 'Start your building journey today'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-jufaja-ivory/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-jufaja-ivory/30">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-jufaja-forest mx-auto" />
                    <h4 className="text-2xl font-serif font-bold text-jufaja-forest">Enquiry Received</h4>
                    <p className="text-xs sm:text-sm text-jufaja-muted max-w-xs mx-auto font-sans leading-relaxed">
                      Thank you for contacting JUFAJA Constructions. A building consultant will review your details and contact you within 24 business hours.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-jufaja-forest text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-jufaja-forest-800 transition-colors"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0400 000 000"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        I am interested in:
                      </label>
                      <select
                        value={formData.interestType}
                        onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                      >
                        <option value="New Build">New Home Design (from Catalogue)</option>
                        <option value="Knock Down Rebuild">Knock Down Rebuild</option>
                        <option value="House & Land">House &amp; Land Package</option>
                        <option value="Custom Design">Custom Architectural Design</option>
                        <option value="General">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Build Suburb / Council Area
                      </label>
                      <input
                        type="text"
                        value={formData.suburbOrCouncil}
                        onChange={(e) => setFormData({ ...formData, suburbOrCouncil: e.target.value })}
                        placeholder="e.g. Camden, Liverpool, Penrith"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="ownLand"
                        checked={formData.ownLand}
                        onChange={(e) => setFormData({ ...formData, ownLand: e.target.checked })}
                        className="w-4 h-4 text-jufaja-gold rounded border-jufaja-border focus:ring-jufaja-gold accent-jufaja-gold"
                      />
                      <label htmlFor="ownLand" className="text-xs text-jufaja-muted font-medium">
                        I already own or have purchased land
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                        Message / Block Details
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your land width, timeframe, or desired features..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm bg-white"
                      />
                    </div>

                    {/* Honeypot field */}
                    <input
                      type="text"
                      className="hidden"
                      tabIndex={-1}
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-jufaja-gold/40"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-jufaja-gold" />
                          <span>Submit Free Enquiry</span>
                        </>
                      )}
                    </button>

                    <div className="pt-2 text-center text-xs text-jufaja-muted flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-jufaja-gold" />
                      <span>Prefer to speak? Call </span>
                      <a href="tel:0287838800" className="font-semibold text-jufaja-forest hover:text-jufaja-gold transition-colors">
                        (02) 8783 8800
                      </a>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
