import Link from 'next/link';
import { pageMetadata } from '@/lib/site-metadata';

export const metadata = pageMetadata('Enquiry privacy', 'How this website handles the details you submit in an enquiry.', '/privacy');

export default function PrivacyPage() {
  return <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
    <p className="eyebrow">Your information</p>
    <h1 className="type-h1 mt-4 font-serif text-jufaja-forest">Enquiry privacy.</h1>
    <div className="mt-10 space-y-8 text-base leading-7 text-jufaja-muted">
      <section><h2 className="type-h3 font-serif text-jufaja-forest">What you submit</h2><p className="mt-3">The enquiry forms ask for your name, email and phone number. You can also provide a build location, project interest, land status and message. A selected design or concept is included so JUFAJA can understand your enquiry.</p></section>
      <section><h2 className="type-h3 font-serif text-jufaja-forest">How enquiries are delivered</h2><p className="mt-3">The website sends accepted enquiries by email through Resend to the configured JUFAJA enquiry recipient. Your email is used as the reply address. The form does not create a public listing or save enquiries to the website repository.</p></section>
      <section><h2 className="type-h3 font-serif text-jufaja-forest">Hosting and spam protection</h2><p className="mt-3">Vercel hosts this website. The enquiry service uses a hidden spam-check field and Upstash rate limiting. The rate limiter uses a hashed connection identifier with a short expiry. Hosting and email providers may also process request or delivery information as part of their services.</p></section>
      <section><h2 className="type-h3 font-serif text-jufaja-forest">Keep your message relevant</h2><p className="mt-3">Please send only the details needed to discuss your project. Avoid sending identity documents, payment details or other sensitive information through this form.</p></section>
      <section><h2 className="type-h3 font-serif text-jufaja-forest">Questions about your enquiry</h2><p className="mt-3">Use the <Link href="/contact" className="text-jufaja-forest underline underline-offset-4">contact page</Link> to ask about information submitted through this website, including a correction or deletion request.</p></section>
    </div>
  </div>;
}
