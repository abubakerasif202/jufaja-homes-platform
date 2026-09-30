import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import FeasibilityCalculator from '@/components/knockdown-rebuild/FeasibilityCalculator';
import ProcessSteps from '@/components/knockdown-rebuild/ProcessSteps';

export const metadata: Metadata = {
  title: 'Knockdown Rebuild Sydney | JUFAJA Constructions',
  description: 'Keep the address you love and replace your outdated house with an architecturally designed, energy-efficient JUFAJA home. Save stamp duty, avoid relocation costs, and enjoy fixed-price contracts.',
};

export default function KnockdownRebuildPage() {
  const comparisonData = [
    {
      factor: 'Stamp Duty & Buying Costs',
      kdrb: '$0 (You already own the land)',
      renovate: '$0',
      buyNew: '$50,000 - $120,000+ lost in stamp duty & agent fees'
    },
    {
      factor: 'Layout & Architectural Freedom',
      kdrb: '100% Brand-new tailored floorplan to your solar orientation',
      renovate: 'Constrained by existing load-bearing walls and ceiling heights',
      buyNew: 'Compromised layout built to another owner’s taste'
    },
    {
      factor: 'Energy Efficiency & Thermal Comfort',
      kdrb: '7-Star NatHERS modern insulation, double glazing & solar ready',
      renovate: 'Difficult to insulate old floor cavities and leaky frames',
      buyNew: 'Varies widely depending on build age'
    },
    {
      factor: 'Structural Warranty & Risk',
      kdrb: '25-Year Structural Lifetime Warranty & certified hold points',
      renovate: 'High risk of uncovering hidden rot, termites, and old wiring',
      buyNew: 'Existing home wear-and-tear or expired builder warranties'
    },
    {
      factor: 'School Zones & Established Suburb',
      kdrb: 'Stay in your established community, children remain in their schools',
      renovate: 'Stay in your suburb',
      buyNew: 'Forced to relocate further away to afford a comparable block'
    }
  ];

  const faqs = [
    {
      q: 'Can my property qualify for fast-track Complying Development (CDC)?',
      a: 'In many established Sydney suburbs, homes can be approved under the NSW Housing State Environmental Planning Policy (SEPP) in as little as 20 days through a private certifier. We evaluate your block width, boundary setbacks, tree preservation orders, and easements to determine if CDC applies or if a local Council DA is required.'
    },
    {
      q: 'Who manages the demolition of my existing home?',
      a: 'JUFAJA Constructions collaborates with fully licensed and insured demolition specialists. We coordinate service abolishments (power and gas disconnections), hazardous material checks (such as safe asbestos removal), and peg-out surveys so your block is perfectly prepared for our excavation team.'
    },
    {
      q: 'How long does a knockdown rebuild project typically take?',
      a: 'From initial design sign-off to receiving keys, the complete timeline is typically between 9 to 14 months. This includes 2 to 3 months for approvals and demolition prep, followed by active construction backed by our 4-Point Hold quality inspections.'
    },
    {
      q: 'Do you offer fixed-price site costs?',
      a: 'Yes. Before you enter a formal construction contract, we conduct soil tests, site contour surveys, and council service checks to provide a comprehensive, transparent tender with guaranteed site costs, eliminating surprise variations.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Light Architectural */}
      <section className="relative bg-jufaja-ivory py-18 md:py-26 overflow-hidden border-b border-jufaja-border">
        {/* Background Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jufaja-gold/40 text-jufaja-forest text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Compass className="w-3.5 h-3.5 text-jufaja-gold" />
              <span>Greater Sydney Knockdown Rebuild Specialists</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-jufaja-forest tracking-tight leading-[1.08]">
              Love Your Street.<br />
              <span className="text-jufaja-gold font-normal italic">Rebuild Your Dream.</span>
            </h1>

            <p className="text-jufaja-muted text-base sm:text-lg leading-relaxed font-sans">
              Don’t spend tens of thousands of dollars in government stamp duty moving away. Keep your established garden, local school zone, and beloved neighbours while replacing your outdated house with an architect-crafted JUFAJA residence.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#feasibility"
                className="px-8 py-4 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow-md border border-jufaja-gold/40 flex items-center gap-2"
              >
                <span>Check Block Feasibility</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </a>
              <Link
                href="/designs"
                className="px-6 py-4 rounded-lg bg-white hover:bg-jufaja-ivory border border-jufaja-border text-jufaja-forest text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Explore 63 Home Designs
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-jufaja-border/80">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-gold">$0</p>
                <p className="text-xs text-jufaja-muted font-sans font-medium mt-0.5">Stamp Duty on Land</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-forest">20-Day</p>
                <p className="text-xs text-jufaja-muted font-sans font-medium mt-0.5">CDC Approval Pathway</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-gold">25-Year</p>
                <p className="text-xs text-jufaja-muted font-sans font-medium mt-0.5">Structural Guarantee</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-jufaja-forest">4-Point</p>
                <p className="text-xs text-jufaja-muted font-sans font-medium mt-0.5">Quality Hold Points</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rebuild vs Renovate Matrix */}
      <section className="py-16 md:py-24 bg-white border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Strategic Decision Making
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              Why Knockdown Rebuild Outperforms Renovating
            </h2>
            <p className="text-jufaja-muted text-sm sm:text-base mt-3 font-sans">
              Compare the long-term investment, structural safeguards, and lifestyle advantages of rebuilding with JUFAJA versus renovating or buying elsewhere.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-jufaja-border rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-jufaja-ivory text-jufaja-forest">
                  <th className="p-4 sm:p-5 font-serif font-semibold text-sm border-b border-jufaja-border">
                    Decision Factor
                  </th>
                  <th className="p-4 sm:p-5 font-serif font-bold text-sm border-b border-jufaja-border bg-jufaja-forest text-white">
                    JUFAJA Knockdown Rebuild
                  </th>
                  <th className="p-4 sm:p-5 font-serif font-semibold text-sm border-b border-jufaja-border">
                    Major Renovation
                  </th>
                  <th className="p-4 sm:p-5 font-serif font-semibold text-sm border-b border-jufaja-border">
                    Relocating &amp; Buying New
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jufaja-border text-xs sm:text-sm font-sans">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-jufaja-ivory/40'}>
                    <td className="p-4 sm:p-5 font-semibold text-jufaja-forest">
                      {row.factor}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-jufaja-forest bg-jufaja-gold/10 border-x border-jufaja-gold/20 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-jufaja-forest shrink-0 mt-0.5" />
                      <span>{row.kdrb}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-jufaja-muted">
                      {row.renovate}
                    </td>
                    <td className="p-4 sm:p-5 text-jufaja-muted">
                      {row.buyNew}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Feasibility Calculator Section */}
      <section id="feasibility" className="py-16 md:py-24 bg-jufaja-ivory border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
                Instant Block Assessment
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest leading-tight">
                Discover What You Can Build On Your Block
              </h2>
              <p className="text-jufaja-muted text-sm sm:text-base leading-relaxed font-sans">
                Whether you own a narrow 10m inner-west block or an expansive 20m frontage in the Hills or South West, our design team has ready-to-build plans engineered for your land.
              </p>
              <div className="space-y-3 pt-2 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-jufaja-forest text-jufaja-gold flex items-center justify-center font-bold text-xs border border-jufaja-gold/30">
                    1
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-jufaja-charcoal">
                    Complimentary contour survey and drainage assessment
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-jufaja-forest text-jufaja-gold flex items-center justify-center font-bold text-xs border border-jufaja-gold/30">
                    2
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-jufaja-charcoal">
                    Council planning instrument review (CDC vs DA feasibility)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-jufaja-forest text-jufaja-gold flex items-center justify-center font-bold text-xs border border-jufaja-gold/30">
                    3
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-jufaja-charcoal">
                    Fixed-price site costs including demolition coordination
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <FeasibilityCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-16 md:py-24 bg-white border-b border-jufaja-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              End-To-End Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              Our 5-Step Knockdown Rebuild Journey
            </h2>
            <p className="text-jufaja-muted text-sm sm:text-base mt-3 font-sans">
              From site contour peg-out to key handover, here is how JUFAJA manages every phase seamlessly.
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-jufaja-ivory border-b border-jufaja-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-jufaja-gold">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-jufaja-forest mt-2">
              Knockdown Rebuild FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => (
              <div 
                key={fIdx} 
                className="bg-white rounded-xl border border-jufaja-border p-6 sm:p-7 shadow-sm space-y-2"
              >
                <h3 className="font-serif text-lg font-semibold text-jufaja-forest flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-jufaja-gold shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-jufaja-muted leading-relaxed pl-7 font-sans">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-jufaja-forest text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-fine opacity-5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
            Ready To Explore Rebuilding On Your Block?
          </h2>
          <p className="text-jufaja-ivory/80 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Speak directly with our senior site engineers for a complimentary on-site feasibility evaluation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-lg bg-jufaja-gold hover:bg-jufaja-gold-400 text-jufaja-forest text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all shadow"
            >
              Book Complimentary Site Appraisal
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors"
            >
              View Our Completed Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
