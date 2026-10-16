import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { pageNav } from '../data/nav.ts';
import type { Crumb } from '../seo/routes.ts';

/** Shared layout for the inner pages: header, visible breadcrumb, content column, footer. */
export const PageShell = ({ children, breadcrumbs = [] }: { children: ReactNode; breadcrumbs?: Crumb[] }) => (
  <div className="relative min-h-screen bg-black-deep text-white-primary">
    <Navbar items={pageNav} introDelay={0} />
    <main id="main" className="pt-36 md:pt-44 pb-28 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {breadcrumbs.length > 1 && (
          <nav aria-label="Breadcrumb" className="mb-12 font-sans text-[11px] uppercase tracking-[0.25em] text-grey-muted">
            <ol className="flex flex-wrap items-center gap-3">
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-3">
                    {last ? (
                      <span aria-current="page" className="text-grey-secondary">{crumb.name}</span>
                    ) : (
                      <a href={crumb.path} className="hover:text-gold-primary transition-colors">{crumb.name}</a>
                    )}
                    {!last && <span aria-hidden="true">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        {children}
      </div>
    </main>
    <Footer homePath="/" />
  </div>
);

export const SectionHeading = ({ eyebrow, id, children }: { eyebrow: string; id: string; children: ReactNode }) => (
  <div className="mb-10">
    <span className="block font-sans text-xs uppercase tracking-[0.3em] text-grey-muted mb-4">{eyebrow}</span>
    <h2 id={id} className="font-display text-4xl md:text-5xl uppercase tracking-wide text-white-primary leading-none">
      {children}
    </h2>
  </div>
);

export const linkClass =
  'text-gold-primary underline underline-offset-4 decoration-gold-primary/40 hover:decoration-gold-primary transition-colors';
