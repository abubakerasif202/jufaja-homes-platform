import Image from 'next/image';
import { DWELLING_LABELS } from '@/lib/design-labels';
import DepthFrame from '@/components/motion/DepthFrame';
import { HomeDesign } from '@/types';
import { Bed, Bath, Car } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';
import { formatSquares, formatSqm } from '@/lib/utils';
import EnquireDesignButton from '@/components/designs/EnquireDesignButton';
import DesignImagePlaceholder from '@/components/designs/DesignImagePlaceholder';

interface Props {
  design: HomeDesign;
  compact?: boolean;
}

export default function DesignCard({ design, compact = false }: Props) {
  const facade = design.facades[0];

  return (
    <DepthFrame className="design-depth"><div className="design-card bg-white rounded-sm overflow-hidden border border-jufaja-border hover:border-jufaja-gold-500 hover:-translate-y-1 shadow-sm hover:shadow-luxury transition-[transform,box-shadow,border-color] duration-300 flex flex-col justify-between group">
      
      {/* Facade Image Frame */}
      {!compact && <div className="design-card__image relative aspect-[4/3] w-full overflow-hidden bg-jufaja-stone">
        {facade ? <>
          <Image
          src={facade.image}
          alt={`Representative ${DWELLING_LABELS[design.dwellingType].toLowerCase()} exterior rendering for ${design.name}`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 420px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </> : <DesignImagePlaceholder designName={design.name} className="h-full" />}
      </div>}

      {/* Card Content Body */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {compact && <p className="mb-3 text-xs font-semibold text-jufaja-gold-600">{DWELLING_LABELS[design.dwellingType]} · {formatSquares(design.houseSizeSquares)}</p>}
          {compact && <p className="mb-3 text-xs leading-6 text-jufaja-muted">Min frontage: {design.minLotWidth}m · {formatSqm(design.houseSizeSqm)}</p>}
          {!compact && <p className="mb-3 text-xs font-semibold tracking-wide text-jufaja-gold-600">{DWELLING_LABELS[design.dwellingType]} · {formatSquares(design.houseSizeSquares)} · {formatSqm(design.houseSizeSqm)}</p>}
          {!compact && <p className="-mt-2 mb-3 text-xs leading-5 text-jufaja-muted">Minimum frontage: {design.minLotWidth}m</p>}
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
              <span className="min-w-0">{design.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath aria-hidden="true" className="w-3.5 h-3.5 text-jufaja-gold-600 shrink-0" />
              <span className="min-w-0">{design.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car aria-hidden="true" className="w-3.5 h-3.5 text-jufaja-gold-600 shrink-0" />
              <span className="min-w-0">{design.garages} Car</span>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-jufaja-muted">Reference figures · request the current plan and specifications.</p>
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
