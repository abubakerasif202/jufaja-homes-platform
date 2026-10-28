import './home-bright.css';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, CarFront, Home, Layers, LandPlot, PencilRuler, RefreshCw, Warehouse } from 'lucide-react';
import InspirationGalleries from '@/components/gallery/InspirationGalleries';
import { buildGalleryCategories } from '@/data/inspiration';
import type { HomeDesign } from '@/types';

const categories = [
  { label: 'Single Storey', href: '/designs?dwelling_type=single', icon: Home },
  { label: 'Double Storey', href: '/designs?dwelling_type=double', icon: Layers },
  { label: 'Duplex & Dual Living', href: '/designs?dwelling_type=duplex', icon: Warehouse },
  { label: 'House & Land', href: '/packages', icon: LandPlot },
  { label: 'Knockdown Rebuild', href: '/knockdown-rebuild', icon: RefreshCw },
  { label: 'Custom Homes', href: '/custom-homes', icon: PencilRuler },
];
const topics = [
  { title: 'Personal service', copy: 'Talk about who you will work with and how communication should happen.' },
  { title: 'Quality construction', copy: 'Ask how quality reviews are planned, recorded and shared during a build.' },
  { title: 'Considered craftsmanship', copy: 'Discuss the materials, finishes and details that matter to you.' },
  { title: 'Local experience', copy: 'Review your site, its context and the approvals that may apply.' },
];

const HOME_GALLERY_IDS = ['luxury-bathrooms', 'modern-kitchens', 'new-home-facades', 'outdoor-living'];

export default function CasaviewHome({ designs }: { designs: HomeDesign[] }) {
  const concepts = [
    { title: 'Stone & timber', image: '/images/architecture/daylight-family-home.webp' },
    { title: 'Sculptural forms', image: '/images/architecture/daylight-sculptural-home.webp' },
    { title: 'Contemporary living', image: '/images/architecture/daylight-cantilever-home.webp' },
  ];
  const galleries = buildGalleryCategories(designs).filter((category) => HOME_GALLERY_IDS.includes(category.id));
  const featured = ['single', 'double', 'duplex'].flatMap((type) => {
    const hasFacade = (item: HomeDesign) => item.facades.length > 0;
    const design = designs.find((item) => item.featured && item.dwellingType === type && hasFacade(item))
      ?? designs.find((item) => item.dwellingType === type && hasFacade(item));
    return design ? [design] : [];
  });
  return (
    <div className="cv-home">
      <section className="editorial-hero" aria-labelledby="editorial-heading">
        <figure className="editorial-hero__figure">
          <div className="editorial-hero__photo"><Image src="/images/architecture/daylight-family-home.webp" alt="Illustrative architectural concept of a stone and timber home" fill priority fetchPriority="high" sizes="(min-width: 1100px) 54vw, 100vw" quality={80} /></div>
          <figcaption>Client-supplied architectural concept · Not a completed JUFAJA project</figcaption>
        </figure>
        <div className="editorial-hero__content">
          <p className="cv-kicker">Custom homes · Sydney</p>
          <h1 id="editorial-heading">Beautiful Homes.<br /><em>Thoughtfully Built.</em></h1>
          <p>Discover considered home design, quality craftsmanship and spaces shaped around the way you want to live.</p>
          <div className="editorial-actions"><Link href="/designs" className="cv-button cv-button--light">Explore our homes <ArrowRight aria-hidden="true" size={17} /></Link><Link href="/contact" className="cv-card-link">Enquire now <ArrowRight aria-hidden="true" size={17} /></Link></div>
        </div>
      </section>
      <section className="editorial-introduction cv-section"><div className="cv-container"><p className="cv-kicker">Welcome to JUFAJA</p><h2>Space for the life<br /><em>you imagine.</em></h2><p>Explore home designs and building enquiries with JUFAJA Constructions in Sydney. From a custom brief to a knockdown rebuild, start with your site, your priorities and the way you want to live.</p><Link href="/about-us" className="cv-card-link">Discover JUFAJA <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
      <section className="cv-section editorial-services" aria-labelledby="editorial-services-heading"><div className="cv-container"><div className="cv-section-heading"><p className="cv-kicker">Ways to build</p><h2 id="editorial-services-heading">A considered beginning.</h2></div><div className="editorial-service-grid">{[
        { title: 'Custom luxury homes', href: '/custom-homes', image: '/images/architecture/daylight-cantilever-home.webp', copy: 'A brief shaped around your site, your spaces and your priorities.' },
        { title: 'Knockdown & rebuild', href: '/knockdown-rebuild', image: '/images/architecture/daylight-sculptural-home.webp', copy: 'Explore the possibilities of a new home at your existing address.' },
        { title: 'Duplex & dual living', href: '/designs?dwelling_type=duplex', image: '/images/architecture/daylight-paired-homes.webp', copy: 'Discover design options for sites that can support dual living.' },
      ].map(service => <article key={service.href}><Link href={service.href} className="editorial-service-photo" aria-label={service.title}><Image src={service.image} alt={`Architectural concept for ${service.title.toLowerCase()}`} fill sizes="(min-width: 900px) 33vw, 100vw" /></Link><p className="editorial-caption">Illustrative architectural concept</p><h3><Link href={service.href}>{service.title}</Link></h3><p>{service.copy}</p><Link href={service.href} className="cv-card-link">Explore <ArrowRight aria-hidden="true" size={17} /></Link></article>)}</div></div></section>
      <section className="cv-section editorial-properties" aria-labelledby="editorial-properties-heading"><div className="cv-container"><div className="cv-section-heading"><p className="cv-kicker">Architectural ideas</p><h2 id="editorial-properties-heading">Architecture, in focus.</h2><p>Client-supplied architectural concepts to help shape your brief. These are illustrative designs, not photographs of completed JUFAJA projects.</p></div><div className="editorial-service-grid">{concepts.map(concept => <figure key={concept.title}><Link href="/inspiration" className="editorial-service-photo" aria-label={`Explore ${concept.title.toLowerCase()} inspiration`}><Image src={concept.image} alt={`${concept.title}, illustrative architectural concept`} fill sizes="(min-width: 900px) 33vw, 100vw" /></Link><figcaption><h3>{concept.title}</h3><p>Illustrative architectural concept</p></figcaption></figure>)}</div><Link href="/projects" className="cv-card-link">View the property gallery <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
      <nav className="cv-selector" aria-label="Explore building options">{categories.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="cv-selector__link"><Icon className="cv-selector__icon" aria-hidden="true" strokeWidth={1.3} /><span>{label}</span><ArrowRight aria-hidden="true" size={15} /></Link>)}</nav>
      <section className="cv-section" aria-labelledby="cv-designs-heading"><div className="cv-container">
        <div className="cv-section-heading"><div><p className="cv-kicker">Find your next home</p><h2 id="cv-designs-heading">Explore our home designs</h2></div><Link href="/designs" className="cv-card-link">View all designs <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <div className="cv-design-grid">{featured.map((design) => <article className="cv-design-card" key={design.id}>
          <Link className="cv-design-card__image" href={`/designs/${design.slug}`} aria-label={`Explore ${design.name}`}><Image src={design.facades[0].image} alt={`${design.name}, illustrative facade concept`} fill quality={85} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /></Link>
          <div className="cv-design-card__body"><h3><Link href={`/designs/${design.slug}`}>{design.name}</Link></h3><div className="cv-design-card__specs"><span><BedDouble aria-hidden="true" size={18} />{design.bedrooms}<span className="sr-only"> bedrooms</span></span><span><Bath aria-hidden="true" size={18} />{design.bathrooms}<span className="sr-only"> bathrooms</span></span><span><CarFront aria-hidden="true" size={18} />{design.garages}<span className="sr-only"> garage spaces</span></span><span>{design.houseSizeSquares} sq</span></div><Link href={`/designs/${design.slug}`} className="cv-card-link">View design <ArrowRight aria-hidden="true" size={17} /></Link></div>
        </article>)}</div>
      </div></section>
      <section className="cv-studies" aria-labelledby="cv-studies-heading"><div className="cv-container">
        <div className="cv-studies__intro"><p className="cv-kicker">Space. Light. Possibility.</p><h2 id="cv-studies-heading">Design inspiration</h2><p>Ideas for bathrooms, kitchens, facades and outdoor living to help shape your brief. Interior and outdoor images are third-party inspiration photography, and facades are illustrative; none are completed JUFAJA projects.</p><Link href="/inspiration" className="cv-button">Explore all inspiration <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <InspirationGalleries categories={galleries} />
      </div></section>
      <section className="cv-about" aria-labelledby="cv-about-heading"><div className="cv-about__image"><Image src="/images/architecture/daylight-stone-residence.webp" alt="Illustrative stone residence with a landscaped garden" fill sizes="(min-width: 900px) 50vw, 100vw" /></div><div className="cv-about__content"><p className="cv-kicker">Welcome to JUFAJA</p><h2 id="cv-about-heading">Homes designed<br />around you.</h2><p>Every project begins with different priorities. Share what you are planning, where you hope to build, and the questions you want answered.</p><p>The JUFAJA team can help you explore the designs and services available, from a new home to a custom brief or knockdown rebuild.</p><Link href="/about-us" className="cv-button">About JUFAJA <ArrowRight aria-hidden="true" size={18} /></Link></div></section>
      <section className="cv-difference" aria-labelledby="cv-difference-heading"><div className="cv-difference__image"><Image src="/images/architecture/limestone-courtyard-detail.webp" alt="Illustrative limestone and timber courtyard detail with forest-green window frames" fill sizes="(min-width: 900px) 45vw, 100vw" /></div><div className="cv-difference__content"><p className="cv-kicker">The JUFAJA difference</p><h2 id="cv-difference-heading">Consider every detail.</h2><p>Use these topics to shape a conversation about your plans.</p><div className="cv-topic-grid">{topics.map((topic) => <article className="cv-topic" key={topic.title}><h3>{topic.title}</h3><p>{topic.copy}</p></article>)}</div><Link href="/contact" className="cv-card-link">Talk through your plans <ArrowRight aria-hidden="true" size={18} /></Link></div></section>
      <section className="cv-section editorial-planning" aria-labelledby="editorial-planning-heading"><div className="cv-container"><p className="cv-kicker">Explore the possibilities</p><h2 id="editorial-planning-heading">Imagine your future home.</h2><p>Explore home designs, gather your preferences and visualise possibilities with our home design catalogue. Illustrative designs are a starting point for a conversation, not council-approved construction plans.</p><Link href="/designs" className="cv-button">Explore home designs <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
      <section className="cv-section editorial-journey" aria-labelledby="editorial-journey-heading"><div className="cv-container"><p className="cv-kicker">Planning your building journey</p><h2 id="editorial-journey-heading">Start with what matters.</h2><p>Use these steps to prepare your brief and your conversation with JUFAJA.</p><ol>{[
        ['Share your vision', 'Tell us how you want to live and what matters most in your future home.'],
        ['Consider your site', 'Discuss boundaries, access, levels and the planning advice your property needs.'],
        ['Explore your brief', 'Review layouts, materials and finishes, and confirm the appropriate next steps.'],
      ].map(([title, copy], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol><Link href="/contact" className="cv-card-link">Start a conversation <ArrowRight aria-hidden="true" size={17} /></Link></div></section>
      <section className="cv-leadership" aria-labelledby="cv-leadership-heading"><div className="cv-container"><div className="cv-leadership__image"><Image src="/brand/javed-iqbal-executive.webp" alt="Portrait of Javed Iqbal, Chief Executive Officer of JUFAJA Constructions" fill sizes="(min-width: 900px) 30vw, 80vw" /></div><div className="cv-leadership__content"><p className="cv-kicker">Our leadership</p><h2 id="cv-leadership-heading">Javed Iqbal</h2><p className="cv-kicker">Chief Executive Officer<br />JUFAJA Constructions Pty Ltd</p><h3>A home starts with a conversation.</h3><p>Share what you are planning, where you hope to build, and the questions you want answered. The JUFAJA team can help you explore the designs and services available.</p><Link href="/about-us" className="cv-button">Meet JUFAJA <ArrowRight aria-hidden="true" size={18} /></Link></div></div></section>
      <section className="cv-contact" aria-labelledby="cv-contact-heading"><div className="cv-container"><div className="cv-contact__content"><p className="cv-kicker">Your next chapter</p><h2 id="cv-contact-heading">Let’s talk about your future home.</h2><p>Tell us what you have in mind, where you hope to build, and what matters most.</p></div><div className="cv-contact__actions"><Link href="/contact" className="cv-button cv-button--light">Enquire now <ArrowRight aria-hidden="true" size={18} /></Link><Link href="/designs" className="cv-card-link">Browse designs <ArrowRight aria-hidden="true" size={18} /></Link></div></div></section>
    </div>
  );
}
