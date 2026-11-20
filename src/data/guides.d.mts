export type GuideBlock = string | { ul: string[] } | { ol: string[] } | { code: string };

export type GuideAppSlug = 'maestro' | 'opalite' | 'setdeck' | 'mygra' | 'stork' | 'waffle' | 'backstamp';

export interface Guide {
  slug: string;
  /** The slug of the app the guide belongs to (also its group on the hub). */
  app: GuideAppSlug;
  og: string;
  short: string;
  title: string;
  h1: string;
  description: string;
  summary: string;
  intro: string[];
  sections: { h2: string; body: GuideBlock[] }[];
  steps?: { name: string; text: string }[];
  howTo?: { name: string };
  faq: { q: string; a: string }[];
  related: string[];
}

export const SITE_URL: string;
export const GUIDES_CHECKED: string;
export const GUIDES_CHECKED_ISO: string;
export const guideNotice: string;
export const guides: Guide[];
export function findGuide(slug: string): Guide | undefined;
export function guidePath(slug: string): string;
export function guideChannel(slug: string): string;
export function guideJsonLd(guide: Guide): Record<string, unknown>[];
export interface GuideApp {
  slug: string;
  heading: string;
  blurb: string;
  button: string;
  notice: string;
  /** What the guides were checked against, e.g. "SetDeck 2.1 source". */
  checked: string;
  /** When they were checked; falls back to GUIDES_CHECKED. */
  checkedOn?: string;
  checkedIso?: string;
}
export const guideApps: Partial<Record<GuideAppSlug, GuideApp>>;
export const guideGroups: { id: GuideAppSlug; title: string; blurb: string }[];
export function guidesIn(app: string): Guide[];
