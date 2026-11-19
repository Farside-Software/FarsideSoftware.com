import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { apps } from '../../data/apps';
import { accentText } from '../../theme/contrast';
import AppIcon from '../AppIcon';

const columns = [
  { key: 'iPhone', label: 'iPhone' },
  { key: 'iPad', label: 'iPad' },
  { key: 'Mac', label: 'Mac' },
  { key: 'Apple Watch', label: 'Watch' },
  { key: 'Apple TV', label: 'TV' },
  { key: 'Vision Pro', label: 'Vision' },
];

/**
 * Every app in one table: what it does, which devices it runs on (a dot in
 * the app's own colour) and what it costs. Each row is one link to the app's
 * page. Below `lg` the platform columns fold into a line of text.
 */
export default function CatalogTable() {
  return (
    <div className="reveal">
      <table className="w-full border-collapse text-left">
        <thead className="hidden lg:table-header-group">
          <tr className="text-xs font-bold uppercase tracking-[0.16em] text-muted/70">
            <th scope="col" className="pb-4 font-bold">
              App
            </th>
            {columns.map((c) => (
              <th key={c.key} scope="col" className="w-[4.75rem] pb-4 text-center font-bold">
                {c.label}
              </th>
            ))}
            <th scope="col" className="w-[15rem] pb-4 pl-6 font-bold">
              Price
            </th>
            <th scope="col" className="w-10 pb-4">
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr
              key={app.slug}
              className="group group/app relative block border-t border-line/10 transition-colors last:border-b hover:bg-line/[0.04] lg:table-row"
            >
              <th scope="row" className="block py-5 pr-4 font-medium lg:table-cell lg:py-6">
                <span className="flex items-center gap-4">
                  <AppIcon src={app.icon} darkSrc={app.iconDark} size={52} loading="lazy" className="h-[52px] w-[52px] rounded-[14px]" />
                  <span className="min-w-0">
                    {/* The link's ::after stretches over the whole row. */}
                    <Link to={app.path} className="text-xl font-extrabold tracking-[-0.02em] text-ink after:absolute after:inset-0">
                      {app.name}
                    </Link>
                    <span className="mt-0.5 block text-[0.95rem] leading-snug text-muted">{app.job}</span>
                    <span className="mt-2 block text-sm text-muted/70 lg:hidden">
                      {app.platforms.join(' · ')}
                      <span className="mx-2" aria-hidden="true">
                        /
                      </span>
                      {app.price}
                    </span>
                  </span>
                </span>
              </th>
              {columns.map((c) => {
                const has = app.platforms.includes(c.key);
                return (
                  <td key={c.key} className="hidden text-center align-middle lg:table-cell">
                    <span
                      aria-hidden="true"
                      className={`inline-block rounded-full ${has ? 'h-3 w-3' : 'h-1.5 w-1.5 bg-line/15'}`}
                      style={has ? { background: accentText(app.accent) } : undefined}
                    />
                    <span className="sr-only">{has ? 'Yes' : 'No'}</span>
                  </td>
                );
              })}
              <td className="hidden pl-6 align-middle text-sm text-muted lg:table-cell">{app.price}</td>
              <td className="hidden align-middle lg:table-cell">
                <ArrowRight
                  className="h-5 w-5 text-muted/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  aria-hidden="true"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
