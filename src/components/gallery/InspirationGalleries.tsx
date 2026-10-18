import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import GalleryMotionShell from '@/components/gallery/GalleryMotionShell';
import type { GalleryCategory, GalleryItem } from '@/data/inspiration';

/** One loop segment must be wider than the widest viewport so the second copy always fills the gap. */
const MIN_CARDS_PER_GROUP = 8;
const SECONDS_PER_CARD = 5.5;

function fillGroup(items: GalleryItem[]): GalleryItem[] {
  const length = Math.max(MIN_CARDS_PER_GROUP, items.length);
  return Array.from({ length }, (_, position) => items[position % items.length]);
}

function GalleryGroup({ items, copy }: { items: GalleryItem[]; copy: 'primary' | 'duplicate' }) {
  const duplicate = copy === 'duplicate';
  return (
    <ul className="cv-marquee__group" aria-hidden={duplicate ? true : undefined}>
      {items.map((item, position) => (
        <li key={`${item.id}-${position}`} className="cv-gcard">
          <Link href={item.href} className="cv-gcard__link" tabIndex={duplicate ? -1 : undefined}>
            <span className="cv-gcard__image">
              <Image src={item.src} alt={duplicate ? '' : item.alt} fill sizes="(min-width: 1024px) 340px, 260px" quality={80} />
            </span>
            <span className="cv-gcard__caption">
              <span className="cv-gcard__tag">{item.tag}</span>
              <span className="cv-gcard__title">{item.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function GalleryRow({ category, index }: { category: GalleryCategory; index: number }) {
  const items = fillGroup(category.items);
  const headingId = `${category.id}-heading`;
  const style = { '--marquee-duration': `${Math.round(items.length * SECONDS_PER_CARD)}s` } as CSSProperties;
  return (
    <section id={category.id} className="cv-gallery-row" aria-labelledby={headingId}>
      <div className="cv-gallery-row__head">
        <div>
          <p className="cv-kicker">{String(index + 1).padStart(2, '0')}</p>
          <h3 id={headingId}>{category.title}</h3>
          <p>{category.blurb}</p>
        </div>
        <Link href={category.href} className="cv-card-link">{category.linkLabel} <ArrowRight aria-hidden="true" size={17} /></Link>
      </div>
      <div className="cv-marquee" data-direction={index % 2 === 0 ? 'forward' : 'reverse'} style={style}>
        <div className="cv-marquee__track">
          <GalleryGroup items={items} copy="primary" />
          <GalleryGroup items={items} copy="duplicate" />
        </div>
      </div>
    </section>
  );
}

export default function InspirationGalleries({ categories }: { categories: GalleryCategory[] }) {
  return (
    <GalleryMotionShell>
      {categories.map((category, index) => <GalleryRow key={category.id} category={category} index={index} />)}
    </GalleryMotionShell>
  );
}
