import Image from 'next/image';
import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/motion/Reveal';
import LeadershipPortrait from '@/components/home/LeadershipPortrait';

interface LeadershipSectionProps {
  variant?: 'home' | 'about';
}

function RoofLines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 800 600" fill="none" className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[62%] text-jufaja-gold-500 opacity-25 lg:block">
      <path d="M40 520 L400 140 L760 520" stroke="currentColor" strokeWidth="1" />
      <path d="M120 520 L400 224 L680 520" stroke="currentColor" strokeWidth="0.6" />
      <path d="M0 520 H800" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 8" />
      <path d="M400 60 V560" stroke="currentColor" strokeWidth="0.6" strokeDasharray="6 8" />
      <rect x="360" y="340" width="80" height="80" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/** Leadership introduction for Javed Iqbal. The CEO title is owner-supplied; no other biography or credentials are asserted. */
export default function LeadershipSection({ variant = 'home' }: LeadershipSectionProps) {
  const isAbout = variant === 'about';

  return (
    <section aria-labelledby="leadership-heading" className={`relative isolate overflow-hidden bg-jufaja-forest-950 py-20 text-jufaja-ivory sm:py-28 lg:py-32 ${isAbout ? '' : 'leadership-scene--home'}`}>
      <div aria-hidden="true" className="bg-blueprint-dark pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_40%,rgba(41,85,64,0.55),transparent)]" />
      <RoofLines />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8 xl:gap-20">
        <div className="pl-5 sm:pl-7 lg:col-span-5">
          <LeadershipPortrait />
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow--light flex items-center gap-3">
              <span aria-hidden="true" className="h-4 w-1 bg-jufaja-burgundy-500" />
              Leadership
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 id="leadership-heading" className="type-display mt-5 text-white">Javed Iqbal</h2>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.24em] text-jufaja-gold-400 sm:text-base">Chief Executive Officer</p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-jufaja-ivory/60">JUFAJA Constructions Pty Ltd</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div aria-hidden="true" className="gold-rule my-8 w-40" />
            <p className="type-h3 max-w-xl font-serif italic text-jufaja-gold-300">A home starts with a conversation.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="type-lead mt-6 max-w-2xl text-jufaja-ivory/80">
              {isAbout
                ? 'If you are weighing up a new home, a custom brief or a knockdown rebuild, start with the questions that matter to you. The team can discuss the information shown on this site and help you understand what would need to be confirmed for your project.'
                : 'Every project begins with different priorities. Share what you are planning, where you hope to build, and the questions you want answered. The JUFAJA team can help you explore the designs and services available.'}
            </p>
            {isAbout && (
              <p className="mt-4 max-w-2xl text-sm leading-7 text-jufaja-ivory/60">
                Catalogue plans, package listings, images and indicative details are a starting point. Check availability, specifications, pricing, site conditions and approvals directly before relying on them.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={isAbout ? '/contact' : '/about-us'} variant="gold">{isAbout ? 'Start a conversation' : 'Meet JUFAJA'}</ButtonLink>
              {!isAbout && <ButtonLink href="/contact" variant="outline-light" arrow={false}>Contact</ButtonLink>}
            </div>
          </Reveal>
        </div>
      </div>

      {isAbout && (
        <div className="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal mode="mask-left" duration={1.2}>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-jufaja-gold-500/40 sm:aspect-[21/10]">
              <Image
                src="/brand/javed-iqbal-site.webp"
                alt="Javed Iqbal in a white hard hat and high-visibility vest talking with colleagues beside a project-overview whiteboard on a building site"
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                quality={85}
                className="object-cover object-[50%_30%]"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-jufaja-forest-950/40 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
