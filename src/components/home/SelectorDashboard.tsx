import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

const options = [
  { title: 'Single Storey Designs', copy: 'Browse single storey design listings and compare their listed specifications.', href: '/designs?dwelling_type=single', photo: '/images/architecture/daylight-family-home.webp', position: '30% 50%' },
  { title: 'Double Storey Homes', copy: 'Browse double storey design listings and compare their listed specifications.', href: '/designs?dwelling_type=double', photo: '/images/architecture/daylight-cantilever-home.webp', position: '50% 50%' },
  { title: 'Duplex & Dual Living', copy: 'Browse duplex design listings. Confirm drawings and site suitability directly.', href: '/designs?dwelling_type=duplex', photo: '/images/architecture/daylight-paired-homes.webp', position: '50% 50%' },
  { title: 'Knockdown Rebuild', copy: 'Explore questions about the site, planning requirements and rebuild scope.', href: '/knockdown-rebuild', photo: '/images/architecture/daylight-sculptural-home.webp', position: '50% 50%' },
  { title: 'House & Land Packages', copy: 'Contact JUFAJA to confirm current listings and package details.', href: '/packages', photo: '/images/architecture/daylight-family-home.webp', position: '85% 60%' },
  { title: 'Custom Architecture', copy: 'Start with your site, your priorities and a clear design brief.', href: '/custom-homes', photo: '/images/architecture/daylight-stone-residence.webp', position: '50% 50%' },
];

/** Intent selector: every tile is a direct link, so there is no extra click between interest and the relevant page. */
export default function SelectorDashboard() {
  return <section id="explore" className="service-scene" aria-labelledby="explore-heading">
    <div className="service-scene__heading">
      <Reveal><p className="eyebrow">What are you looking to build?</p><h2 id="explore-heading" className="type-display mt-4 text-jufaja-forest">Different paths.<br /><em className="font-medium">One place to begin.</em></h2></Reveal>
      <p className="max-w-sm text-sm leading-7 text-jufaja-muted">Choose the path closest to your plans. Each one leads to the relevant designs or information.</p>
    </div>
    <ul className="intent-grid">
      {options.map((item, index) => <li key={item.title}>
        <Link href={item.href} className="intent-tile group">
          <Image src={item.photo} alt="" fill sizes="(min-width: 1024px) 30vw, 78vw" className="intent-tile__img" style={{ objectPosition: item.position }} />
          <span aria-hidden="true" className="intent-tile__shade" />
          <span className="intent-tile__num" aria-hidden="true">0{index + 1}</span>
          <span className="intent-tile__body">
            <span className="intent-tile__title">{item.title}</span>
            <span className="intent-tile__copy">{item.copy}</span>
            <span className="intent-tile__cta">Explore <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span>
          </span>
        </Link>
      </li>)}
    </ul>
    <p className="mx-auto mt-4 max-w-[1600px] text-xs text-jufaja-muted">Images are illustrative architecture references, not completed JUFAJA projects.</p>
  </section>;
}
