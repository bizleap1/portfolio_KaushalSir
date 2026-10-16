import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { findRoute } from './seo/routes.ts';

/**
 * Tiny path-based page switch. Every route is pre-rendered to its own static HTML file at build time
 * (scripts/prerender.mjs), so crawlers get real content and each page has its own URL, title and meta.
 */
function App({ path = '/' }: { path?: string }) {
  switch (findRoute(path).kind) {
    case 'about':
      return <AboutPage />;
    case 'speaking':
      return <SpeakingPage />;
    case 'case-studies':
      return <CaseStudiesPage />;
    case 'not-found':
      return <NotFoundPage />;
    default:
      return <Home />;
  }
}

export default App;
