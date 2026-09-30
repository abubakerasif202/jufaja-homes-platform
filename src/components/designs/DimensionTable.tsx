import type { HomeDesign } from '@/types';
import { formatSquares, formatSqm } from '@/lib/utils';

interface Props {
  design: HomeDesign;
}

export default function DimensionTable({ design }: Props) {
  const details = [
    ['Bedrooms', String(design.bedrooms)],
    ['Bathrooms', String(design.bathrooms)],
    ['Garage spaces', String(design.garages)],
    ['Listed floor area', `${formatSqm(design.houseSizeSqm)} · ${formatSquares(design.houseSizeSquares)}`],
    ['Listed frontage', `${design.minLotWidth} m`],
  ];

  return (
    <section className="border border-jufaja-border bg-white p-6 shadow-jufaja-soft">
      <h2 className="font-serif text-2xl text-jufaja-forest">Catalogue details</h2>
      <dl className="mt-4 divide-y divide-jufaja-border">
        {details.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
            <dt className="text-jufaja-muted">{label}</dt>
            <dd className="text-right font-semibold text-jufaja-forest-900">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-5 text-jufaja-muted">Listed figures are indicative. Confirm the current plan, dimensions, inclusions and site suitability directly with JUFAJA.</p>
    </section>
  );
}
