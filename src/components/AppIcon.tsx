interface AppIconProps {
  /** The light (default) icon. */
  src: string;
  /** The dark-appearance icon, faded in while the icon is hovered. */
  darkSrc?: string;
  /** Rendered size in CSS pixels (width and height attributes). */
  size: number;
  /** Size and corner classes, e.g. "h-12 w-12 rounded-xl". */
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * An app icon that fades to its dark appearance while the pointer is over it
 * and back to light when it leaves. Where a stretched link covers the icon (a
 * whole clickable row), give the row `group/app` and hovering the row does it.
 * Decorative: the app's name is always next to it, so both images have empty
 * alt text.
 */
export default function AppIcon({ src, darkSrc, size, className = '', loading, fetchPriority }: AppIconProps) {
  return (
    <span className={`group/icon relative inline-block shrink-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        // Fades out as the dark one fades in, so its edge never shows through
        // the dark icon's anti-aliased rim as a light fringe.
        className={`block h-full w-full ${
          darkSrc
            ? 'transition-opacity duration-300 ease-out group-hover/icon:opacity-0 group-hover/app:opacity-0 motion-reduce:transition-none'
            : ''
        }`}
      />
      {darkSrc && (
        <img
          src={darkSrc}
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 block h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover/icon:opacity-100 group-hover/app:opacity-100 motion-reduce:transition-none"
        />
      )}
    </span>
  );
}
