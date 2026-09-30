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
          className="flex items-center gap-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-sm px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white/40 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>ENQUIRE NOW</span>
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="bg-brand-navy p-6 text-white flex justify-between items-center border-b border-brand-surface">
                <div>
                  <h3 className="text-xl font-black tracking-tight">ENQUIRE WITH JUFAJA</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {targetContext ? `Enquiring about: ${targetContext}` : 'Start your building journey today'}
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                    <h4 className="text-2xl font-bold text-brand-navy">Enquiry Received!</h4>
                    <p className="text-sm text-slate-600 max-w-xs mx-auto">
                      Thank you for contacting JUFAJA Homes. A senior building consultant will review your site feasibility and contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-6 px-6 py-2.5 bg-brand-navy text-white text-sm font-bold rounded-lg hover:bg-brand-surface"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Smith"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0400 000 000"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        I am interested in:
                      </label>
                      <select
                        value={formData.interestType}
                        onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm bg-white"
                      >
                        <option value="New Build">New Home Design (from Catalogue)</option>
                        <option value="Knock Down Rebuild">Knock Down Rebuild</option>
                        <option value="House & Land">House &amp; Land Package</option>
                        <option value="Custom Design">Custom Architectural Design</option>
                        <option value="General">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Build Suburb / Council Area
                      </label>
                      <input
                        type="text"
                        value={formData.suburbOrCouncil}
                        onChange={(e) => setFormData({ ...formData, suburbOrCouncil: e.target.value })}
                        placeholder="e.g. Camden, Liverpool, Penrith"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="ownLand"
                        checked={formData.ownLand}
                        onChange={(e) => setFormData({ ...formData, ownLand: e.target.checked })}
                        className="w-4 h-4 text-brand-orange rounded border-slate-300 focus:ring-brand-orange"
                      />
                      <label htmlFor="ownLand" className="text-xs text-slate-600 font-medium">
                        I already own or have purchased land
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Message / Block Details
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your land width, timeframe, or desired features..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
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
                      className="w-full py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-sm tracking-wider uppercase transition-all shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Free Enquiry</span>
                        </>
                      )}
                    </button>

                    <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-navy" />
                      <span>Prefer to speak? Call </span>
                      <a href="tel:0287838800" className="font-bold text-brand-navy hover:underline">
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
