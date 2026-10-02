import PageHero from '@/components/ui/PageHero';
import type { Metadata } from 'next';
import EnquiryForm from '@/components/contact/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact JUFAJA Constructions',
  description: 'Send JUFAJA Constructions an enquiry about home designs, custom homes, knockdown rebuild or house and land options.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-paired-homes.webp" tone="ivory" label="Architecture reference">
        <p className="eyebrow">Contact</p>
          <h1 className="type-h1 mt-3 font-serif text-jufaja-forest">Tell us what you’re planning.</h1>
          <p className="type-lead mt-5 max-w-2xl text-jufaja-muted">Share a few details about your plans. Please avoid including sensitive personal or financial information in the message.</p>
      </PageHero>
      <section className="contact-scene mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="type-h3 font-serif text-jufaja-forest">A useful starting point</h2>
          <p className="mt-4 text-sm leading-6 text-jufaja-muted">Let us know what you are interested in, where you hope to build and any questions you would like to discuss.</p>
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
