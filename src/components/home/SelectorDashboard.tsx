'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import ButtonLink from '@/components/ui/ButtonLink';

const options = [
  { title: 'Single Storey Designs', copy: 'Browse single storey design listings and compare their listed specifications.', href: '/designs?dwelling_type=single', photo: '/images/architecture/daylight-family-home.webp' },
  { title: 'Double Storey Homes', copy: 'Browse double storey design listings and compare their listed specifications.', href: '/designs?dwelling_type=double', photo: '/images/architecture/daylight-cantilever-home.webp' },
  { title: 'Knockdown Rebuild', copy: 'Explore questions about the site, planning requirements and rebuild scope.', href: '/knockdown-rebuild', photo: '/images/architecture/daylight-sculptural-home.webp' },
  { title: 'Duplex & Dual Living', copy: 'Browse duplex design listings. Confirm drawings and site suitability directly.', href: '/designs?dwelling_type=duplex', photo: '/images/architecture/daylight-paired-homes.webp' },
  { title: 'House & Land Packages', copy: 'Contact JUFAJA to confirm current listings and package details.', href: '/packages', photo: '/images/architecture/daylight-family-home.webp' },
  { title: 'Custom Architecture', copy: 'Start with your site, your priorities and a clear design brief.', href: '/custom-homes', photo: '/images/architecture/daylight-stone-residence.webp' },
];

export default function SelectorDashboard() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const option = options[active];
  return <section id="explore" className="service-scene">
    <div className="service-scene__heading"><Reveal><p className="eyebrow">01 / Your next chapter</p><h2 className="type-display mt-4 text-jufaja-forest">Different paths.<br /><em className="font-medium">One place to begin.</em></h2></Reveal><p className="max-w-sm text-sm leading-7 text-jufaja-muted">Find your living solution. Explore the designs, services and information that match what you have in mind.</p></div>
    <div className="service-scene__body">
      <div className="service-scene__image">
        <AnimatePresence mode="sync" initial={false}><motion.div key={option.photo} className="absolute inset-0" initial={reduced ? false : { opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .65 }}>
          <Image src={option.photo} alt="Illustrative residential architecture, not a completed JUFAJA project" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </motion.div></AnimatePresence>
        <div className="service-scene__image-caption"><span>Illustrative architecture</span><span aria-hidden="true">0{active + 1} / 06</span></div>
        <span aria-hidden="true" className="service-scene__large-number">0{active + 1}</span>
      </div>
      <div className="service-scene__options">
        {options.map((item, index) => <div key={item.href} className={`service-option ${active === index ? 'is-active' : ''}`}>
          <h3><button type="button" aria-expanded={active === index} aria-controls={`service-panel-${index}`} onClick={() => setActive(index)}><span className="service-option__number">0{index + 1}</span><span>{item.title}</span><ArrowUpRight aria-hidden="true" /></button></h3>
          <div id={`service-panel-${index}`} hidden={active !== index} className="service-option__detail"><p>{item.copy}</p><ButtonLink href={item.href} variant="outline">Explore information</ButtonLink></div>
        </div>)}
      </div>
    </div>
  </section>;
}
