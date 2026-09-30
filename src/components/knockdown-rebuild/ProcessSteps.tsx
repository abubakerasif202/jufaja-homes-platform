'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  PenTool, 
  FileCheck2, 
  Tractor, 
  Hammer, 
  KeyRound, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface Step {
  step: string;
  title: string;
  duration: string;
  icon: React.ElementType;
  summary: string;
  details: string[];
}

const steps: Step[] = [
  {
    step: '01',
    title: 'Free Site Assessment & Contour Analysis',
    duration: 'Week 1 - 2',
    icon: Compass,
    summary: 'Our site specialists conduct an on-location survey of your existing property to evaluate topography, easements, and council controls.',
    details: [
      'Comprehensive slope, soil, and fall analysis',
      'Evaluation of zoning, tree preservation orders, and bushfire/flood overlays',
      'Confirmation of sewer, stormwater, and service connection points',
      'No-obligation feasibility report and preliminary site budget'
    ]
  },
  {
    step: '02',
    title: 'Design Selection & Custom Tailoring',
    duration: 'Week 3 - 5',
    icon: PenTool,
    summary: 'Select from our 63 master designs or collaborate with our architectural team to tailor floorplans specifically for your block.',
    details: [
      'Solar orientation alignment for maximum natural energy efficiency',
      'Facial selections (Modern, Hamptons, Executive, Contemporary)',
      'Custom room extensions, alfresco reconfigurations, or granny flat additions',
      'Detailed itemised tender document with guaranteed fixed-site costs'
    ]
  },
  {
    step: '03',
    title: 'Council DA or Fast-Track CDC Approval',
    duration: 'Week 6 - 12',
    icon: FileCheck2,
    summary: 'We prepare all architectural drawings, engineering schedules, and BASIX certificates, submitting for rapid approval.',
    details: [
      'Fast-track 20-day Complying Development Certificate (CDC) where eligible',
      'Comprehensive Council Development Application (DA) management',
      'Structural slab engineering, hydraulic stormwater plans, and landscape plans',
      'Zero stress: JUFAJA handles all certifier and authority liaison'
    ]
  },
  {
    step: '04',
    title: 'Demolition & Site Preparation',
    duration: 'Week 13 - 15',
    icon: Tractor,
    summary: 'We connect you with licensed, trusted demolition partners to safely disconnect services and clear the site down to bare ground.',
    details: [
      'Abolishment of electricity and gas services management',
      'Safe asbestos identification and certified removal protocols',
      'Erosion sediment controls, tree protection fencing, and sediment traps',
      'Final soil test and site peg-out survey ready for excavation'
    ]
  },
  {
    step: '05',
    title: 'Construction & 4-Point Hold Inspections',
    duration: 'Months 4 - 9',
    icon: Hammer,
    summary: 'Your dedicated Site Supervisor oversees each build stage, subject to JUFAJA’s stringent independent 4-Point Hold Quality Inspections.',
    details: [
      'Independent engineer sign-off on piering and steel waffle slab foundation',
      'Pre-lining structural frame, electrical, and plumbing hold-point inspection',
      'Waterproofing certification for all wet areas prior to tiling',
      'Weekly progress photos and transparent builder updates'
    ]
  },
  {
    step: '06',
    title: 'Handover & 25-Year Structural Warranty',
    duration: 'Final Month',
    icon: KeyRound,
    summary: 'Receive the keys to your brand-new architectural sanctuary, backed by industry-leading warranties and ongoing post-handover care.',
    details: [
      'Comprehensive pre-handover PCI (Practical Completion Inspection) walk-through',
      'Full occupation certificate (OC) and appliance warranty handover kit',
      '3-month and 12-month post-handover maintenance warranty inspections',
      '25-year structural lifetime warranty backing JUFAJA’s commitment'
    ]
  }
];

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const openConsultation = () => {
    window.dispatchEvent(
      new CustomEvent('open-enquiry-drawer', {
        detail: { context: `Knockdown Rebuild Consultation (Inquiring about Step ${steps[activeStep].step}: ${steps[activeStep].title})` }
      })
    );
  };

  return (
    <div className="space-y-10">
      {/* Step Numbers Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={item.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-jufaja-forest text-white border-jufaja-forest shadow-md ring-2 ring-jufaja-gold ring-offset-2'
                  : 'bg-white text-jufaja-forest border-jufaja-border hover:border-jufaja-gold/40 hover:bg-jufaja-ivory'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-semibold tracking-widest ${isActive ? 'text-jufaja-gold' : 'text-jufaja-muted/70'}`}>
                  PHASE {item.step}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-jufaja-gold' : 'text-jufaja-muted'}`} />
              </div>
              <div>
                <p className={`text-xs font-serif font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-jufaja-forest'}`}>
                  {item.title}
                </p>
                <div className={`flex items-center gap-1 mt-2 text-[10px] font-sans font-medium ${isActive ? 'text-jufaja-gold' : 'text-jufaja-muted'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="bg-white rounded-2xl border border-jufaja-border p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-jufaja-gold text-jufaja-forest text-xs font-semibold uppercase tracking-wider">
                Stage {steps[activeStep].step}
              </span>
              <span className="text-xs font-medium text-jufaja-muted flex items-center gap-1.5 font-sans">
                <Clock className="w-3.5 h-3.5 text-jufaja-gold" />
                Estimated Timeline: {steps[activeStep].duration}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-jufaja-forest">
              {steps[activeStep].title}
            </h3>

            <p className="text-jufaja-muted text-sm md:text-base leading-relaxed font-sans">
              {steps[activeStep].summary}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-jufaja-forest uppercase tracking-wider mb-3 font-sans">
                Key Milestone Deliverables &amp; Safeguards:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-jufaja-ivory border border-jufaja-border">
                    <ShieldCheck className="w-4 h-4 text-jufaja-gold shrink-0 mt-0.5" />
                    <span className="text-xs text-jufaja-charcoal font-medium font-sans leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-jufaja-ivory rounded-xl p-6 border border-jufaja-border flex flex-col justify-between h-full space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-jufaja-forest text-jufaja-gold flex items-center justify-center border border-jufaja-gold/30">
                {React.createElement(steps[activeStep].icon, { className: 'w-5 h-5' })}
              </div>
              <h4 className="font-serif font-bold text-jufaja-forest text-lg">
                Ready to begin Phase {steps[activeStep].step}?
              </h4>
              <p className="text-xs text-jufaja-muted leading-relaxed font-sans">
                Our Knockdown Rebuild specialists are available for complimentary on-site consultations across Greater Sydney, Western Sydney, and the Illawarra.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={openConsultation}
                className="w-full py-3.5 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 border border-jufaja-gold/40"
              >
                <span>Book Phase {steps[activeStep].step} Review</span>
                <ArrowRight className="w-4 h-4 text-jufaja-gold" />
              </button>
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className={`text-xs font-medium font-sans ${activeStep === 0 ? 'text-jufaja-muted/40 cursor-not-allowed' : 'text-jufaja-muted hover:text-jufaja-forest'}`}
                >
                  &larr; Previous Stage
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className={`text-xs font-medium font-sans ${activeStep === steps.length - 1 ? 'text-jufaja-muted/40 cursor-not-allowed' : 'text-jufaja-forest hover:text-jufaja-gold'}`}
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
