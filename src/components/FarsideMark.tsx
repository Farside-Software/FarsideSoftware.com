import type { Ref } from 'react';

interface FarsideMarkProps {
  className?: string;
  /**
   * Position and size when drawn inside another SVG (user units of the
   * parent). Without them a nested mark fills the parent's whole viewport.
   */
  x?: number;
  y?: number;
  size?: number;
  /** Accessible name; omit when the mark is decorative. */
  title?: string;
  /**
   * Draws the signal's orbit as a hairline ring and sets the dot travelling
   * along it (still under reduced motion). For large, decorative uses only;
   * the logo itself never moves.
   */
  orbit?: boolean;
  /**
   * Hands the signal dot's group to the caller, which turns it itself
   * (rotate(angle 135 135)) instead of the CSS animation. CSS-animated SVG
   * transforms can be painted on a layer of their own, above things drawn
   * after them; a caller that draws over the orbit needs normal order.
   */
  orbitRef?: Ref<SVGGElement>;
}

/**
 * The Farside mark, drawn from the brand kit's geometry (version 1.1). One
 * unit `u` is the disc radius / 9 (10 here). The mark is a single disc: the
 * lit edge is a crescent 2u wide at the middle whose inner boundary is half
 * of an ellipse (9u tall, 7u wide), so the outline is always a circle. The
 * signal dot (radius 1.4u) sits 11.3u from the disc's centre on the 45
 * degree diagonal, down and to the left.
 *
 * Colours follow the theme: the lit edge is --mark-rim, the dark side is
 * Night, the dot is Signal.
 */
export default function FarsideMark({ className, title, orbit = false, x, y, size, orbitRef }: FarsideMarkProps) {
  const cssOrbit = orbit && !orbitRef;
  // With the orbit the box is a square around the whole ring.
  const cx = orbit ? 135 : 100;
  const cy = orbit ? 135 : 96;
  const d = 113 * Math.SQRT1_2;
  return (
    <svg
      viewBox={orbit ? '0 0 270 270' : '0 0 196 196'}
      x={x}
      y={y}
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {orbit && <circle cx={cx} cy={cy} r={113} fill="none" stroke="rgb(var(--line) / 0.14)" strokeWidth={0.6} />}
      {/* The lit edge is only the crescent. It runs 1u under the dark side along
          the shadow line (so no seam shows there) but never under the disc's
          outer left edge, where a light layer would fringe the dark one. */}
      <path
        d={`M${cx} ${cy - 90}A90 90 0 0 1 ${cx} ${cy + 90}A60 90 0 0 0 ${cx} ${cy - 90}Z`}
        fill="rgb(var(--mark-rim))"
      />
      <path
        d={`M${cx} ${cy - 90}A90 90 0 0 0 ${cx} ${cy + 90}A70 90 0 0 0 ${cx} ${cy - 90}Z`}
        fill="rgb(var(--night))"
      />
      <g ref={orbitRef} className={cssOrbit ? 'orbit' : undefined} style={cssOrbit ? { transformOrigin: `${cx}px ${cy}px` } : undefined}>
        <circle cx={cx - d} cy={cy + d} r={14} fill="rgb(var(--signal))" />
      </g>
    </svg>
  );
}
