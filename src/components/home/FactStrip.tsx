import { apps } from '../../data/apps';
import { useExportCount } from '../../hooks';

const platformCount = new Set(apps.flatMap((app) => app.platforms)).size;
/** "French (Canada)" and "French" are one language for this count. */
const languageCount = new Set(apps.flatMap((app) => app.languages.map((l) => l.replace(/\s*\(.*\)$/, '')))).size;

/**
 * Four plain facts under the hero, counted from the catalog; the last one is
 * the live number of light shows exported from Maestro.
 */
export default function FactStrip() {
  const exports = useExportCount();
  const facts = [
    { value: String(apps.length), label: 'apps on the App Store' },
    { value: String(platformCount), label: 'Apple platforms' },
    { value: String(languageCount), label: 'languages' },
    { value: exports === null ? '—' : exports.toLocaleString('en-US'), label: 'light shows exported with Maestro', live: true },
  ];
  return (
    <dl className="mx-auto grid max-w-7xl grid-cols-2 border-line/10 px-6 lg:grid-cols-4">
      {facts.map(({ value, label, live }, i) => (
        <div
          key={label}
          className={`flex flex-col-reverse justify-end gap-1 border-line/10 py-7 ${i % 2 === 1 ? 'border-l pl-6' : ''} ${
            i >= 2 ? 'border-t lg:border-t-0' : ''
          } ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
        >
          <dt className="text-sm text-muted">
            {label}
            {live && <span className="sr-only"> (live count)</span>}
          </dt>
          <dd className="text-4xl font-extrabold tracking-[-0.03em] text-ink tabular-nums sm:text-5xl" aria-live={live ? 'polite' : undefined}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
