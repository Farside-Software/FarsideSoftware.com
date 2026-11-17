/**
 * Contrast helpers for placing the apps' own accent colours on the dark
 * Farside surfaces.
 */

const NIGHT = '#050608';
const REGOLITH = '#E8EAF1';
/** The lightest dark surface text sits on (Slate high), as the worst case. */
const SURFACE = '#2F323E';

function parse(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const full = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as [number, number, number];
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a: [number, number, number], b: [number, number, number]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const toHex = (rgb: number[]) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;

/** Night or Regolith, whichever reads better on a fill of this colour. */
export function readableOn(fill: string): string {
  const rgb = parse(fill);
  if (!rgb) return REGOLITH;
  return ratio(rgb, parse(NIGHT)!) >= ratio(rgb, parse(REGOLITH)!) ? NIGHT : REGOLITH;
}

/**
 * The accent, lightened toward Regolith only as far as needed to reach
 * 4.5 : 1 on a dark surface. Use for accent-coloured text and small icons;
 * fills and borders can keep the original accent.
 */
export function accentText(accent: string): string {
  const rgb = parse(accent);
  if (!rgb) return REGOLITH;
  const surface = parse(SURFACE)!;
  const light = parse(REGOLITH)!;
  for (let t = 0; t <= 1; t += 0.05) {
    const mixed = rgb.map((v, i) => v + (light[i] - v) * t) as [number, number, number];
    if (ratio(mixed, surface) >= 4.5) return toHex(mixed);
  }
  return REGOLITH;
}
