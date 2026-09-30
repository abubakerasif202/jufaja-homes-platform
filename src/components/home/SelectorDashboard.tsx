import React from 'react';
import Link from 'next/link';
import { Home, Layers, RefreshCw, PenTool, Box, KeyRound, ArrowRight } from 'lucide-react';

interface SelectorOption {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  link: string;
  badge?: string;
}

const selectorItems: SelectorOption[] = [
  {
    title: 'Single Storey',
    subtitle: 'Smart, expansive single-level family homes',
    icon: Home,
    link: '/designs?dwelling_type=single',
    badge: '23 Designs',
  },
  {
    title: 'Double Storey',
    subtitle: 'Luxury multi-level living with expansive floorplans',
    icon: Layers,
    link: '/designs?dwelling_type=double',
    badge: '20 Designs',
  },
  {
    title: 'Knockdown Rebuild',
    subtitle: 'Stay in your suburb. Brand new luxury home build',
    icon: RefreshCw,
    link: '/knockdown-rebuild',
    badge: 'Free Site Audit',
  },
  {
    title: 'Duplexes & Dual Living',
    subtitle: 'Smart dual occupancy designs maximizing land yield',
    icon: Box,
    link: '/designs?dwelling_type=duplex',
    badge: '9 Designs',
  },
  {
    title: 'House & Land Packages',
    subtitle: 'Turnkey lots with fixed site costs in growth corridors',
    icon: KeyRound,
    link: '/packages',
    badge: 'From $915k',
  },
  {
    title: 'Custom Architecture',
    subtitle: 'Bespoke architectural designs crafted around your block',
    icon: PenTool,
    link: '/custom-homes',
    badge: '1-on-1 Consult',
  }
];

export default function SelectorDashboard() {
  return (
    <section className="relative -mt-10 sm:-mt-14 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 sm:p-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black tracking-widest text-brand-orange uppercase">
            FIND YOUR PERFECT LIVING SOLUTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-1">
            I&apos;m looking for a:
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {selectorItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.link}
                className="group relative flex flex-col justify-between p-6 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-orange hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-navy group-hover:bg-brand-orange text-white flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded bg-slate-200/80 group-hover:bg-brand-orange/15 group-hover:text-brand-orange text-slate-700 transition-colors">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-bold text-brand-navy group-hover:text-brand-orange">
                  <span>Explore Options</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
