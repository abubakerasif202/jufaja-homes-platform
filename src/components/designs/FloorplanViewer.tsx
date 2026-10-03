import ButtonLink from '@/components/ui/ButtonLink';

interface Props {
  designName: string;
}

export default function FloorplanViewer({ designName }: Props) {
  return (
    <section className="flex min-h-72 flex-col justify-center border border-jufaja-border bg-white p-6 shadow-jufaja-soft sm:min-h-96 sm:p-9">
      <p className="eyebrow">Floorplan drawings</p>
      <h2 className="type-h3 mt-3 font-serif text-jufaja-forest">{designName}</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-jufaja-muted">
        A verified floorplan drawing is not available for online review. Ask JUFAJA for the current plan and confirm all dimensions before relying on this listing.
      </p>
      <ButtonLink href={`/contact?design=${encodeURIComponent(designName)}`} variant="outline" className="mt-6 self-start">Request the current floorplan</ButtonLink>
    </section>
  );
}
