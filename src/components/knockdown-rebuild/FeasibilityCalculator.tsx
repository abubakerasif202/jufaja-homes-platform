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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-lg">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-orange flex items-center justify-center mx-auto mb-3">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-brand-navy">
            Interactive Site Feasibility Calculator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Check your block's eligibility for Complying Development (CDC) and find matching designs.
          </p>
        </div>

        {!isCalculated ? (
          <form onSubmit={handleCalculate} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Property Suburb / Council Area *
              </label>
              <input
                type="text"
                required
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                placeholder="e.g. Prestons, Camden, Ryde, Blacktown"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Approximate Frontage / Lot Width (Metres)
              </label>
              <select
                value={lotWidth}
                onChange={(e) => setLotWidth(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm font-medium bg-white"
              >
                <option value="10.0">Narrow Lot: 10.0m - 11.5m</option>
                <option value="12.5">Standard Lot: 12.5m - 14.0m</option>
                <option value="15.0">Wide Lot: 15.0m - 18.0m</option>
                <option value="20.0">Acreage / Rural: 20m+</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Is There An Existing Home On The Block?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setHasExistingHouse('yes')}
                  className={`py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    hasExistingHouse === 'yes'
                      ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  Yes, Knockdown Needed
                </button>
                <button
                  type="button"
                  onClick={() => setHasExistingHouse('no')}
                  className={`py-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    hasExistingHouse === 'no'
                      ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  No, Vacant Land
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Calculate Block Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-6 pt-2">
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>High Feasibility for {suburb || 'Your Area'}</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                With a {lotWidth}m frontage, your block is eligible for both Complying Development (CDC fast-tracked in 20 days) and standard Council DA approval.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs text-slate-700">
              <div className="font-bold text-sm text-brand-navy uppercase tracking-wider">
                Matching JUFAJA Configurations:
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                  <span><strong>Double Storey:</strong> Delta 36, Verona 35, Alpha 32 Series</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                  <span><strong>Single Storey:</strong> Kingston 28, Oxley 26, Majestic 26</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                  <span><strong>Duplex Potential:</strong> Eligible for dual occupancy if lot &gt; 15m</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCalculated(false)}
                className="flex-1 py-3 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold uppercase hover:bg-slate-50"
              >
                Recalculate
              </button>
              <button
                onClick={triggerConsult}
                className="flex-1 py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow"
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
