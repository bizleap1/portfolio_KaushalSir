import { PageShell } from './PageShell';
import { paths, person } from '../data/site.ts';

export const NotFoundPage = () => (
  <PageShell>
    <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.95] tracking-wide text-white-primary">
      Page not found
    </h1>
    <p className="mt-8 max-w-xl font-sans text-lg font-light leading-relaxed text-grey-secondary">
      That page doesn't exist. Head back to the{' '}
      <a className="text-gold-primary underline underline-offset-4" href={paths.home}>{person.name} homepage</a>.
    </p>
  </PageShell>
);
