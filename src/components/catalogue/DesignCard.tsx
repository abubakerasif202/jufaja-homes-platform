import Link from 'next/link';
import Image from 'next/image';
import { HomeDesign } from '@/types';
import { Bed, Bath, Car, ArrowRight } from 'lucide-react';
import { formatSquares, formatSqm } from '@/lib/utils';
import EnquireDesignButton from '@/components/designs/EnquireDesignButton';

interface Props {
  design: HomeDesign;
}

export default function DesignCard({ design }: Props) {
  const facade = design.facades[0];

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-jufaja-gold/60 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group">
      
      {/* Facade Image Frame */}
      <div className="relative h-64 w-full overflow-hidden bg-stone-100">
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
        <div className="absolute top-3.5 right-3.5 bg-jufaja-forest text-white text-[11px] font-bold px-3 py-1 rounded-full shadow border border-jufaja-gold/40">
          <span className="text-jufaja-gold mr-1">&bull;</span>
          {formatSquares(design.houseSizeSquares)}
        </div>

        {/* Bottom Banner on Image */}
        <div className="absolute bottom-3.5 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-jufaja-gold-700 block">
              {design.dwellingType === 'single'
                ? 'Single Storey'
                : design.dwellingType === 'double'
                ? 'Double Storey'
                : design.dwellingType.toUpperCase()}
            </span>
            <span className="text-xs font-semibold text-stone-200">
              Min Frontage: {design.minLotWidth}m
            </span>
          </div>
          <span className="text-xs text-stone-300 font-medium">
            {formatSqm(design.houseSizeSqm)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Series */}
          <div className="mb-3">
            <h3 className="font-serif font-bold text-xl text-jufaja-forest group-hover:text-jufaja-gold transition-colors">
              {design.name}
            </h3>
            <p className="text-[11px] text-stone-400 font-medium tracking-wide uppercase mt-0.5">
              {design.series} design
            </p>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-stone-700 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-jufaja-gold shrink-0" />
              <span>{design.garages} Car</span>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-stone-600">Listed figures are indicative. Confirm plan, dimensions and inclusions with JUFAJA.</p>
        </div>

        {/* Actions Button Strip */}
        <div className="mt-5 pt-3 border-t border-stone-100 flex items-center gap-2.5">
          <Link
            href={`/designs/${design.slug}`}
            className="flex-1 py-2.5 px-3 rounded-lg bg-jufaja-forest hover:bg-jufaja-forest-800 text-white text-xs font-bold text-center tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 border border-jufaja-gold/40"
          >
            <span>View design details</span>
            <ArrowRight className="w-3 h-3 text-jufaja-gold" />
          </Link>
          <EnquireDesignButton designName={design.name} squares={design.houseSizeSquares} className="min-h-10 rounded-sm border border-jufaja-border px-3 text-xs font-semibold text-jufaja-forest hover:border-jufaja-gold-500" />
        </div>
      </div>

    </div>
  );
}
