#!/usr/bin/env node
// build-press-assets.mjs
//
// Builds the downloadable press kit under public/press/<slug>/:
//   icon.png            1024px app icon (from ../../Apps/<App>/Icons/AppIcon.png)
//   screenshot-N.webp   three marketing screenshots, longest side 1600px, < 400 KB
//
// Screenshot folders are tried in order per app; the first three images found
// are used. Outputs are committed, so this only needs re-running when the
// source assets change:   npm run press

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { apps } from '../src/data/catalog.mjs';
import assetConfig from './app-assets.config.mjs';

const run = promisify(execFile);
const ICTOOL =
  process.env.ICTOOL ?? '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = path.resolve(ROOT, process.env.APPS_DIR ?? '../../Apps');
const OUT_DIR = path.join(ROOT, 'public', 'press');

const COUNT = 3;
const MAX_SIDE = 1600;
const MAX_BYTES = 400 * 1024;
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const naturalCompare = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

/**
 * Candidate screenshot folders per app, in priority order. An entry ending in
 * "prefix-*" takes only the files in that folder whose names start with "prefix-".
 */
const SCREENSHOT_DIRS = {
  maestro: [
    'Marketing/Maestro 2.0/store-screenshots/draft-2/iphone',
    'Marketing/Maestro 2.0/store-screenshots/draft-2/mac',
  ],
  opalite: [
    '../../Marketing/Opalite 2.0/store-screenshots/final/exports/iphone-*',
    '../../Marketing/Opalite 2.0/store-screenshots/final/exports/ipad-*',
  ],
  setdeck: ['Screenshots/Professional/iPhone', 'Screenshots/Professional/iPad'],
  mygra: [
    '../../Marketing/Mygra 3.0/store-screenshots/final/iphone-*',
    '../../Marketing/Mygra 3.0/store-screenshots/final/ipad-*',
  ],
  stork: ['Screenshots/Professional/iPhone', 'Screenshots/Professional/iPad'],
  waffle: ['Screenshots/Professional/iPad'],
};

async function listImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name) && !e.name.startsWith('.'))
      .map((e) => path.join(dir, e.name))
      .sort((a, b) => naturalCompare(path.basename(a), path.basename(b)));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function pickScreens(app) {
  const picked = [];
  for (const rel of SCREENSHOT_DIRS[app.slug] ?? []) {
    const star = rel.endsWith('*');
    const dir = path.join(APPS_DIR, app.source, star ? path.dirname(rel) : rel);
    const prefix = star ? path.basename(rel).slice(0, -1) : '';
    const images = (await listImages(dir)).filter((img) => path.basename(img).startsWith(prefix));
    // Take at most two from any one folder so the set shows more than one device.
    for (const img of images.slice(0, 2)) {
      if (picked.length < COUNT) picked.push(img);
    }
    if (picked.length >= COUNT) break;
  }
  if (picked.length < COUNT) {
    // Top up from the bundled site screenshots.
    const bundled = await listImages(path.join(ROOT, 'src', 'assets', app.slug, 'screens'));
    for (const img of bundled) {
      if (picked.length >= COUNT) break;
      if (!picked.includes(img)) picked.push(img);
    }
  }
  return picked.slice(0, COUNT);
}

async function writeScreenshot(src, out) {
  let quality = 84;
  for (;;) {
    await sharp(src)
      .resize(MAX_SIDE, MAX_SIDE, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    const { size } = await fs.stat(out);
    if (size <= MAX_BYTES || quality <= 40) return size;
    quality -= 8;
  }
}

async function main() {
  const only = process.argv.slice(2);
  for (const app of apps) {
    if (only.length && !only.includes(app.slug)) continue;
    const dir = path.join(OUT_DIR, app.slug);
    await fs.rm(dir, { recursive: true, force: true });
    await fs.mkdir(dir, { recursive: true });
    console.log(`${app.name}`);

    let iconSrc = path.join(APPS_DIR, app.source, 'Icons', 'AppIcon.png');
    const config = assetConfig.find((c) => c.app === app.slug);
    if (config?.iconFromComposer) {
      // No exported Icons/AppIcon.png: render the Icon Composer file's Default appearance.
      iconSrc = path.join(os.tmpdir(), `${app.slug}-press-icon-${process.pid}.png`);
      await run(ICTOOL, [path.join(APPS_DIR, app.source, config.iconComposer), '--export-image', '--output-file', iconSrc,
        '--platform', 'iOS', '--rendition', 'Default', '--width', '1024', '--height', '1024', '--scale', '1']);
    }
    await sharp(iconSrc).resize(1024, 1024, { fit: 'cover' }).png({ compressionLevel: 9 }).toFile(path.join(dir, 'icon.png'));
    console.log(`  icon.png`);

    // An app that is not out yet has no store screenshots; the press page shows its icon only.
    if (app.comingSoon) continue;

    const screens = await pickScreens(app);
    if (screens.length < COUNT) {
      throw new Error(`${app.name}: expected ${COUNT} screenshots, found ${screens.length}`);
    }
    for (const [i, src] of screens.entries()) {
      const out = path.join(dir, `screenshot-${i + 1}.webp`);
      const size = await writeScreenshot(src, out);
      console.log(`  screenshot-${i + 1}.webp  <- ${path.relative(APPS_DIR, src)}  (${Math.round(size / 1024)} KB)`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
