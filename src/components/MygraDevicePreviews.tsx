import { useEffect } from 'react';
import AppPreviewVideo from './AppPreviewVideo';

interface Props {
  accentColor: string;
}

const tiles = [
  {
    label: 'iPad',
    title: 'Mygra on iPad',
    src: '/video/mygra-preview-ipad.mp4',
    poster: '/video/mygra-preview-ipad-poster.webp',
    width: 810,
    height: 1080,
    frame: 'w-[255px]',
  },
  {
    label: 'iPhone Duo, unfolded',
    title: 'Mygra on iPhone Duo, unfolded',
    src: '/video/mygra-preview-duo-unfolded.mp4',
    poster: '/video/mygra-preview-duo-unfolded-poster.webp',
    width: 1280,
    height: 590,
    frame: 'w-[737px]',
  },
  {
    label: 'iPhone Duo, folded',
    title: 'Mygra on iPhone Duo, folded',
    src: '/video/mygra-preview-duo-folded.mp4',
    poster: '/video/mygra-preview-duo-folded-poster.webp',
    width: 540,
    height: 1170,
    frame: 'w-[157px]',
  },
];

/** iPad and iPhone Duo App Previews, click-to-play; starting one pauses every other video on the page. */
export default function MygraDevicePreviews({ accentColor }: Props) {
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
        <p className="mt-2 max-w-2xl text-muted">
          Thirty-second tours of Mygra on iPad and on iPhone Duo, folded and unfolded. Tap to play.
        </p>
        <div className="-mx-6 mt-8 flex snap-x items-end gap-6 overflow-x-auto px-6 pb-2 lg:justify-center">
          {tiles.map((t) => (
            <figure key={t.src} className="m-0 shrink-0 snap-start">
              <AppPreviewVideo
                src={t.src}
                poster={t.poster}
                width={t.width}
                height={t.height}
                title={t.title}
                accent={accentColor}
                className={t.frame}
              />
              <figcaption className="mt-3 text-sm text-muted">{t.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
