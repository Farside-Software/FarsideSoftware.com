#!/usr/bin/env node
// sync-app-assets.mjs
//
// Copies each app's latest icon and marketing screenshots from the Apps
// directory into src/assets/<app>/, resizing and re-encoding them for the web:
//
//   src/assets/<app>/icon.png          512px square PNG
//   src/assets/<app>/icon-dark.png     512px, the Icon Composer file's Dark rendition
//   src/assets/<app>/screens/NN.webp   max 1200px tall WebP, numbered in order
//
// Pages pick the screens up automatically via import.meta.glob, so adding or
// reordering screenshots is just a matter of re-running this script.
//
// Usage:
//   npm run assets                 sync every app in app-assets.config.mjs
//   npm run assets -- stork maestro   sync only those apps
//   npm run assets -- --icons-only    icons only, screenshots untouched
//   APPS_DIR=/path/to/Apps npm run assets

import { promises as fs } from 'node:fs';
import { execFile } from 'node:child_process';
import os from 'node:os';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import apps, { APPS_DIR_DEFAULT, APPS_DIR_FALLBACKS } from './app-assets.config.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APPS_DIR = path.resolve(ROOT, process.env.APPS_DIR ?? APPS_DIR_DEFAULT);
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const SEARCH_DIRS = process.env.APPS_DIR ? [APPS_DIR] : [APPS_DIR, ...APPS_DIR_FALLBACKS.map((d) => path.resolve(ROOT, d))];
const ICTOOL =
  process.env.ICTOOL ?? '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool';
const run = promisify(execFile);

const ICON_SIZE = 512;
const SCREEN_MAX_HEIGHT = 1200; // 2x retina for the 384px-tall carousel
const WEBP_QUALITY = 82;
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

const naturalCompare = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function listImages(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
  return entries
    .filter((e) => e.isFile() && IMAGE_EXT.test(e.name) && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort(naturalCompare);
}

/** Renders one appearance of the app's Icon Composer file to a 1024px PNG with Xcode's ictool. */
async function renderComposerIcon(app, source, rendition, tmp) {
  await run(ICTOOL, [path.join(source, app.iconComposer), '--export-image', '--output-file', tmp,
    '--platform', 'iOS', '--rendition', rendition, '--width', '1024', '--height', '1024', '--scale', '1']);
}

async function syncIcon(app, source) {
  let src = path.join(source, app.icon ?? '');
  let tmpLight;
  if (app.iconFromComposer) {
    tmpLight = path.join(os.tmpdir(), `${app.app}-icon-${process.pid}.png`);
    await renderComposerIcon(app, source, 'Default', tmpLight);
    src = tmpLight;
  }
  const out = path.join(ASSETS_DIR, app.app, 'icon.png');
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(src)
    .resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);
  const { size } = await fs.stat(out);
  if (tmpLight) await fs.rm(tmpLight, { force: true });
  console.log(`  icon   ${path.relative(ROOT, out)}  (${kb(size)})`);
}

async function syncScreens(app, source) {
  const outDir = path.join(ASSETS_DIR, app.app, 'screens');
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  let index = 0;
  let total = 0;
  for (const entry of app.screens) {
    // "folder/prefix-*" takes only the files in folder whose names start with prefix.
    const star = entry.endsWith('*');
    const folder = star ? path.dirname(entry) : entry;
    const prefix = star ? path.basename(entry).slice(0, -1) : '';
    const dir = path.join(source, folder);
    const listed = await listImages(dir);
    if (listed === null) {
      console.warn(`  ⚠️  missing folder: ${dir}`);
      continue;
    }
    const files = listed.filter((f) => f.startsWith(prefix));
    for (const file of files) {
      index += 1;
      const out = path.join(outDir, `${String(index).padStart(2, '0')}.webp`);
      await sharp(path.join(dir, file))
        .resize({ height: SCREEN_MAX_HEIGHT, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(out);
      const { size } = await fs.stat(out);
      total += size;
      console.log(`  screen ${path.basename(out)}  ←  ${folder}/${file}  (${kb(size)})`);
    }
  }
  console.log(`  ${index} screenshots, ${kb(total)} total`);
}

/** Renders the Icon Composer file's Dark appearance with Xcode's ictool. */
async function syncDarkIcon(app, source) {
  if (!app.iconComposer) return;
  const out = path.join(ASSETS_DIR, app.app, 'icon-dark.png');
  const tmp = path.join(os.tmpdir(), `${app.app}-icon-dark-${process.pid}.png`);
  try {
    await renderComposerIcon(app, source, 'Dark', tmp);
  } catch (err) {
    console.warn(`  ⚠️  dark icon not rendered (${err.code ?? err.message}); keeping the existing one`);
    return;
  }
  await sharp(tmp).resize(ICON_SIZE, ICON_SIZE, { fit: 'cover' }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out);
  await fs.rm(tmp, { force: true });
  console.log(`  icon   ${path.relative(ROOT, out)}  (dark)`);
}

/** The app's folder: in APPS_DIR, or in a fallback while the apps move. */
async function findSource(app) {
  for (const dir of SEARCH_DIRS) {
    const candidate = path.join(dir, app.source);
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try the next one
    }
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);
  const iconsOnly = args.includes('--icons-only');
  const requested = args.filter((a) => !a.startsWith('--')).map((s) => s.toLowerCase());
  const selected = requested.length ? apps.filter((a) => requested.includes(a.app)) : apps;
  const unknown = requested.filter((r) => !apps.some((a) => a.app === r));
  if (unknown.length) {
    console.error(`Unknown app(s): ${unknown.join(', ')}. Known: ${apps.map((a) => a.app).join(', ')}`);
    process.exit(1);
  }

  console.log(`Apps directory: ${APPS_DIR}\n`);
  for (const app of selected) {
    console.log(`▶ ${app.app}`);
    const source = await findSource(app);
    if (!source) {
      console.error(`  ❌ source folder not found for ${app.source} in ${SEARCH_DIRS.join(', ')}`);
      process.exitCode = 1;
      continue;
    }
    console.log(`  from ${source}`);
    await syncIcon(app, source);
    await syncDarkIcon(app, source);
    if (!iconsOnly) await syncScreens(app, source);
    console.log('');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
