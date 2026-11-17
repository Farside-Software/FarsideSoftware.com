import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, FORMER_LEGAL_NAME, LEGAL_NAME, SITE_NAME } from '../config/site';
import { apps } from '../data/apps';
import Wordmark from '../assets/farside/wordmark-one-line-on-dark.svg';

const columns = [
  {
    title: 'Apps',
    links: apps.map((app) => ({ label: app.name, to: app.path })),
  },
  {
    title: 'Help',
    links: [
      { label: 'Support', to: '/support' },
      { label: 'Guides', to: '/guides' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Press', to: '/press' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const linkClass = 'text-muted underline-offset-4 transition-colors hover:text-ink hover:underline';

export default function Footer() {
  return (
    <footer className="border-t border-line/10 bg-deep px-6 pb-10 pt-16 text-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={Wordmark} alt={SITE_NAME} width={283} height={64} className="-ml-4 h-16 w-auto" />
            <p className="mt-3 max-w-sm text-base text-muted">Independent apps for every Apple device. Private by design.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`mt-4 inline-block ${linkClass}`}>
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map(({ title, links }) => (
              <div key={title} className={title === 'Apps' ? 'col-span-2 sm:col-span-1' : ''}>
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted/70">{title}</h2>
                <ul
                  className={`mt-4 list-none p-0 ${
                    title === 'Apps' ? 'grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1' : 'space-y-3'
                  }`}
                >
                  {links.map(({ label, to }) => (
                    <li key={to}>
                      <Link to={to} className={linkClass}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-14 border-t border-line/10 pt-6 text-muted/70" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {LEGAL_NAME}
          {FORMER_LEGAL_NAME && <>, formerly {FORMER_LEGAL_NAME}</>}
        </p>
      </div>
    </footer>
  );
}
