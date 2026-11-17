import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassButton from './GlassButton';
import Logo from '../assets/farside/lockup-on-slate.svg';
import { SITE_NAME } from '../config/site';
import { apps } from '../data/apps';

const links = [
  { label: 'Guides', path: '/guides' },
  { label: 'Support', path: '/support' },
  { label: 'About', path: '/about' },
];

const linkBase = 'px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors duration-150';
const linkClass = `${linkBase} font-semibold text-muted hover:text-ink`;
const activeLinkClass = `${linkBase} font-bold text-ink bg-line/[0.08]`;

/**
 * Site header. The six apps live behind one "Apps" disclosure (a full-width
 * panel on desktop, the top of the sheet on mobile) so the bar itself stays
 * at four destinations.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const onAppPage = apps.some((app) => pathname === app.path);

  // Any navigation closes both menus.
  useEffect(() => {
    setMenuOpen(false);
    setAppsOpen(false);
  }, [pathname]);

  // Escape, or a click outside the header, closes the Apps panel.
  useEffect(() => {
    if (!appsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAppsOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setAppsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [appsOpen]);

  return (
    <header ref={headerRef} className="fixed top-0 z-50 w-full border-b border-line/10 bg-well">
      <nav className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2" aria-label="Main">
        {/* The lockup file carries its own clear space, so it is drawn taller
            than it looks and pulled left to line up with the page gutter. */}
        <Link to="/" className="-ml-2 flex shrink-0 items-center" aria-label={`${SITE_NAME} home`}>
          <img src={Logo} alt={SITE_NAME} width={142} height={52} className="h-[52px] w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={() => setAppsOpen((v) => !v)}
            aria-expanded={appsOpen}
            aria-controls="apps-panel"
            className={`${appsOpen || onAppPage ? activeLinkClass : linkClass} inline-flex items-center gap-1`}
          >
            Apps
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={`transition-transform duration-150 ${appsOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {links.map(({ label, path }) => (
            <NavLink key={path} to={path} className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}>
              {label}
            </NavLink>
          ))}
          <div className="ml-3">
            <GlassButton to="/contact" tone="ghost" size="sm">
              Contact
            </GlassButton>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 text-ink md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Desktop: the Apps panel */}
      <AnimatePresence>
        {appsOpen && (
          <motion.div
            id="apps-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14 }}
            className="absolute inset-x-0 top-full hidden border-b border-line/10 bg-well md:block"
          >
            <ul className="mx-auto grid max-w-7xl list-none grid-cols-2 gap-1 px-4 py-4 lg:grid-cols-3">
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link
                    to={app.path}
                    className="flex h-full items-start gap-4 rounded-2xl px-3 py-3 transition-colors hover:bg-line/[0.06]"
                  >
                    <img src={app.icon} alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl" />
                    <span className="min-w-0">
                      <span className="block font-bold text-ink">{app.name}</span>
                      <span className="block text-sm leading-snug text-muted">{app.job}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: one sheet, apps first */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-line/10 bg-well md:hidden"
          >
            <div className="px-6 pb-6 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70">Apps</p>
              <ul className="mt-2 grid list-none grid-cols-2 gap-1">
                {apps.map((app) => (
                  <li key={app.slug}>
                    <Link
                      to={app.path}
                      className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 font-bold text-ink hover:bg-line/[0.06]"
                    >
                      <img src={app.icon} alt="" width={36} height={36} className="h-9 w-9 rounded-[10px]" />
                      {app.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 list-none space-y-1 border-t border-line/10 pt-4">
                {links.map(({ label, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) => `-mx-3 block ${isActive ? activeLinkClass : linkClass}`}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <GlassButton to="/contact" tone="ghost" size="sm" className="mt-4 w-full">
                Contact
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
