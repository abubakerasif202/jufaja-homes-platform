'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Layers, RefreshCw, PenTool, Box, KeyRound, ArrowRight, Sparkles } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

interface SelectorOption {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  link: string;
  badge?: string;
}

const selectorItems: SelectorOption[] = [
  {
    title: 'Single Storey Designs',
    subtitle: 'Thoughtfully planned single-level residences for modern family living',
    icon: Home,
    link: '/designs?dwelling_type=single',
    badge: '23 Plans',
  },
  {
    title: 'Double Storey Homes',
    subtitle: 'Expansive multi-level living with open entertaining and master suites',
    icon: Layers,
    link: '/designs?dwelling_type=double',
    badge: '20 Plans',
  },
  {
    title: 'Knockdown Rebuild',
    subtitle: 'Stay in the street you love. Replace your older home with an architectural sanctuary',
    icon: RefreshCw,
    link: '/knockdown-rebuild',
    badge: 'Site Feasibility',
  },
  {
    title: 'Duplex & Dual Living',
    subtitle: 'Smart dual-occupancy plans engineered for multi-generational yield and privacy',
    icon: Box,
    link: '/designs?dwelling_type=duplex',
    badge: '9 Plans',
  },
  {
    title: 'House & Land Packages',
    subtitle: 'Complete turnkey home and land combinations in premier Sydney growth corridors',
    icon: KeyRound,
    link: '/packages',
    badge: '16 Lots Available',
  },
  {
    title: 'Custom Architecture',
    subtitle: 'One-off bespoke residences engineered for sloping, narrow, or acreage blocks',
    icon: PenTool,
    link: '/custom-homes',
    badge: 'Design Briefing',
  },
];

export default function SelectorDashboard() {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16 sm:mb-24">
      <Reveal>
        <div className="bg-white rounded-2xl shadow-luxury border border-stone-200/90 p-6 sm:p-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-jufaja-gold block mb-1">
              Find Your Living Solution
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-jufaja-forest tracking-tight">
              Explore By Project Type
            </h2>
            <div className="w-12 h-[1.5px] bg-jufaja-gold mx-auto mt-3" />
          </div>

          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectorItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.link}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl border border-stone-200/80 bg-jufaja-ivory/60 hover:bg-white hover:border-jufaja-gold/70 hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-12 h-12 rounded-xl bg-jufaja-forest group-hover:bg-jufaja-gold text-white flex items-center justify-center transition-colors shadow-sm">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-600 group-hover:border-jufaja-gold/40 group-hover:text-jufaja-forest transition-colors">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-bold text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-normal">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
                    <span className="uppercase tracking-wider text-[11px]">View Plans</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Reveal>
    </section>
  );
}
