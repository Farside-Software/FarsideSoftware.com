import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Support = lazy(() => import('./pages/Support'));
const Press = lazy(() => import('./pages/Press'));
const Stork = lazy(() => import('./pages/Stork'));
const Mygra = lazy(() => import('./pages/Mygra'));
const SetDeck = lazy(() => import('./pages/SetDeck'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Waffle = lazy(() => import('./pages/Waffle'));
const Backstamp = lazy(() => import('./pages/Backstamp'));
const Inktape = lazy(() => import('./pages/Inktape'));
const Opalite = lazy(() => import('./pages/Opalite'));
const V1Sports = lazy(() => import('./pages/V1Sports'));
const StreetIQ = lazy(() => import('./pages/StreetIQ'));
const Maestro = lazy(() => import('./pages/Maestro'));
const OpaliteWeb = lazy(() => import('./pages/OpaliteWeb'));
const Guides = lazy(() => import('./pages/Guides'));
const Guide = lazy(() => import('./pages/Guide'));
const Go = lazy(() => import('./pages/Go'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

/**
 * BrowserRouter everywhere. GitHub Pages serves a prerendered HTML file for
 * each known route (scripts/postbuild-seo.mjs) and falls back to 404.html,
 * a copy of index.html, for everything else, so deep links always load.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

function ScrollToTopOnNav() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * The two employment pages keep their own light design. This scope switches
 * the theme's colour roles to their light values, so the shared components
 * those pages use render light as well.
 */
function LightScope({ children }: { children: ReactNode }) {
  return <div className="theme-light">{children}</div>;
}

/** Returns true when the page is served from opalite.molargiksoftware.com */
function isOpaliteSubdomain() {
  return typeof window !== 'undefined' && window.location.hostname.startsWith('opalite.');
}

export function AppShell() {
  const opaliteSub = isOpaliteSubdomain();

  return (
    <div className="flex flex-col min-h-screen bg-page text-ink">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-signal focus:text-night focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <ScrollToTopOnNav />
      {!opaliteSub && <Navbar />}
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={opaliteSub ? <OpaliteWeb /> : <Home />} />
            <Route path="/opalite" element={<Opalite />} />
            <Route path="/opalite-web" element={<OpaliteWeb />} />

            <Route path="/maestro" element={<Maestro />} />
            <Route path="/setdeck" element={<SetDeck />} />
            <Route path="/mygra" element={<Mygra />} />
            <Route path="/stork" element={<Stork />} />
            <Route path="/waffle" element={<Waffle />} />
            <Route path="/backstamp" element={<Backstamp />} />
            {/* Not linked from anywhere yet, and noindex (src/seo/routes.mjs). */}
            <Route path="/inktape" element={<Inktape />} />
            <Route path="/v1sports" element={<LightScope><V1Sports /></LightScope>} />
            <Route path="/streetiq" element={<LightScope><StreetIQ /></LightScope>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/press" element={<Press />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<Guide />} />
            <Route path="/go/:app" element={<Go />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
