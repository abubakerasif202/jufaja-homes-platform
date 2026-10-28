import './home-bright.css';
import HeroSlideshow from '@/components/home/HeroSlideshow';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, CarFront } from 'lucide-react';
import type { HomeDesign } from '@/types';

const services = [
  { title: 'Custom Luxury Homes', href: '/custom-homes', image: '/images/architecture/daylight-stone-residence.webp', copy: 'A home that starts with your site, your priorities and your own way of living.' },
  { title: 'Knockdown & Rebuild', href: '/knockdown-rebuild', image: '/images/architecture/daylight-sculptural-home.webp', copy: 'A new perspective on the address you already call home.' },
  { title: 'Duplex & Dual Living', href: '/designs?dwelling_type=duplex', image: '/images/architecture/daylight-paired-homes.webp', copy: 'Explore the possibilities of two homes on a suitable site.' },
];

function Action({ href, children, gold = false }: { href: string; children: React.ReactNode; gold?: boolean }) {
  return <Link prefetch={false} href={href} className={gold ? 'jh-button' : 'jh-link'}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}

export default function CasaviewHome({ designs }: { designs: HomeDesign[] }) {
  const usedImages = new Set<string>();
  const featured = ['single', 'double', 'duplex'].flatMap(type => {
    const candidates = designs.filter(design => design.dwellingType === type && design.facades.length).sort((a, b) => Number(b.featured) - Number(a.featured));
    for (const design of candidates) {
      const facade = design.facades.find(item => !usedImages.has(item.image));
      if (facade) { usedImages.add(facade.image); return [{ design, facade }]; }
    }
    return [];
  });
  return (
    <div className="jh-home">
      <section className="editorial-hero" aria-labelledby="editorial-heading">
        <div className="editorial-hero__figure"><HeroSlideshow /></div>
        <div className="editorial-hero__content">
          <p className="jh-eyebrow">JUFAJA Constructions · Sydney</p>
          <h1 id="editorial-heading">Beautiful Homes.<br /><em>Thoughtfully Built.</em></h1>
          <p className="jh-hero-copy">Discover considered home design and beautiful spaces shaped around the way you want to live.</p>
          <div className="jh-actions"><Action href="/designs" gold>Explore Home Designs</Action><Action href="/contact">Enquire Now</Action></div>
          <span className="jh-hero-note">Architecture. Light. A sense of belonging.</span>
        </div>
      </section>
      <section className="jh-intro jh-container" aria-labelledby="jh-intro-heading">
        <div><p className="jh-eyebrow">01 / A considered approach</p><h2 id="jh-intro-heading">Space for the life<br /><em>you imagine.</em></h2></div>
        <div><p>From a custom brief to a new beginning on your existing block, explore home designs and building possibilities with JUFAJA Constructions in Sydney.</p><Action href="/about-us">Discover JUFAJA</Action></div>
      </section>
      <section className="jh-expertise jh-section" aria-labelledby="jh-expertise-heading"><div className="jh-container">
        <div className="jh-section-head"><div><p className="jh-eyebrow">02 / Our expertise</p><h2 id="jh-expertise-heading">Your vision.<br /><em>Its own expression.</em></h2></div><p>Different ways to build.<br />One place to begin the conversation.</p></div>
        <div className="jh-services">{services.map((service, index) => <article key={service.href}>
          <Link prefetch={false} href={service.href} className="jh-photo" aria-label={`Explore ${service.title}`}><Image src={service.image} alt={`${service.title}, illustrative architectural concept`} fill sizes={index === 0 ? '(min-width: 900px) 55vw, 100vw' : '(min-width: 900px) 30vw, 100vw'} /></Link>
          <div className="jh-service-title"><h3><Link prefetch={false} href={service.href}>{service.title}</Link></h3><Link prefetch={false} href={service.href} aria-label={`Explore ${service.title}`} className="jh-round-link"><ArrowRight size={20} aria-hidden="true" /></Link></div><p>{service.copy}</p>
        </article>)}</div><p className="jh-caption">Illustrative architectural concepts, not completed JUFAJA projects.</p>
      </div></section>
      <section className="jh-designs jh-section jh-container" aria-labelledby="jh-designs-heading">
        <div className="jh-section-head"><div><p className="jh-eyebrow">03 / Featured home designs</p><h2 id="jh-designs-heading">Find your starting point.</h2></div><Action href="/designs">View the collection</Action></div>
        <div className="jh-design-grid">{featured.map(({ design, facade }) => <article key={design.id}>
          <Link prefetch={false} className="jh-photo" href={`/designs/${design.slug}`} aria-label={`Explore ${design.name}`}><Image src={facade.image} alt={`${design.name}: illustrative facade concept`} fill sizes="(min-width: 768px) 32vw, 100vw" /></Link>
          <div className="jh-design-title"><h3><Link prefetch={false} href={`/designs/${design.slug}`}>{design.name}</Link></h3><ArrowRight size={20} aria-hidden="true" /></div>
          <div className="jh-specs"><span><BedDouble size={18} aria-hidden="true" />{design.bedrooms}<span className="sr-only"> bedrooms</span></span><span><Bath size={18} aria-hidden="true" />{design.bathrooms}<span className="sr-only"> bathrooms</span></span><span><CarFront size={18} aria-hidden="true" />{design.garages}<span className="sr-only"> garage spaces</span></span><span>{design.houseSizeSquares} sq</span></div>
          <Action href={`/designs/${design.slug}`}>View design</Action>
        </article>)}</div><p className="jh-caption">Indicative catalogue specifications and illustrative facades. Confirm suitability, plans and inclusions with JUFAJA.</p>
      </section>
      <section className="jh-catalogue" aria-labelledby="jh-catalogue-heading">
        <figure><div className="jh-photo"><Image src="/images/architecture/limestone-courtyard-detail.webp" alt="Illustrative limestone courtyard with timber detailing and natural light" fill sizes="(min-width: 900px) 55vw, 100vw" /></div><figcaption className="jh-caption">Illustrative architectural concept</figcaption></figure>
        <div className="jh-catalogue-copy"><p className="jh-eyebrow">04 / Design your future home</p><h2 id="jh-catalogue-heading">An idea today.<br /><em>Your home tomorrow.</em></h2><p>Discover layouts, explore architectural directions and gather the details that feel like you.</p><Action href="/designs" gold>Explore the catalogue</Action></div>
      </section>
      <section className="jh-journey jh-section jh-container" aria-labelledby="jh-journey-heading"><div className="jh-section-head"><div><p className="jh-eyebrow">05 / The building conversation</p><h2 id="jh-journey-heading">Begin with what matters.</h2></div><p>Three simple steps to shape your brief.</p></div><ol>{[
        ['Share your vision', 'Tell us how you want to live and what matters most.'],
        ['Consider your site', 'Discuss your block, its possibilities and the planning advice it needs.'],
        ['Shape your brief', 'Explore layouts, materials and the appropriate next steps.'],
      ].map(([title, copy], index) => <li key={title}><span className="jh-step">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
      <section className="jh-meet jh-section" aria-labelledby="jh-meet-heading"><div className="jh-container jh-meet-grid"><figure><div className="jh-portrait"><Image src="/brand/javed-iqbal-executive.webp" alt="Javed Iqbal, Chief Executive Officer of JUFAJA Constructions" fill sizes="(min-width: 900px) 30vw, 75vw" /></div><figcaption>Javed Iqbal <span>Chief Executive Officer</span></figcaption></figure><div><p className="jh-eyebrow">06 / Meet JUFAJA</p><h2 id="jh-meet-heading">A personal beginning.<br /><em>A place of your own.</em></h2><p>Every home begins with different priorities. Share what you are planning, where you hope to build and the questions you want answered.</p><p>Meet the people behind JUFAJA Constructions Pty Ltd and explore the possibilities for your next chapter.</p><Action href="/about-us">Meet JUFAJA</Action></div></div></section>
      <section className="jh-enquiry jh-section" aria-labelledby="jh-enquiry-heading"><div className="jh-container"><div><p className="jh-eyebrow">Your next chapter</p><h2 id="jh-enquiry-heading">Let’s make room<br />for <em>your future.</em></h2></div><div><p>A new home starts with a conversation.<br />Tell us what you have in mind.</p><Action href="/contact" gold>Enquire Now</Action></div></div></section>
    </div>
  );
}
