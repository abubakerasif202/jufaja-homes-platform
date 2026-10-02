import Image from 'next/image';
import DepthFrame from '@/components/motion/DepthFrame';
import { HomeDesign } from '@/types';
import { Bed, Bath, Car } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { formatSquares, formatSqm } from '@/lib/utils';
import EnquireDesignButton from '@/components/designs/EnquireDesignButton';

interface Props {
  design: HomeDesign;
}

export default function DesignCard({ design }: Props) {
  const facade = design.facades[0];

  return (
    <DepthFrame className="design-depth"><div className="design-card bg-white rounded-sm overflow-hidden border border-jufaja-border hover:border-jufaja-gold-500 hover:-translate-y-1 shadow-sm hover:shadow-luxury transition-[transform,box-shadow,border-color] duration-300 flex flex-col justify-between group">
      
      {/* Facade Image Frame */}
      <div className="design-card__image relative h-64 w-full overflow-hidden bg-jufaja-stone">
        {facade && <Image
          src={facade.image}
          alt={`Illustrative ${facade.name} facade image for ${design.name}; confirm final design details`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 420px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />}
        <div className="absolute inset-0 bg-gradient-to-t from-jufaja-forest-950/70 via-transparent to-transparent" />

        <div className="absolute bottom-16 left-4 rounded-sm bg-white/95 px-2.5 py-1 text-[10px] font-medium text-jufaja-forest-900">Illustrative image</div>

        {/* Square Size Badge (Gold) */}
        <div className="absolute top-3.5 right-3.5 bg-jufaja-forest-900 text-white text-[11px] font-bold px-3 py-1 rounded-sm shadow border border-jufaja-gold-500/40">
          <span className="text-jufaja-gold-400 mr-1">&bull;</span>
          {formatSquares(design.houseSizeSquares)}
        </div>

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <span className="eyebrow eyebrow--light block">
              {design.dwellingType === 'single'
                ? 'Single Storey'
                : design.dwellingType === 'double'
                ? 'Double Storey'
                : design.dwellingType.toUpperCase()}
            </span>
            <span className="text-xs font-semibold text-jufaja-stone">
              Min Frontage: {design.minLotWidth}m
            </span>
          </div>
          <span className="text-xs text-jufaja-stone font-medium">
            {formatSqm(design.houseSizeSqm)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Series */}
          <div className="mb-3">
            <h3 className="font-serif text-3xl text-jufaja-forest group-hover:text-jufaja-gold-600 transition-colors">
              {design.name}
            </h3>
            <p className="text-[11px] text-jufaja-muted font-medium tracking-wide uppercase mt-0.5">
              {design.series} design
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-jufaja-border text-jufaja-charcoal text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed aria-hidden="true" className="w-3.5 h-3.5 text-jufaja-gold-600 shrink-0" />
              <span>{design.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath aria-hidden="true" className="w-3.5 h-3.5 text-jufaja-gold-600 shrink-0" />
              <span>{design.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car aria-hidden="true" className="w-3.5 h-3.5 text-jufaja-gold-600 shrink-0" />
              <span>{design.garages} Car</span>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-jufaja-muted">Listed figures are indicative. Confirm plan, dimensions and inclusions with JUFAJA.</p>
        </div>

        {/* Actions Button Strip */}
        <div className="mt-5 pt-3 border-t border-jufaja-border grid gap-2.5">
          <ButtonLink href={`/designs/${design.slug}`} className="w-full">
            View design details
          </ButtonLink>
          <EnquireDesignButton designName={design.name} squares={design.houseSizeSquares} className="btn btn-outline w-full" />
        </div>
      </div>

    </div></DepthFrame>
  );
}
