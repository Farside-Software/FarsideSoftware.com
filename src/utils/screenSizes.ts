/**
 * Pixel sizes of the bundled screenshots, from the sizes.json that
 * scripts/screen-sizes.mjs writes next to each screens folder. Keyed by the
 * built image URL, so callers can look up any URL that screensFromGlob gave
 * them.
 */
const urls = import.meta.glob('../assets/*/screens/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const manifests = import.meta.glob('../assets/*/screens/sizes.json', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, [number, number]>>;

const byUrl = new Map<string, [number, number]>();
for (const [file, url] of Object.entries(urls)) {
  const dir = file.slice(0, file.lastIndexOf('/'));
  const size = manifests[`${dir}/sizes.json`]?.[file.slice(dir.length + 1)];
  if (size) byUrl.set(url, size);
}

/** Width and height of a bundled screenshot, or a portrait iPhone shape when it is unknown. */
export function screenSize(url: string): [number, number] {
  return byUrl.get(url) ?? [1170, 2532];
}
