import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'gold' | 'outline' | 'outline-light';

interface ButtonLinkProps {
  href: string;
  tabIndex?: number;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function ButtonLink({ href, variant = 'primary', arrow = true, className, children, tabIndex }: ButtonLinkProps) {
  return (
    <Link href={href} tabIndex={tabIndex} className={cn('btn', `btn-${variant}`, className)}>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />}
    </Link>
  );
}
