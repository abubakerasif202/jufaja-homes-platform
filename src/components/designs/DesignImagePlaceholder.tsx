interface Props {
  designName: string;
  className: string;
}

export default function DesignImagePlaceholder({ designName, className }: Props) {
  return (
    <div
      role="img"
      aria-label={`A representative exterior rendering for ${designName} is pending review.`}
      className={`flex items-center justify-center bg-jufaja-stone px-6 text-center ${className}`}
    >
      <span className="max-w-xs border-y border-jufaja-gold-500/50 py-3 font-serif text-lg text-jufaja-forest">
        Exterior rendering pending
      </span>
    </div>
  );
}
