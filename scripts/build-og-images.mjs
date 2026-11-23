#!/usr/bin/env node
// build-og-images.mjs
//
// Renders a 1200x630 Open Graph image for every app (and a default one for
// the company) onto the brand's flat Slate background: public/og/<slug>.png, public/og/default.png.
// Icons come from ../../Apps/<App>/Icons/AppIcon.png (override with APPS_DIR),
// falling back to the bundled src/assets/<slug>/icon.png. Outputs are committed.
//
//   npm run og                 every app and the default image
//   npm run og -- backstamp    only the named app(s)

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { apps as catalogApps } from '../src/data/catalog.mjs';

/** Apps with a page but no catalog entry yet (see the unlisted routes in src/seo/routes.mjs). */
const unlistedApps = [
  { slug: 'inktape', source: 'Inktape', name: 'Inktape', job: 'Notes you can play back.', accent: '#2B3A8C' },
];
const apps = [...catalogApps, ...unlistedApps];

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = path.resolve(ROOT, process.env.APPS_DIR ?? '../../Apps');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const W = 1200;
const H = 630;
const ICON = 340;
const ICON_X = 96;
const ICON_Y = Math.round((H - ICON) / 2);
const TEXT_X = ICON_X + ICON + 72;
const FONT = "'Manrope', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[.,;:]?$/, '…');
    return kept;
  }
  return lines;
}

// Flat Slate, with one rule in the app's accent along the bottom edge.
function background({ accent }) {
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#25272F"/>
  <rect y="${H - 10}" width="${W}" height="10" fill="${accent}"/>
</svg>`);
}

function textLayer({ title, lines, footer, titleSize, lineSize }) {
  const titleY = H / 2 - (lines.length * lineSize * 1.25) / 2 - 10;
  const body = lines
    .map(
      (l, i) =>
        `<text x="${TEXT_X}" y="${Math.round(titleY + 44 + (i + 1) * lineSize * 1.25)}" font-family="${FONT}" font-size="${lineSize}" font-weight="500" fill="#9DA2B3">${esc(l)}</text>`,
    )
    .join('\n');
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${TEXT_X}" y="${Math.round(titleY)}" font-family="${FONT}" font-size="${titleSize}" font-weight="800" fill="#E8EAF1" letter-spacing="-2">${esc(title)}</text>
  ${body}
  <text x="${TEXT_X}" y="${H - 64}" font-family="${FONT}" font-size="26" font-weight="600" fill="#9DA2B3" letter-spacing="1">${esc(footer)}</text>
</svg>`);
}

async function roundedIcon(file, size, radius) {
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
  return sharp(file)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function iconFor(app) {
  const external = path.join(APPS_DIR, app.source, 'Icons', 'AppIcon.png');
  if (await exists(external)) return external;
  return path.join(ROOT, 'src', 'assets', app.slug, 'icon.png');
}

async function write(name, layers) {
  const out = path.join(OUT_DIR, `${name}.png`);
  await sharp(layers.background)
    .composite(layers.composite)
    .png({ compressionLevel: 9, palette: true, quality: 90, dither: 0.6 })
    .toFile(out);
  const { size } = await fs.stat(out);
  console.log(`  ${path.relative(ROOT, out)}  (${Math.round(size / 1024)} KB)`);
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const only = process.argv.slice(2);
  for (const app of apps) {
    if (only.length && !only.includes(app.slug)) continue;
    const icon = await roundedIcon(await iconFor(app), ICON, 76);
    await write(app.slug, {
      background: background(app),
      composite: [
        { input: icon, left: ICON_X, top: ICON_Y },
        {
          input: textLayer({
            title: app.name,
            lines: wrap(app.job, 34, 3),
            footer: 'farsidesoftware.com',
            titleSize: 84,
            lineSize: 34,
          }),
        },
      ],
    });
  }

  if (only.length) return;

  // Company default: the Farside icon.
  const plate = await sharp(path.join(ROOT, 'src', 'assets', 'farside', 'icon.svg'), { density: 300 })
    .resize(ICON, ICON)
    .png()
    .toBuffer();
  await write('default', {
    background: background({ accent: '#FF7A3D' }),
    composite: [
      { input: plate, left: ICON_X, top: ICON_Y },
      {
        input: textLayer({
          title: 'Farside Software',
          lines: wrap('Independent apps for every Apple device. Private by design.', 34, 3),
          footer: 'farsidesoftware.com',
          titleSize: 72,
          lineSize: 34,
        }),
      },
    ],
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
