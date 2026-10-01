import ButtonLink from '@/components/ui/ButtonLink';

const topics = [
  { number: '01', title: 'Personal service', copy: 'Talk about who you will work with and how communication should happen.' },
  { number: '02', title: 'Quality construction', copy: 'Ask how quality reviews are planned, recorded and shared during a build.' },
  { number: '03', title: 'Considered craftsmanship', copy: 'Discuss the materials, finishes and details that matter to you.' },
  { number: '04', title: 'Local experience', copy: 'Review your site, its context and the approvals that may apply.' },
];

export default function BrandDifference() {
  return (
    <section className="border-y border-jufaja-border bg-jufaja-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="eyebrow">Start with what matters to you</p>
          <h2 className="type-h2 mt-3 font-serif text-jufaja-forest">The JUFAJA Difference</h2>
          <p className="type-lead mx-auto mt-4 max-w-2xl text-jufaja-muted">
            Every home begins with different questions. Use these topics to shape a conversation about your plans.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <article key={topic.number} className="rounded-sm border-t-2 border-jufaja-gold-500 bg-white p-6 shadow-jufaja-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-jufaja-card sm:p-7">
              <span className="font-serif text-2xl text-jufaja-gold-600">{topic.number}</span>
              <h3 className="mt-6 font-serif text-2xl text-jufaja-forest">{topic.title}</h3>
              <p className="mt-3 text-sm leading-6 text-jufaja-muted">{topic.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" variant="outline">Talk through your plans</ButtonLink>
        </div>
      </div>
    </section>
  );
}
