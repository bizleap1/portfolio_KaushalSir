import type { ReactNode } from 'react';
import { PageShell, SectionHeading, linkClass } from './PageShell';
import { faq } from '../data/faq.ts';
import { timeline } from '../data/timeline.ts';
import { ventures } from '../data/ventures.ts';
import { events } from '../data/events.ts';
import { email, facts, paths, person, services, social, summary } from '../data/site.ts';
import { findRoute } from '../seo/routes.ts';

const route = findRoute(paths.about);

export const AboutPage = () => {
  const quickFacts: { label: string; value: ReactNode }[] = [
    { label: 'Full name', value: person.name },
    { label: 'Role', value: `${person.jobTitle}, ${person.company}` },
    { label: 'Based in', value: `${person.city}, ${person.region}, ${person.country}` },
    { label: 'Education', value: `${person.education.degree}, ${person.education.school} (${person.education.batch})` },
    { label: 'Founded', value: `${person.company} in ${facts.foundedYear}` },
    { label: 'Team', value: `${facts.teamSize}+ members` },
    { label: 'Brands served', value: `${facts.brands}+ across ${facts.states.join(', ')}` },
    { label: 'Speaking', value: `${facts.institutionsSpoken}+ institutions` },
    {
      label: 'Online',
      value: (
        <>
          <a className={linkClass} href={social.linkedin} rel="me noopener">LinkedIn</a>
          {' · '}
          <a className={linkClass} href={social.instagram} rel="me noopener">Instagram</a>
          {' · '}
          <a className={linkClass} href={social.bizleap} rel="me noopener">bizleap.in</a>
        </>
      ),
    },
  ];

  return (
    <PageShell breadcrumbs={route.breadcrumbs}>
      <header className="mb-20">
        <span className="block font-sans text-xs uppercase tracking-[0.3em] text-grey-muted mb-6">About</span>
        <h1 className="font-display text-5xl md:text-7xl xl:text-[84px] uppercase leading-[0.95] tracking-wide text-white-primary">
          {person.name}{' '}
          <span className="block text-gold-primary">{person.jobTitle} of {person.company}</span>
        </h1>
        <p className="mt-10 max-w-3xl font-sans text-lg md:text-xl font-light leading-relaxed text-grey-secondary">
          {summary.long}
        </p>
      </header>

      <section aria-labelledby="facts" className="mb-24">
        <SectionHeading eyebrow="At a glance" id="facts">Quick facts</SectionHeading>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-white-primary/10">
          {quickFacts.map((f) => (
            <div key={f.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 border-b border-white-primary/10">
              <dt className="sm:w-40 shrink-0 font-sans text-[11px] uppercase tracking-[0.25em] text-grey-muted">{f.label}</dt>
              <dd className="font-sans text-base text-white-primary">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="journey" className="mb-24">
        <SectionHeading eyebrow="The story so far" id="journey">The journey</SectionHeading>
        <ol className="relative border-l border-white-primary/10 ml-2 space-y-12">
          {timeline.map((item, i) => (
            <li key={`${item.year}-${i}`} className="pl-8 relative">
              <span aria-hidden="true" className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-gold-primary shadow-[0_0_12px_rgba(196,145,0,0.5)]" />
              <span className="inline-block py-1 px-3 mb-3 bg-gold-primary/10 text-gold-primary font-sans text-xs tracking-widest rounded-sm">{item.year}</span>
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-white-primary mb-3 leading-none">{item.title}</h3>
              <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-2xl">{item.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="services" className="mb-24">
        <SectionHeading eyebrow={person.company} id="services">What {person.company} does</SectionHeading>
        <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl mb-8">
          {person.company} is a full-service digital marketing and technology agency in {person.city}, {person.region}, working with
          brands across {facts.states.join(', ')}.
        </p>
        <ul className="flex flex-wrap gap-3">
          {services.map((service) => (
            <li key={service} className="font-sans text-xs uppercase tracking-wider px-4 py-2 border border-white-primary/20 bg-black-secondary text-white-primary rounded-full">
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ventures" className="mb-24">
        <SectionHeading eyebrow="Businesses" id="ventures">Ventures &amp; businesses</SectionHeading>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((v) => (
            <li key={v.id} className="border border-white-primary/10 p-8 bg-black-secondary">
              <span className="block font-sans text-[10px] uppercase tracking-widest text-gold-primary mb-3">{v.type}</span>
              <h3 className="font-display text-3xl uppercase tracking-wide text-white-primary mb-3 leading-none">{v.title}</h3>
              <p className="font-sans text-sm font-light leading-relaxed text-grey-secondary">{v.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="speaking" className="mb-24">
        <SectionHeading eyebrow="Stage" id="speaking">Public speaking</SectionHeading>
        <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl mb-6">
          {person.name} has delivered {facts.institutionsSpoken}+ talks, including at{' '}
          {events.map((e) => e.title).join(', ')}.{' '}
          <a className={linkClass} href={paths.speaking}>See all speaking engagements</a>.
        </p>
      </section>

      <section aria-labelledby="faq" className="mb-24">
        <SectionHeading eyebrow="Quick answers" id="faq">Frequently asked questions</SectionHeading>
        <div className="space-y-10">
          {faq.map((item) => (
            <div key={item.q}>
              <h3 className="font-display text-2xl uppercase tracking-wide text-white-primary mb-3 leading-tight">{item.q}</h3>
              <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="contact">
        <SectionHeading eyebrow="Get in touch" id="contact">Contact</SectionHeading>
        <p className="font-sans text-base font-light leading-relaxed text-grey-secondary max-w-3xl">
          Email <a className={linkClass} href={`mailto:${email}`}>{email}</a>, connect on{' '}
          <a className={linkClass} href={social.linkedin} rel="me noopener">LinkedIn</a> or{' '}
          <a className={linkClass} href={social.instagram} rel="me noopener">Instagram</a>, or visit{' '}
          <a className={linkClass} href={social.bizleap} rel="me noopener">{person.company}</a>.
        </p>
      </section>
    </PageShell>
  );
};
