import React from 'react';
import Link from 'next/link';
import { ShieldAlert, UserCheck, Calculator, Hammer, ArrowRight } from 'lucide-react';

export default function BrandDifference() {
  const pillars = [
    {
      icon: UserCheck,
      title: 'One Accountable Contact',
      description: 'You deal directly with our hands-on founder and dedicated project managers throughout your build &mdash; never a revolving door of call-centre clerks.'
    },
    {
      icon: ShieldAlert,
      title: '4-Point Quality Hold Points',
      description: 'Independent engineering inspections at slab pour, frame erection, pre-lining waterproofing, and final handover ensure uncompromising structural integrity.'
    },
    {
      icon: Calculator,
      title: '100% Fixed Site Costs',
      description: 'We conduct full site and soil contour appraisals before contract signing. No nasty surprise variations or site cost escalation mid-build.'
    },
    {
      icon: Hammer,
      title: 'Considered Sydney Construction',
      description: 'Deep knowledge of local Sydney council DCPs, complying development (CDC), mine subsidence, and bushfire BAL requirements guarantees smooth approvals.'
    }
  ];

  return (
    <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-surface/40 rounded-full blur-3xl -z-0 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
            WHY CHOOSE JUFAJA HOMES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-1">
            The JUFAJA Difference
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            In an industry plagued by cost blowouts and impersonal service, JUFAJA was founded on four foundational principles that deliver certainty and peace of mind.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-brand-surface/70 border border-slate-700/60 rounded-xl p-6 hover:border-brand-orange transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-brand-navy group-hover:bg-brand-orange flex items-center justify-center text-white mb-5 transition-colors shadow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-brand-surface to-brand-navy border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Planning to Knock Down and Rebuild?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Find out if your block qualifies for Complying Development (fast 20-day approvals) with zero council hassle.
            </p>
          </div>

          <Link
            href="/knockdown-rebuild"
            className="shrink-0 px-6 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow hover:shadow-lg flex items-center gap-2"
          >
            <span>Check Block Feasibility</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
