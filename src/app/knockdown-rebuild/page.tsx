import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  HeartHandshake
} from 'lucide-react';
import FeasibilityCalculator from '@/components/knockdown-rebuild/FeasibilityCalculator';
import ProcessSteps from '@/components/knockdown-rebuild/ProcessSteps';

export const metadata: Metadata = {
  title: 'Knockdown Rebuild Sydney | JUFAJA Homes & Constructions',
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
      kdrb: '25-Year Structural Lifetime Warranty & brand-new warranties',
      renovate: 'High risk of uncovering hidden rot, termites, and old wiring',
      buyNew: 'Existing home wear-and-tear or expired builder warranties'
    },
    {
      factor: 'School Zones & Lifestyle',
      kdrb: 'Stay in your established suburb, kids remain in their schools',
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
      a: 'JUFAJA Homes collaborates with fully licensed and insured demolition specialists. We coordinate service abolishments (power and gas disconnections), hazardous material checks (such as safe asbestos removal), and peg-out surveys so your block is perfectly prepared for our excavation team.'
    },
    {
      q: 'How long does a knockdown rebuild project typically take?',
      a: 'From initial design sign-off to receiving keys, the complete timeline is typically between 9 to 14 months. This includes 2 to 3 months for approvals and demolition prep, followed by 6 to 9 months of active construction backed by our 4-Point Hold quality inspections.'
    },
    {
      q: 'Do you offer fixed-price site costs?',
      a: 'Yes. Before you enter a formal construction contract, we conduct soil tests, site contour surveys, and council service checks to provide a comprehensive, transparent tender with guaranteed site costs, eliminating surprise variations.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="JUFAJA Architectural Residence"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Greater Sydney Knockdown Rebuild Specialists</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Love Your Street.<br />
              <span className="text-brand-orange">Rebuild Your Dream.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Don’t spend tens of thousands of dollars in government stamp duty moving away. Keep your established garden, local school zone, and beloved neighbours while replacing your outdated house with an architect-crafted JUFAJA residence.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#feasibility"
                className="px-6 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>Check Block Feasibility</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/designs"
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
              >
                Explore 63 Home Designs
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60">
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-orange">$0</p>
                <p className="text-[11px] text-slate-300 font-medium">Stamp Duty on Land</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">20-Day</p>
                <p className="text-[11px] text-slate-300 font-medium">CDC Approval Pathway</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-brand-orange">25-Year</p>
                <p className="text-[11px] text-slate-300 font-medium">Structural Guarantee</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">4-Point</p>
                <p className="text-[11px] text-slate-300 font-medium">Quality Hold Inspections</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rebuild vs Renovate Matrix */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Strategic Decision Making
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              Why Knockdown Rebuild Outperforms Renovating
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Compare the long-term investment, structural safeguards, and lifestyle advantages of rebuilding with JUFAJA versus renovating or buying elsewhere.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-100 text-brand-navy">
                  <th className="p-4 sm:p-5 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    Decision Factor
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-xs uppercase tracking-wider border-b border-slate-200 bg-brand-navy text-white">
                    JUFAJA Knockdown Rebuild
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    Major Renovation
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    Relocating & Buying New
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      {row.factor}
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-brand-navy bg-orange-50/40 border-x border-orange-100 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.kdrb}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {row.renovate}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
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
      <section id="feasibility" className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
                Instant Block Assessment
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-navy leading-tight">
                Discover What You Can Build On Your Block
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Whether you own a narrow 10m inner-west block or an expansive 20m frontage in the Hills or South West, our design team has ready-to-build plans engineered for your land.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    Complimentary contour survey and drainage assessment
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    Site orientation analysis to maximise natural solar light
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-orange flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    Guaranteed fixed-price tender including all site works
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

      {/* 6-Stage Process Timeline Section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Transparent Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy mt-2">
              Our 6-Stage Knockdown Rebuild Journey
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We guide you from the initial survey through council certifiers, demolition, and construction with complete transparency and weekly milestones.
            </p>
          </div>

          <ProcessSteps />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              Expert Guidance
            </span>
            <h2 className="text-3xl font-black text-brand-navy mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-brand-navy flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-brand-navy text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black">
            Ready to Explore Rebuilding on Your Block?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Speak directly with our Knockdown Rebuild project directors. We provide honest feasibility checks, fixed-cost tenders, and unmatched craftsmanship.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-md"
            >
              Book Complimentary Site Inspection
            </Link>
            <a
              href="tel:0287838800"
              className="px-8 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Call (02) 8783 8800
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
