import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { accentText } from '../theme/contrast';
import type { AppPreview } from './AppPreviewVideo';

export interface HeroLoopVideoProps extends AppPreview {
  /** Accessible name, e.g. "Mygra video". */
  title: string;
  accent?: string;
  /** Sizing classes for the frame; the aspect ratio is set from the video. */
  className?: string;
}

/**
 * The short marketing loop at the top of an app page. It starts by itself,
 * muted and looping, once the page has loaded (never for people who ask for
 * reduced motion, who get the poster and a play button). Two small buttons
 * pause it and turn the sound on.
 */
export default function HeroLoopVideo({
  src,
  poster,
  width,
  height,
  caption,
  title,
  accent = '#E8EAF1',
  className = '',
}: HeroLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const descId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React does not reflect `muted` to the element, and autoplay needs it set.
    video.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    void video.play().catch(() => undefined);
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) void video.play().catch(() => undefined);
  };

  const button =
    'flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-line/10 bg-panel ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        width={width}
        height={height}
        preload="metadata"
        loop
        muted
        playsInline
        aria-label={title}
        aria-describedby={caption ? descId : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <p id={descId} className="sr-only">
          {caption}
        </p>
      )}
      <div className="absolute bottom-3 right-3 z-10 flex gap-2">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? `Turn on sound for the ${title}` : `Mute the ${title}`}
          aria-pressed={!muted}
          className={button}
          style={{ outlineColor: accentText(accent) }}
        >
          {muted ? <VolumeX aria-hidden="true" className="h-4 w-4" /> : <Volume2 aria-hidden="true" className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause the ${title}` : `Play the ${title}`}
          className={button}
          style={{ outlineColor: accentText(accent) }}
        >
          {playing ? (
            <Pause aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play aria-hidden="true" className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
          )}
        </button>
      </div>
    </div>
  );
}
