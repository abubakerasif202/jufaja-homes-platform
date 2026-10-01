import ButtonLink from '@/components/ui/ButtonLink';

export default function ContactPrompt() {
  return (
    <section className="relative overflow-hidden border-t border-jufaja-border bg-jufaja-cream py-20 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blueprint-fine opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="eyebrow mb-3">A considered first step</p>
        <h2 className="type-h2 font-serif text-jufaja-forest">Start with a conversation.</h2>
        <p className="type-lead mx-auto mt-5 max-w-2xl text-jufaja-muted">Tell us what you have in mind, where you hope to build, and what matters most in your future home. We can help you explore the next steps.</p>
        <ButtonLink href="/contact" className="mt-8">Talk with JUFAJA</ButtonLink>
      </div>
    </section>
  );
}
