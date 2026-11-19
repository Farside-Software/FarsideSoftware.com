import { useEffect } from 'react';
import AppPreviewVideo from './AppPreviewVideo';

export interface DevicePreviewTile {
  /** Caption under the tile, e.g. "iPad". */
  label: string;
  /** Accessible title for the video. */
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Tailwind width class for the tile; tiles share one height, so this sets their size. */
  frame: string;
}

interface Props {
  accentColor: string;
  intro: string;
  tiles: DevicePreviewTile[];
}

/**
 * App Previews for the devices beyond the hero's: click-to-play tiles in a row that scrolls
 * sideways on small screens and wraps, centered, on large ones. Starting one pauses every
 * other video on the page.
 */
export default function DevicePreviews({ accentColor, intro, tiles }: Props) {
  useEffect(() => {
    const onPlay = (event: Event) => {
      const playing = event.target;
      if (!(playing instanceof HTMLVideoElement)) return;
      document.querySelectorAll('video').forEach((v) => {
        if (v !== playing && !v.paused) v.pause();
      });
    };
    document.addEventListener('play', onPlay, true);
    return () => document.removeEventListener('play', onPlay, true);
  }, []);

  return (
    <section aria-labelledby="device-previews" className="border-b border-line/10 bg-page py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="device-previews" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          See it on every device
        </h2>
        <p className="mt-2 max-w-2xl text-muted">{intro}</p>
        <div className="-mx-6 mt-8 flex snap-x scroll-px-6 items-end gap-6 overflow-x-auto px-6 pb-2 lg:flex-wrap lg:justify-center lg:overflow-visible">
          {tiles.map((t) => (
            <figure key={t.src} className="m-0 shrink-0 snap-start">
              <AppPreviewVideo
                src={t.src}
                poster={t.poster}
                width={t.width}
                height={t.height}
                title={t.title}
                accent={accentColor}
                className={`${t.frame} max-w-[calc(100vw-3rem)]`}
              />
              <figcaption className="mt-3 text-sm text-muted">{t.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
