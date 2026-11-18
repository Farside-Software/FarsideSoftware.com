import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { accentText, readableOn } from '../theme/contrast';

export interface AppPreviewVideoProps {
  /** MP4 path (H.264 + AAC). */
  src: string;
  /** Poster frame shown until playback starts. */
  poster: string;
  /** Accessible name, e.g. "Opalite app preview". */
  title: string;
  accent?: string;
  caption?: string;
}

/**
 * The App Store preview on an app page: a portrait video in a phone-shaped
 * frame, never autoplaying (it has a score). A flat play button sits over the
 * poster until the first play, then native controls take over.
 */
export default function AppPreviewVideo({ src, poster, title, accent = '#E8EAF1', caption }: AppPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => setStarted(false));
  };

  return (
    <section aria-labelledby="app-preview" className="border-b border-line/10 bg-page py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:justify-self-end lg:text-right">
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-muted lg:flex-row-reverse">
            <span aria-hidden="true" className="h-px w-8" style={{ background: accent }} />
            App preview
          </p>
          <h2
            id="app-preview"
            className="mt-5 text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink [text-wrap:balance] sm:text-headline"
          >
            See it in action
          </h2>
          {caption && <p className="mt-5 max-w-md text-lg leading-relaxed text-muted lg:ml-auto">{caption}</p>}
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-[886/1920] w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-line/10 bg-panel lg:mx-0 lg:max-w-[360px]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={poster}
              preload="none"
              playsInline
              controls
              aria-label={title}
              onPlay={() => setStarted(true)}
            >
              <source src={src} type="video/mp4" />
            </video>
            {!started && (
              <button
                type="button"
                onClick={start}
                aria-label={`Play ${title}`}
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:hover:scale-105"
                style={{ background: accent, color: readableOn(accent), outlineColor: accentText(accent) }}
              >
                <Play aria-hidden="true" className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
