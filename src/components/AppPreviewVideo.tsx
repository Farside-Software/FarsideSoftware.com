import { useId, useRef, useState } from 'react';
import { Maximize2, Play } from 'lucide-react';
import { accentText, readableOn } from '../theme/contrast';

/** An App Store preview video and its poster, as an app page supplies it. */
export interface AppPreview {
  /** MP4 path (H.264 + AAC). */
  src: string;
  /** Poster frame shown until playback starts. */
  poster: string;
  /** Pixel size of the video; portrait when height > width. */
  width: number;
  height: number;
  /** Spoken description for assistive tech (not shown on screen). */
  caption?: string;
}

export interface AppPreviewVideoProps extends AppPreview {
  /** Accessible name, e.g. "Opalite app preview". */
  title: string;
  accent?: string;
  /** Sizing classes for the frame (width or height); the aspect ratio is set from the video. */
  className?: string;
}

/**
 * The App Store preview as an inline player: a poster in a screenshot-style
 * frame, never autoplaying (it has a score). A flat play button sits over the
 * poster until the first play, then native controls take over.
 */
export default function AppPreviewVideo({
  src,
  poster,
  width,
  height,
  caption,
  title,
  accent = '#E8EAF1',
  className = '',
}: AppPreviewVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);
  const descId = useId();

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    void video.play().catch(() => setStarted(false));
  };

  const enterFullscreen = () => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void; webkitRequestFullscreen?: () => void })
      | null;
    if (!video) return;
    if (!started) start();
    if (video.requestFullscreen) {
      void video.requestFullscreen().catch(() => undefined);
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line/10 bg-panel ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        width={width}
        height={height}
        preload="none"
        playsInline
        controls={started}
        aria-label={title}
        aria-describedby={caption ? descId : undefined}
        onPlay={() => setStarted(true)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <p id={descId} className="sr-only">
          {caption}
        </p>
      )}
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play ${title}`}
          className="absolute left-1/2 top-[80%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-safe:hover:scale-105"
          style={{ background: accent, color: readableOn(accent), outlineColor: accentText(accent) }}
        >
          <Play aria-hidden="true" className="ml-1 h-7 w-7" fill="currentColor" strokeWidth={0} />
        </button>
      )}
      <button
        type="button"
        onClick={enterFullscreen}
        aria-label={started ? 'Full screen' : `Play ${title} full screen`}
        className="absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-line/20 bg-panel text-ink transition-colors hover:border-line/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ outlineColor: accentText(accent) }}
      >
        <Maximize2 aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
