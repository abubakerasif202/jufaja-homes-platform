import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ButtonLink from '@/components/ui/ButtonLink';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] items-center bg-jufaja-cream py-20">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="type-h1 mt-3 font-serif text-jufaja-forest">Let’s find another way.</h1>
        <p className="type-lead mx-auto mt-5 max-w-xl text-jufaja-muted">That address may have changed or the page may no longer be available.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary"><ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0" /> <span>Home</span></Link>
          <ButtonLink href="/designs" variant="outline">Browse home designs</ButtonLink>
        </div>
      </div>
    </div>
  );
}
