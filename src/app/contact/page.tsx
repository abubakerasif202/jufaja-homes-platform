'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calendar,
  Compass
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'New Home Design',
    suburb: '',
    landStatus: 'Already own land',
    message: '',
    website: '' // honeypot
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) {
      // Honeypot triggered
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit enquiry. Please try again or call us.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage('A network error occurred. Please contact our head office directly.');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header - Light Architectural */}
      <section className="bg-jufaja-ivory py-16 sm:py-20 border-b border-jufaja-border relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
            <span>Direct Builder Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-jufaja-forest tracking-tight">
            Contact JUFAJA Constructions
          </h1>
          <p className="text-jufaja-muted max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Discuss your land, browse our 63 residential designs, or arrange an on-site feasibility review with our senior engineering and building specialists.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Office Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Head Office Card */}
            <div className="bg-jufaja-ivory rounded-2xl border border-jufaja-border p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-jufaja-forest text-jufaja-gold flex items-center justify-center border border-jufaja-gold/30">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-jufaja-forest">
                    Head Office &amp; Design Studio
                  </h2>
                  <p className="text-xs text-jufaja-muted font-sans">Prestons Commercial Centre</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-jufaja-forest font-semibold">Physical Address:</strong>
                    <span className="text-jufaja-muted">1 Avalli Road, Prestons NSW 2170</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-jufaja-forest font-semibold">Telephone Enquiries:</strong>
                    <a href="tel:0287838800" className="text-jufaja-forest hover:text-jufaja-gold font-bold transition-colors">
                      (02) 8783 8800
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-jufaja-forest font-semibold">Email Correspondence:</strong>
                    <a href="mailto:info@jufajahomes.com.au" className="text-jufaja-forest hover:text-jufaja-gold transition-colors">
                      info@jufajahomes.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-jufaja-forest font-semibold">Office Hours:</strong>
                    <span className="text-jufaja-muted">Monday &ndash; Friday: 8:30am &ndash; 5:00pm</span>
                    <span className="block text-[11px] text-jufaja-muted/70 mt-0.5">Saturday: By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Villages Quick Box */}
            <div className="bg-jufaja-forest text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-jufaja-gold/20 shadow-md">
              <h3 className="font-serif text-lg font-semibold text-jufaja-gold uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Sydney Display &amp; Experience Hubs</span>
              </h3>
              <p className="text-xs text-jufaja-ivory/80 leading-relaxed font-sans">
                Prefer to view our physical display homes in person? Our consultation hubs are located at:
              </p>
              <ul className="space-y-2.5 text-xs text-jufaja-ivory/90 font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold mt-1.5 shrink-0"></span>
                  <span><strong>Homeworld Box Hill:</strong> 14 Fontana Drive (Open 7 Days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold mt-1.5 shrink-0"></span>
                  <span><strong>Homeworld Leppington:</strong> 22 Arbour Avenue (Open 7 Days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-jufaja-gold mt-1.5 shrink-0"></span>
                  <span><strong>Oxley Ridge Cobbitty:</strong> 8 Horizon Circuit (Thu &ndash; Mon)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-jufaja-border p-6 sm:p-10 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-jufaja-forest">
                Send Us An Online Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-jufaja-muted mt-1 font-sans">
                Fill out the details below and our building team will review your enquiry within 1 business day.
              </p>
            </div>

            {status === 'success' ? (
              <div className="p-8 rounded-xl bg-jufaja-ivory border border-jufaja-gold/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-jufaja-forest text-jufaja-gold flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-jufaja-forest">
                  Enquiry Received Successfully
                </h3>
                <p className="text-xs sm:text-sm text-jufaja-muted max-w-md mx-auto leading-relaxed font-sans">
                  Thank you for contacting JUFAJA Constructions. A Senior Building Consultant has received your project details and will be in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      enquiryType: 'New Home Design',
                      suburb: '',
                      landStatus: 'Already own land',
                      message: '',
                      website: ''
                    });
                  }}
                  className="px-6 py-2.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Michael Smith"
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0412 345 678"
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. michael@example.com.au"
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Type of Project
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    >
                      <option value="New Home Design">Pre-Designed Catalogue Home</option>
                      <option value="Knockdown Rebuild">Knockdown Rebuild Consultation</option>
                      <option value="House & Land Package">House &amp; Land Package</option>
                      <option value="Custom Architectural Build">Custom Architectural Build</option>
                      <option value="Display Home Tour">Display Home Visit</option>
                      <option value="General Enquiry">General / Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Building Suburb / Region
                    </label>
                    <input
                      type="text"
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleChange}
                      placeholder="e.g. Box Hill, Austral, Camden, Ryde"
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                      Land Status
                    </label>
                    <select
                      name="landStatus"
                      value={formData.landStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                    >
                      <option value="Already own land">I already own the land</option>
                      <option value="Under contract">Land is currently under contract</option>
                      <option value="Looking to buy land">Looking to purchase land</option>
                      <option value="Existing house to demolish">Existing house to demolish (KDRB)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your block size, desired bedrooms, budget, or preferred design..."
                    className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 border border-jufaja-gold/40"
                >
                  <Send className="w-4 h-4 text-jufaja-gold" />
                  <span>{status === 'loading' ? 'Submitting Details...' : 'Submit Building Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
