import { PageShell, SectionHeading, linkClass } from './PageShell';
import { caseStudies } from '../data/caseStudies.ts';
import { email, paths, person } from '../data/site.ts';
import { findRoute } from '../seo/routes.ts';

const route = findRoute(paths.caseStudies);

export const CaseStudiesPage = () => (
  <PageShell breadcrumbs={route.breadcrumbs}>
    <header className="mb-20">
      <span className="block font-sans text-xs uppercase tracking-[0.3em] text-grey-muted mb-6">Work</span>
      <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] tracking-wide text-white-primary">
        Digital marketing{' '}
        <span className="block text-gold-primary">Case studies</span>
      </h1>
      <p className="mt-10 max-w-3xl font-sans text-lg font-light leading-relaxed text-grey-secondary">
        Selected work by {person.name} and the {person.company} team across B2B, healthcare, hospitality and automotive brands:
        LinkedIn thought leadership, video storytelling, SEO-led content and social media lead generation.
      </p>
    </header>

    <div className="space-y-24">
      {caseStudies.map((study) => (
        <article key={study.id} id={study.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-32">
          <div className="lg:col-span-5 overflow-hidden border border-white-primary/10 bg-black-secondary">
            <img
              src={study.image}
              alt={`${study.title} – ${study.category} case study by ${person.company}`}
              width={study.imageWidth}
              height={study.imageHeight}
              loading="lazy"
              decoding="async"
              className="w-full h-auto aspect-square object-cover opacity-80"
            />
          </div>
          <div className="lg:col-span-7">
            <span className="block font-sans text-xs uppercase tracking-widest text-gold-primary mb-4">{study.category}</span>
            <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wide text-white-primary mb-6 leading-tight">{study.title}</h2>
            <p className="font-sans text-base md:text-lg font-light leading-relaxed text-grey-secondary mb-8">{study.desc}</p>

            {study.results && study.results.length > 0 && (
              <div className="mb-8">
                <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-grey-muted mb-4">Results</h3>
                <ul className="list-disc pl-5 space-y-2 font-sans text-base text-white-primary">
                  {study.results.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}

            {study.quote && (
              <blockquote className="mb-8 border-l-2 border-gold-primary pl-6 font-sans text-lg font-light italic text-white-primary">
                “{study.quote.text}”
                <footer className="mt-2 text-sm not-italic text-grey-secondary">— {study.quote.author}</footer>
              </blockquote>
            )}

            <ul className="flex flex-wrap gap-3">
              {study.tags.map((tag) => (
                <li key={tag} className="font-sans text-[10px] uppercase tracking-wider px-4 py-2 border border-white-primary/20 bg-black-deep/50 text-white-primary rounded-full">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>

    <section aria-labelledby="work-with-us" className="mt-28">
      <SectionHeading eyebrow="Next" id="work-with-us">Work together</SectionHeading>
      <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl">
        Want similar results for your brand? Email{' '}
        <a className={linkClass} href={`mailto:${email}`}>{email}</a> or see the{' '}
        <a className={linkClass} href={paths.about}>full profile of {person.name}</a>.
      </p>
    </section>
  </PageShell>
);
