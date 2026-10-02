import ParallaxImage from '@/components/motion/ParallaxImage';
import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/motion/Reveal';

export default function ContactPrompt() {
  return (
    <section aria-labelledby="contact-prompt-heading" className="contact-prompt relative isolate overflow-hidden bg-jufaja-forest-950 py-24 text-white sm:py-32">
      <ParallaxImage
        src="/images/architecture/daylight-paired-homes.webp"
        alt=""
        frameClassName="absolute inset-0 -z-20"
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 contact-prompt__scrim" />
      <div aria-hidden="true" className="bg-blueprint-dark absolute inset-0 -z-10 opacity-40" />
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow eyebrow--light flex items-center gap-3"><span aria-hidden="true" className="h-px w-10 bg-jufaja-gold-500" />A considered first step</p>
            <h2 id="contact-prompt-heading" className="type-display mt-5 text-white">Start with a conversation.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="type-lead mt-6 max-w-2xl text-jufaja-ivory/80">Tell us what you have in mind, where you hope to build, and what matters most in your future home. We can help you explore the next steps.</p>
          </Reveal>
        </div>
        <Reveal delay={0.25} className="lg:col-span-6 lg:justify-self-end">
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="gold">Talk with JUFAJA</ButtonLink>
            <ButtonLink href="/designs" variant="outline-light" arrow={false}>Browse designs</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
