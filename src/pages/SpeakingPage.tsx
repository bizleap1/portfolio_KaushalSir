import { PageShell, SectionHeading, linkClass } from './PageShell';
import { events, speakingPhoto } from '../data/events.ts';
import { email, facts, paths, person } from '../data/site.ts';
import { findRoute } from '../seo/routes.ts';

const route = findRoute(paths.speaking);

export const SpeakingPage = () => (
  <PageShell breadcrumbs={route.breadcrumbs}>
    <header className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-7">
        <span className="block font-sans text-xs uppercase tracking-[0.3em] text-grey-muted mb-6">Events</span>
        <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] tracking-wide text-white-primary">
          {person.name}{' '}
          <span className="block text-gold-primary">Public speaker</span>
        </h1>
        <p className="mt-10 max-w-2xl font-sans text-lg font-light leading-relaxed text-grey-secondary">
          {person.name}, {person.jobTitleInline} of {person.company}, has spoken at {facts.institutionsSpoken}+ institutions
          on digital marketing, entrepreneurship, AI in marketing and youth leadership. His mission is to democratize access to
          high-level marketing strategies and help the next generation of entrepreneurs build brands that thrive.
        </p>
      </div>
      <div className="lg:col-span-5 overflow-hidden rounded-xl border border-white-primary/10">
        <img
          src={speakingPhoto.src}
          alt={speakingPhoto.alt}
          width={speakingPhoto.width}
          height={speakingPhoto.height}
          decoding="async"
          className="w-full h-auto aspect-[4/5] object-cover"
        />
      </div>
    </header>

    <section aria-labelledby="engagements" className="mb-24">
      <SectionHeading eyebrow="Selected engagements" id="engagements">Talks &amp; panels</SectionHeading>
      <div className="space-y-12">
        {events.map((event) => (
          <article key={event.id} className="border-t border-white-primary/10 pt-8">
            <span className="inline-block font-sans text-[10px] text-gold-primary uppercase tracking-widest mb-3 border border-gold-primary/30 px-3 py-1 rounded-full">
              {event.role}
            </span>
            <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white-primary mb-3 leading-none">{event.title}</h3>
            <p className="font-sans text-lg text-white-primary mb-3 font-medium">{event.topic}</p>
            <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl">{event.desc}</p>
          </article>
        ))}
      </div>
    </section>

    <section aria-labelledby="invite">
      <SectionHeading eyebrow="Invite" id="invite">Book a talk</SectionHeading>
      <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl">
        Organising a seminar, college event or panel? Write to{' '}
        <a className={linkClass} href={`mailto:${email}?subject=${encodeURIComponent('Speaking invitation')}`}>{email}</a>.
      </p>
    </section>
  </PageShell>
);
