interface StarfieldProps {
  className?: string;
  /** How many stars to draw across the 1600 x 900 field. */
  count?: number;
  /** Changes the arrangement; the same seed always draws the same sky. */
  seed?: number;
}

/**
 * A sparse, static field of flat dots. Positions come from a small seeded
 * generator, so the server render and the client render match exactly.
 */
export default function Starfield({ className = '', count = 70, seed = 7 }: StarfieldProps) {
  let state = seed;
  const next = () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
  const stars = Array.from({ length: count }, () => {
    const x = Math.round(next() * 1600);
    const y = Math.round(next() * 900);
    const size = next();
    const r = size > 0.92 ? 1.8 : size > 0.6 ? 1.2 : 0.8;
    const opacity = Math.round((0.22 + next() * 0.45) * 100) / 100;
    return { x, y, r, opacity };
  });
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="rgb(var(--regolith))" opacity={s.opacity} />
      ))}
    </svg>
  );
}
