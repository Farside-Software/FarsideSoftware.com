import type { ReactNode } from 'react';

interface PageHeaderProps {
  /** Short label above the title, set in tracked capitals. */
  eyebrow: string;
  title: ReactNode;
  /** One or two sentences under the title. */
  lead?: ReactNode;
  /** Buttons or links under the lead. */
  children?: ReactNode;
  /** Optional right-hand column at desktop widths (a photo, a fact list). */
  aside?: ReactNode;
}

/**
 * The top of every page that is not the home page or an app page:
 * left-aligned eyebrow, large title and lead. Nothing here animates in, so
 * the prerendered page paints complete.
 */
export default function PageHeader({ eyebrow, title, lead, children, aside }: PageHeaderProps) {
  return (
    <section className="border-b border-line/10 bg-page pt-28 pb-14 lg:pt-36 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:items-end">
        <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
          <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lead && <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
