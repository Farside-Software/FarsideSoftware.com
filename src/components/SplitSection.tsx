import type { ReactNode } from 'react';

interface SplitSectionProps {
  /** Becomes the heading's id, for `aria-labelledby` and in-page links. */
  id: string;
  eyebrow?: string;
  title: ReactNode;
  /** Short text under the heading, in the left column. */
  intro?: ReactNode;
  /** `well` is the darker band; alternate it with `page`. */
  tone?: 'page' | 'well';
  children: ReactNode;
}

/** Hairline-separated row inside a SplitSection's right column. */
export const rowClass = 'border-t border-line/10 py-7 last:border-b';

/**
 * A page section in two columns: the heading stays put on the left while
 * the content scrolls on the right. One column on phones.
 */
export default function SplitSection({ id, eyebrow, title, intro, tone = 'page', children }: SplitSectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={`scroll-mt-20 border-b border-line/10 py-16 lg:py-24 ${tone === 'well' ? 'bg-well' : 'bg-page'}`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
            <h2 id={id} className={`scroll-mt-28 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-4xl ${eyebrow ? 'mt-4' : ''}`}>
              {title}
            </h2>
            {intro && <div className="mt-4 text-lg text-muted">{intro}</div>}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
