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
      'Weekly progress photos and transparent portal updates'
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
                  ? 'bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-orange ring-offset-2'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-black tracking-widest ${isActive ? 'text-brand-orange' : 'text-slate-400'}`}>
                  PHASE {item.step}
                </span>
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-orange' : 'text-slate-400'}`} />
              </div>
              <div>
                <p className={`text-xs font-bold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-slate-800'}`}>
                  {item.title}
                </p>
                <div className={`flex items-center gap-1 mt-2 text-[10px] font-semibold ${isActive ? 'text-brand-orange' : 'text-slate-500'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-black uppercase tracking-wider">
                Stage {steps[activeStep].step}
              </span>
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-orange" />
                Estimated Timeline: {steps[activeStep].duration}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-brand-navy">
              {steps[activeStep].title}
            </h3>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {steps[activeStep].summary}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Key Milestone Deliverables & Safeguards:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-snug">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-orange flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, { className: 'w-5 h-5' })}
              </div>
              <h4 className="font-extrabold text-brand-navy text-base">
                Ready to begin Phase {steps[activeStep].step}?
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Knockdown Rebuild advisors are available for complimentary on-site consultations across Greater Sydney, Western Sydney, and the Illawarra.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={openConsultation}
                className="w-full py-3 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-extrabold uppercase tracking-wider shadow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Phase {steps[activeStep].step} Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className={`text-xs font-bold ${activeStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-brand-navy'}`}
                >
                  &larr; Previous Stage
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className={`text-xs font-bold ${activeStep === steps.length - 1 ? 'text-slate-300 cursor-not-allowed' : 'text-brand-navy hover:text-brand-orange'}`}
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
