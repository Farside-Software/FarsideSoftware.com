#!/usr/bin/env node
// screen-sizes.mjs
//
// Writes src/assets/<app>/screens/sizes.json, the pixel size of every
// screenshot in that folder ({ "01.webp": [width, height], ... }). The
// screenshot carousel reads it so each slide, and its loading placeholder,
// takes the image's real shape before the image arrives.
//
// sync-app-assets runs this after every sync; run it by hand only after
// changing a screens folder some other way:   npm run screen-sizes

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS_DIR = path.join(ROOT, 'src', 'assets');
const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;

export async function writeScreenSizes() {
  for (const entry of await fs.readdir(ASSETS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const dir = path.join(ASSETS_DIR, entry.name, 'screens');
    let files;
    try {
      files = (await fs.readdir(dir)).filter((f) => IMAGE_EXT.test(f)).sort();
    } catch {
      continue;
    }
    const sizes = {};
    for (const file of files) {
      const { width, height } = await sharp(path.join(dir, file)).metadata();
      sizes[file] = [width, height];
    }
    await fs.writeFile(path.join(dir, 'sizes.json'), `${JSON.stringify(sizes, null, 2)}\n`);
    console.log(`  sizes.json  ${entry.name} (${files.length} screens)`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeScreenSizes().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
