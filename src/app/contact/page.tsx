import PageHero from '@/components/ui/PageHero';
import { pageMetadata } from '@/lib/site-metadata';
import EnquiryForm from '@/components/contact/EnquiryForm';
import BusinessContactDetails from '@/components/contact/BusinessContactDetails';
import { getEnquiryContext } from '@/lib/enquiry-context';

export const metadata = pageMetadata('Contact', 'Send JUFAJA Constructions an enquiry about home designs, custom homes, knockdown rebuild or house and land options.', '/contact');

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const context = getEnquiryContext(query);
  return (
    <div className="min-h-screen bg-jufaja-cream">
      <PageHero image="/images/architecture/daylight-paired-homes.webp" tone="ivory" label="Architecture reference">
        <p className="eyebrow">Contact</p>
          <h1 className="type-h1 mt-3 font-serif text-jufaja-forest">Tell us what you’re planning.</h1>
          <p className="type-lead mt-5 max-w-2xl text-jufaja-muted">Tell us about your site, the home you have in mind and the questions you want answered.</p>
      </PageHero>
      <section className="contact-scene mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <h2 className="type-h3 font-serif text-jufaja-forest">A useful starting point</h2>
          <p className="mt-4 text-sm leading-6 text-jufaja-muted">Include your build suburb, whether you already have land, and the spaces that matter to you. You can ask for a current plan, a specification schedule or a discussion about your site.</p>
          <BusinessContactDetails />
        </div>
        <div className="lg:col-span-8">
          <EnquiryForm key={`${context.enquiryType}:${context.target}`} context={context} />
        </div>
      </section>
    </div>
  );
}
