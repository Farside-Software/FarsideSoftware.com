interface FarsideMarkProps {
  className?: string;
  /** Accessible name; omit when the mark is decorative. */
  title?: string;
  /**
   * Draws the signal's orbit as a hairline ring and sets the dot travelling
   * along it (still under reduced motion). For large, decorative uses only;
   * the logo itself never moves.
   */
  orbit?: boolean;
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
export default function FarsideMark({ className, title, orbit = false }: FarsideMarkProps) {
  // With the orbit the box is a square around the whole ring.
  const cx = orbit ? 135 : 100;
  const cy = orbit ? 135 : 96;
  const d = 113 * Math.SQRT1_2;
  return (
    <svg
      viewBox={orbit ? '0 0 270 270' : '0 0 196 196'}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {orbit && <circle cx={cx} cy={cy} r={113} fill="none" stroke="rgb(var(--line) / 0.14)" strokeWidth={0.6} />}
      <circle cx={cx} cy={cy} r={90} fill="rgb(var(--mark-rim))" />
      <path
        d={`M${cx} ${cy - 90}A90 90 0 0 0 ${cx} ${cy + 90}A70 90 0 0 0 ${cx} ${cy - 90}Z`}
        fill="rgb(var(--night))"
      />
      <g className={orbit ? 'orbit' : undefined} style={orbit ? { transformOrigin: `${cx}px ${cy}px` } : undefined}>
        <circle cx={cx - d} cy={cy + d} r={14} fill="rgb(var(--signal))" />
      </g>
    </svg>
  );
}
