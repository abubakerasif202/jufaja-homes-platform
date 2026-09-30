'use client';

import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight } from 'lucide-react';

export default function FeasibilityCalculator() {
  const [suburb, setSuburb] = useState('');
  const [lotWidth, setLotWidth] = useState('12.5');
  const [hasExistingHouse, setHasExistingHouse] = useState('yes');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  const triggerConsult = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: `Knockdown Rebuild Feasibility Check (${suburb || 'Sydney'}, ${lotWidth}m frontage)` }
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-jufaja-border p-6 sm:p-10 shadow-sm">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-jufaja-forest text-jufaja-gold flex items-center justify-center mx-auto mb-3 border border-jufaja-gold/30">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-forest">
            Site Feasibility Assessment
          </h3>
          <p className="text-xs sm:text-sm text-jufaja-muted mt-1 font-sans">
            Check your block's eligibility for Complying Development (CDC) and identify matching architectural designs.
          </p>
        </div>

        {!isCalculated ? (
          <form onSubmit={handleCalculate} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                Property Suburb / Council Area *
              </label>
              <input
                type="text"
                required
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="e.g. Prestons, Camden, Ryde, Blacktown"
                className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                Approximate Frontage / Lot Width (Metres)
              </label>
              <select
                value={lotWidth}
                onChange={(e) => setLotWidth(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-jufaja-border focus:outline-none focus:ring-2 focus:ring-jufaja-gold text-sm font-sans bg-white"
              >
                <option value="10.0">Narrow Lot: 10.0m - 11.5m</option>
                <option value="12.5">Standard Lot: 12.5m - 14.0m</option>
                <option value="15.0">Wide Lot: 15.0m - 18.0m</option>
                <option value="20.0">Acreage / Rural: 20m+</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-jufaja-forest uppercase tracking-wider mb-1">
                Is There An Existing Home On The Block?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasExistingHouse('yes')}
                  className={`py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    hasExistingHouse === 'yes'
                      ? 'bg-jufaja-forest text-white border-jufaja-forest shadow-sm'
                      : 'bg-jufaja-ivory text-jufaja-forest border-jufaja-border'
                  }`}
                >
                  Yes, Knockdown Needed
                </button>
                <button
                  type="button"
                  onClick={() => setHasExistingHouse('no')}
                  className={`py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                    hasExistingHouse === 'no'
                      ? 'bg-jufaja-forest text-white border-jufaja-forest shadow-sm'
                      : 'bg-jufaja-ivory text-jufaja-forest border-jufaja-border'
                  }`}
                >
                  No, Vacant Land
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 border border-jufaja-gold/40"
            >
              <span>Calculate Block Feasibility</span>
              <ArrowRight className="w-4 h-4 text-jufaja-gold" />
            </button>
          </form>
        ) : (
          <div className="space-y-6 pt-2">
            <div className="p-5 rounded-xl bg-jufaja-ivory border border-jufaja-gold/40 text-jufaja-forest space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-lg text-jufaja-forest">
                <CheckCircle2 className="w-5 h-5 text-jufaja-gold" />
                <span>High Feasibility for {suburb || 'Your Area'}</span>
              </div>
              <p className="text-xs text-jufaja-muted leading-relaxed font-sans">
                With a {lotWidth}m frontage, your block is eligible for both Complying Development (CDC fast-tracked in 20 days) and standard Council DA approval.
              </p>
            </div>

            <div className="bg-jufaja-ivory/40 rounded-xl p-5 border border-jufaja-border space-y-3 text-xs text-jufaja-charcoal font-sans">
              <div className="font-semibold text-xs text-jufaja-gold uppercase tracking-wider">
                Matching Architectural Configurations:
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-jufaja-forest"></span>
                  <span><strong>Double Storey:</strong> Delta 36, Verona 35, Alpha 32 Series</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-jufaja-forest"></span>
                  <span><strong>Single Storey:</strong> Kingston 28, Oxley 26, Majestic 26</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-jufaja-gold"></span>
                  <span><strong>Duplex Potential:</strong> Eligible for dual occupancy if lot &gt; 15m</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCalculated(false)}
                className="flex-1 py-3.5 rounded-lg border border-jufaja-border text-jufaja-forest text-xs font-semibold uppercase hover:bg-jufaja-ivory transition-colors"
              >
                Recalculate
              </button>
              <button
                onClick={triggerConsult}
                className="flex-1 py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-semibold uppercase tracking-wider shadow-sm border border-jufaja-gold/40 transition-colors"
              >
                Book Site Inspection
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
