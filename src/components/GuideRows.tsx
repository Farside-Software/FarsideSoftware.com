import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { guidePath, type Guide } from '../data/guides.mjs';

interface GuideRowsProps {
  guides: Guide[];
  /** Show each guide's one-line summary under its title. */
  summaries?: boolean;
  className?: string;
}

/** A hairline-separated list of guide links; each row is one link. */
export default function GuideRows({ guides, summaries = false, className = '' }: GuideRowsProps) {
  return (
    <ul className={`list-none p-0 ${className}`}>
      {guides.map((g) => (
        <li key={g.slug} className="group relative border-t border-line/10 transition-colors last:border-b hover:bg-line/[0.04]">
          <Link
            to={guidePath(g.slug)}
            className={`flex items-center justify-between gap-6 after:absolute after:inset-0 ${summaries ? 'py-7' : 'py-4'}`}
          >
            <span className="min-w-0">
              <span
                className={
                  summaries
                    ? 'block text-xl font-extrabold tracking-[-0.02em] text-ink'
                    : 'block text-muted transition-colors group-hover:text-ink'
                }
              >
                {g.short}
              </span>
              {summaries && <span className="mt-1 block text-muted">{g.summary}</span>}
            </span>
            <ArrowRight
              size={summaries ? 22 : 16}
              className="shrink-0 text-muted/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-ink"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
