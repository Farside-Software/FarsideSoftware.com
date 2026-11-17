import { Fragment, useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassButton from '../components/GlassButton';
import ScrollToTop from '../components/ScrollToTop';
import NotFound from './NotFound';
import { usePageMeta } from '../hooks';
import { findRoute } from '../seo/routes.mjs';
import {
  findGuide,
  guidePath,
  guideChannel,
  guideJsonLd,
  guideApps,
  guideGroups,
  GUIDES_CHECKED,
  type GuideBlock,
} from '../data/guides.mjs';


/** Renders [label](/internal/path) markup from the guide data as router links. */
function Inline({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return (
      <Link key={i} to={m[2]} className="text-link underline underline-offset-4">
        {m[1]}
      </Link>
    );
  });
}

function BlockView({ block }: { block: GuideBlock }) {
  if (typeof block === 'string') {
    return (
      <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted">
        <Inline text={block} />
      </p>
    );
  }
  if ('code' in block) {
    return (
      <pre className="mt-4 overflow-x-auto rounded-2xl bg-well border border-line/10 p-4 text-sm leading-relaxed text-ink">
        <code>{block.code}</code>
      </pre>
    );
  }
  if ('ul' in block) {
    return (
      <ul className="mt-3 list-disc space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-muted marker:text-muted/70">
        {block.ul.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="mt-3 list-decimal space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-muted marker:font-semibold marker:text-muted">
      {block.ol.map((item) => (
        <li key={item}>
          <Inline text={item} />
        </li>
      ))}
    </ol>
  );
}

/** Keeps the guide's JSON-LD in <head> (the build bakes the same objects into each route's HTML). */
function useJsonLd(objects: Record<string, unknown>[]) {
  const serialized = JSON.stringify(objects);
  useEffect(() => {
    document.head.querySelectorAll('script[data-route-jsonld]').forEach((el) => el.remove());
    const added = (JSON.parse(serialized) as Record<string, unknown>[]).map((obj) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-route-jsonld', '');
      el.textContent = JSON.stringify(obj);
      document.head.appendChild(el);
      return el;
    });
    return () => added.forEach((el) => el.remove());
  }, [serialized]);
}

export default function Guide() {
  const { slug = '' } = useParams();
  const guide = findGuide(slug);
  const route = findRoute(guidePath(slug));

  usePageMeta({
    title: route?.title ?? guide?.title ?? 'Guide',
    description: route?.description ?? guide?.description ?? '',
    image: route?.ogImage ?? '/og/default.png',
    path: guidePath(slug),
    accentColor: guide?.app === 'opalite' ? '#9F95AF' : '#2D7FF9',
    noindex: !guide,
  });
  useJsonLd(guide ? guideJsonLd(guide) : []);

  if (!guide) return <NotFound />;

  const ACCENT = guide.app === 'opalite' ? '#9F95AF' : '#2D7FF9';
  const cta = guideApps[guide.app];
  const group = guideGroups.find((g) => g.id === guide.group);
  const related = guide.related.map((s) => findGuide(s)).filter((g) => g !== undefined);

  return (
    <>
      <PageHeader
        eyebrow="Guide"
        title={guide.h1}
        lead={guide.intro.map((p, i) => (
          <span key={p} className={`block ${i === 0 ? '' : 'mt-4'}`}>
            <Inline text={p} />
          </span>
        ))}
      >
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted">
          <Link to="/guides" className="underline-offset-4 hover:text-ink hover:underline">
            Guides
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="text-muted/70">{group?.title}</span>
        </nav>
        <p className="mt-4 text-sm tabular-nums text-muted/70">
          Checked against {cta.checked} on {GUIDES_CHECKED}.
        </p>
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8">
          <div className="max-w-3xl">
            {guide.sections.map((section, i) => (
              <section key={section.h2} className={i === 0 ? '' : 'mt-10 border-t border-line/10 pt-10'}>
                <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{section.h2}</h2>
                {section.body.map((block, j) => (
                  <BlockView key={j} block={block} />
                ))}
              </section>
            ))}

            {guide.steps && (
              <section className="mt-10 border-t border-line/10 pt-10">
                <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">The short version</h2>
                <ol className="mt-3 list-decimal space-y-2 pl-6 text-base sm:text-lg leading-relaxed text-muted marker:font-semibold marker:text-muted">
                  {guide.steps.map((s) => (
                    <li key={s.name}>
                      <span className="font-semibold text-ink">{s.name}.</span> {s.text}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <section className="mt-10 border-t border-line/10 pt-10" aria-label="Frequently asked questions">
              <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">Quick answers</h2>
              <dl className="mt-4">
                {guide.faq.map((f) => (
                  <div key={f.q} className="border-t border-line/10 py-5 last:border-b">
                    <dt className="text-lg font-extrabold text-ink">{f.q}</dt>
                    <dd className="mt-2 leading-relaxed text-muted">
                      <Inline text={f.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </article>

        <aside className="lg:col-span-4" aria-label={`Try ${cta.slug === 'opalite' ? 'Opalite' : 'Maestro'}`}>
          <div className="rounded-3xl border border-line/10 bg-panel p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{cta.heading}</h2>
            <p className="mt-3 text-muted">{cta.blurb}</p>
            <div className="mt-6">
              <GlassButton to={`/go/${cta.slug}?ct=${guideChannel(guide.slug)}`} accentColor={ACCENT} size="md">
                {cta.button}
              </GlassButton>
            </div>
            <p className="mt-6 text-sm italic text-muted">{cta.notice}</p>
          </div>
        </aside>
      </div>

      <aside className="border-t border-line/10 bg-well" aria-label="More guides">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-ink">More guides</h2>
          <ul className="mt-6 max-w-3xl list-none p-0">
            {related.map((r) => (
              <li key={r.slug} className="group relative border-t border-line/10 py-5 transition-colors hover:bg-line/[0.04]">
                <Link to={guidePath(r.slug)} className="flex items-center justify-between gap-4 text-lg font-extrabold text-ink after:absolute after:inset-0">
                  {r.short}
                  <ArrowRight size={20} className="shrink-0 text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li className="group relative border-y border-line/10 py-5 transition-colors hover:bg-line/[0.04]">
              <Link to="/guides" className="flex items-center justify-between gap-4 text-lg font-extrabold text-muted after:absolute after:inset-0">
                All guides
                <ArrowRight size={20} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <ScrollToTop />
    </>
  );
}
