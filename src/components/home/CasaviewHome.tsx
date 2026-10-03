import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bath, BedDouble, CarFront, Home, Layers, LandPlot, PencilRuler, RefreshCw, Warehouse } from 'lucide-react';
import { HERO_SLIDES } from '@/data/hero-slides';
import { JUFAJA_PROJECTS } from '@/data/projects';
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

export default function CasaviewHome({ designs }: { designs: HomeDesign[] }) {
  const hero = HERO_SLIDES[0];
  const featured = designs.filter((design) => design.featured).slice(0, 3);
  return (
    <div className="cv-home">
      <section className="cv-hero" aria-labelledby="cv-hero-heading">
        <Image src={hero.photo} alt={hero.alt} fill priority sizes="100vw" className="cv-hero__image" />
        <div className="cv-hero__shade" aria-hidden="true" />
        <div className="cv-hero__content"><p className="cv-kicker">JUFAJA Constructions</p><h1 id="cv-hero-heading">Building Homes<br />for a Brighter Tomorrow.</h1><p>{hero.copy}</p><Link href="/designs" className="cv-button cv-button--light">Explore home designs <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <p className="cv-hero__caption">Illustrative architecture · not a completed JUFAJA project</p>
      </section>
      <nav className="cv-selector" aria-label="Explore building options">{categories.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="cv-selector__link"><Icon className="cv-selector__icon" aria-hidden="true" strokeWidth={1.3} /><span>{label}</span><ArrowRight aria-hidden="true" size={15} /></Link>)}</nav>
      <section className="cv-section" aria-labelledby="cv-designs-heading"><div className="cv-container">
        <div className="cv-section-heading"><div><p className="cv-kicker">Find your next home</p><h2 id="cv-designs-heading">Explore our home designs</h2></div><Link href="/designs" className="cv-card-link">View all designs <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <div className="cv-design-grid">{featured.map((design) => <article className="cv-design-card" key={design.id}>
          <Link className="cv-design-card__image" href={`/designs/${design.slug}`} aria-label={`Explore ${design.name}`}><Image src={design.facades[0].image} alt={`${design.name}, illustrative facade concept`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /><span>Illustrative facade</span></Link>
          <div className="cv-design-card__body"><h3><Link href={`/designs/${design.slug}`}>{design.name}</Link></h3><div className="cv-design-card__specs"><span><BedDouble aria-hidden="true" size={18} />{design.bedrooms}<span className="sr-only"> bedrooms</span></span><span><Bath aria-hidden="true" size={18} />{design.bathrooms}<span className="sr-only"> bathrooms</span></span><span><CarFront aria-hidden="true" size={18} />{design.garages}<span className="sr-only"> garage spaces</span></span><span>{design.houseSizeSquares} sq</span></div><Link href={`/designs/${design.slug}`} className="cv-card-link">View design <ArrowRight aria-hidden="true" size={17} /></Link></div>
        </article>)}</div>
      </div></section>
      <section className="cv-studies" aria-labelledby="cv-studies-heading"><div className="cv-container">
        <div className="cv-studies__intro"><div><p className="cv-kicker">Space. Light. Possibility.</p><h2 id="cv-studies-heading">Design inspiration</h2><p>Residential design studies to help shape your ideas. These images are illustrative references, not completed JUFAJA projects.</p></div><Link href="/projects" className="cv-button">Explore design studies <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <div className="cv-studies__grid">{JUFAJA_PROJECTS.slice(0, 3).map((project) => <Link key={project.id} href={`/contact?project=${encodeURIComponent(project.title)}`} className="cv-study"><div className="cv-study__image"><Image src={project.image} alt={`${project.title}, illustrative concept image`} fill sizes="(min-width: 768px) 33vw, 100vw" /></div><p>{project.study}</p><h3>{project.title}<ArrowRight aria-hidden="true" size={20} /></h3></Link>)}</div>
      </div></section>
      <section className="cv-about" aria-labelledby="cv-about-heading"><div className="cv-about__image"><Image src="/images/architecture/daylight-stone-residence.webp" alt="Illustrative stone residence with a landscaped garden" fill sizes="(min-width: 900px) 50vw, 100vw" /><span>Illustrative architecture</span></div><div className="cv-about__content"><p className="cv-kicker">Welcome to JUFAJA</p><h2 id="cv-about-heading">Homes designed<br />around you.</h2><p>Every project begins with different priorities. Share what you are planning, where you hope to build, and the questions you want answered.</p><p>The JUFAJA team can help you explore the designs and services available, from a new home to a custom brief or knockdown rebuild.</p><Link href="/about-us" className="cv-button">About JUFAJA <ArrowRight aria-hidden="true" size={18} /></Link></div></section>
      <section className="cv-difference" aria-labelledby="cv-difference-heading"><div className="cv-difference__image"><Image src="/images/architecture/daylight-cantilever-home.webp" alt="Illustrative contemporary home with timber soffits and glass balustrades" fill sizes="(min-width: 900px) 45vw, 100vw" /><span>Illustrative architecture</span></div><div className="cv-difference__content"><p className="cv-kicker">The JUFAJA difference</p><h2 id="cv-difference-heading">Consider every detail.</h2><p>Use these topics to shape a conversation about your plans.</p><div className="cv-topic-grid">{topics.map((topic) => <article className="cv-topic" key={topic.title}><h3>{topic.title}</h3><p>{topic.copy}</p></article>)}</div><Link href="/contact" className="cv-card-link">Talk through your plans <ArrowRight aria-hidden="true" size={18} /></Link></div></section>
      <section className="cv-leadership" aria-labelledby="cv-leadership-heading"><div className="cv-container"><div className="cv-leadership__image"><Image src="/brand/javed-iqbal-executive.png" alt="Portrait of Javed Iqbal, Chief Executive Officer of JUFAJA Constructions" fill sizes="(min-width: 900px) 30vw, 80vw" /></div><div className="cv-leadership__content"><p className="cv-kicker">Our leadership</p><h2 id="cv-leadership-heading">Javed Iqbal</h2><p className="cv-kicker">Chief Executive Officer<br />JUFAJA Constructions Pty Ltd</p><h3>A home starts with a conversation.</h3><p>Share what you are planning, where you hope to build, and the questions you want answered. The JUFAJA team can help you explore the designs and services available.</p><Link href="/about-us" className="cv-button">Meet JUFAJA <ArrowRight aria-hidden="true" size={18} /></Link></div></div></section>
      <section className="cv-contact" aria-labelledby="cv-contact-heading"><div className="cv-container"><div className="cv-contact__content"><p className="cv-kicker">Your next chapter</p><h2 id="cv-contact-heading">Let’s talk about your future home.</h2><p>Tell us what you have in mind, where you hope to build, and what matters most.</p></div><div className="cv-contact__actions"><Link href="/contact" className="cv-button cv-button--light">Enquire now <ArrowRight aria-hidden="true" size={18} /></Link><Link href="/designs" className="cv-card-link">Browse designs <ArrowRight aria-hidden="true" size={18} /></Link></div></div></section>
    </div>
  );
}
