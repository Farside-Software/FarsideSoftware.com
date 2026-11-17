import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SplitSection, { rowClass } from '../components/SplitSection';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { guideGroups, guidesIn, guidePath } from '../data/guides.mjs';

export default function Guides() {
  useRouteMeta({ accentColor: '#2D7FF9' });

  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Guides"
        lead="Plain-language how-tos, written from Tesla’s published light show instructions and the W3C’s WCAG 2.2 documents. They work whether or not you ever install one of our apps."
      />

      {guideGroups.map((group, i) => (
        <SplitSection
          key={group.id}
          id={`group-${group.id}`}
          title={group.title}
          intro={group.blurb}
          tone={i % 2 === 0 ? 'well' : 'page'}
        >
          <ul className="list-none p-0">
            {guidesIn(group.id).map((g) => (
              <li key={g.slug} className={`${rowClass} group relative transition-colors hover:bg-line/[0.04]`}>
                <Link to={guidePath(g.slug)} className="flex items-center justify-between gap-6 after:absolute after:inset-0">
                  <span className="min-w-0">
                    <span className="block text-xl font-extrabold tracking-[-0.02em] text-ink">{g.short}</span>
                    <span className="mt-1 block text-muted">{g.summary}</span>
                  </span>
                  <ArrowRight size={22} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </SplitSection>
      ))}

      <p className="mx-auto max-w-7xl px-6 py-12 text-sm italic text-muted">
        Maestro and Opalite are independent apps. Maestro is not affiliated with or endorsed by Tesla, Inc.; Opalite is
        not affiliated with or endorsed by the W3C.
      </p>
      <ScrollToTop />
    </>
  );
}
