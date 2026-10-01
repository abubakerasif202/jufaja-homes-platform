import Image from 'next/image';

export default function JufajaMark({ className = 'w-10 h-auto' }: { className?: string }) {
  return <Image src="/brand/jufaja-mark.png" alt="" width={512} height={342} sizes="96px" className={`object-contain ${className}`} aria-hidden="true" />;
}
