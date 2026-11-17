import PageHeader from '../components/PageHeader';
import SplitSection from '../components/SplitSection';
import GuideRows from '../components/GuideRows';
import ScrollToTop from '../components/ScrollToTop';
import { useRouteMeta } from '../hooks';
import { findApp } from '../data/apps';
import { guideGroups, guidesIn } from '../data/guides.mjs';

export default function Guides() {
  useRouteMeta();

  return (
    <>
      <PageHeader
        eyebrow="Guides"
        title="Guides"
        lead="Plain-language how-tos for each of our apps. Some of them work whether or not you ever install one."
      >
        <ul className="flex list-none flex-wrap gap-2 p-0" aria-label="Jump to an app">
          {guideGroups.map((group) => {
            const app = findApp(group.id);
            return (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line/15 py-1 pl-1.5 pr-3 text-sm font-semibold text-muted transition-colors hover:border-line/40 hover:text-ink"
                >
                  {app && <img src={app.icon} alt="" width={24} height={24} className="h-6 w-6 rounded-md" />}
                  {group.title}
                </a>
              </li>
            );
          })}
        </ul>
      </PageHeader>

      {guideGroups.map((group, i) => {
        const app = findApp(group.id);
        return (
          <SplitSection
            key={group.id}
            id={group.id}
            title={
              <span className="flex items-center gap-3">
                {app && <img src={app.icon} alt="" width={44} height={44} loading="lazy" decoding="async" className="h-11 w-11 rounded-xl" />}
                {group.title}
              </span>
            }
            intro={group.blurb}
            tone={i % 2 === 0 ? 'well' : 'page'}
          >
            <GuideRows guides={guidesIn(group.id)} summaries />
          </SplitSection>
        );
      })}

      <p className="mx-auto max-w-7xl px-6 py-12 text-sm italic text-muted">
        Maestro and Opalite are independent apps. Maestro is not affiliated with or endorsed by Tesla, Inc.; Opalite is
        not affiliated with or endorsed by the W3C.
      </p>
      <ScrollToTop />
    </>
  );
}
