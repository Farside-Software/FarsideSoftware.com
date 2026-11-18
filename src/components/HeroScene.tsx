import { useEffect, useRef } from 'react';
import FarsideMark from './FarsideMark';

/*
 * The home page hero art: the Farside moon in front, a small Earth turning
 * far off to the lower left, and a tiny Starship on its launch tower at
 * Starbase, Texas, riding round with the Earth.
 *
 * A few seconds after the hero comes into view (or straight away, if someone
 * clicks the Earth) the Earth eases to a stop with Starbase front and centre.
 * The full stack lifts off and stages; the booster comes back to the tower,
 * is caught high in its arms and lowered to the pad, and once it is caught the
 * Earth starts turning again, tower and booster with it. The ship flies over to the moon, growing as it comes closer, and
 * lands at about one o'clock.
 *
 * Click the Earth again and the ship lifts off the moon and comes home, while
 * the Earth brings the tower round to catch it in the arms and lower it down. The next time the
 * tower goes round the back of the Earth, the ship is stacked on a new
 * booster and a click launches it again. Only the first launch starts by
 * itself.
 *
 * Everything shares FarsideMark's orbit box (270 x 270, moon centre 135, 135,
 * radius 90). The Earth and the flight reach outside that box, so the SVG
 * draws with overflow visible. Under prefers-reduced-motion nothing moves and
 * the stack stands at Starbase, front and centre.
 */

type P = [number, number];
type Curve = [P, P, P, P];

// ---------------------------------------------------------------- the Earth

/** Earth is drawn at radius 32 in its own units and shrunk to `r` by distance. */
const EARTH = { x: -55, y: 245, r: 11 };
const R = 32;
const EARTH_SCALE = EARTH.r / R;

/** The continents strip: one rotation is 200 units, drawn twice so it loops. */
const STRIP = 200;
/** Starbase on the strip (Earth units): the Texas Gulf coast of the cartoon North America. */
const STARBASE: P = [29, -6];
/** Half the Earth's visible width at Starbase's latitude. */
const LIMB = Math.sqrt(R * R - STARBASE[1] * STARBASE[1]);
/** The tower, in Earth units: its height above the pad, and the reach of the ship's arm and the catch arms. */
const TOWER_H = 29.4;
const ARM_QD = 3.2;
const ARM_CATCH = 9.4;
/** Arms are drawn thicker than life and in a lighter grey, so they read at this distance. */
const ARM_W = 1.7;
/**
 * The catch arms ride up and down the tower; this is the height of their top
 * edge when they are raised, as they are for every launch and every catch.
 */
const ARM_TOP = 27.5;
/** Where the arms take each stage, measured up from its engines (Earth units): under the booster's grid fins, under the ship's forward flaps. */
const FIN_GRIP = 17.4;
const FLAP_GRIP = 8.75;

/** Strip phase (units turned) at which Starbase faces us, and where the page starts. */
const PHASE_FRONT = 3;
const PHASE_START = 182;
/** Earth units per second (one turn in 40 seconds). */
const SPIN = STRIP / 40;

const mod = (a: number, n: number) => ((a % n) + n) % n;

/** Where Starbase is at a given phase: its offset from the Earth's centre, tilt and visibility. */
function starbaseAt(phase: number) {
  const tx = mod(phase, STRIP) - STRIP;
  let x = -R + tx + STARBASE[0];
  if (x < -STRIP / 2) x += STRIP;
  const deg = (Math.asin(Math.max(-1, Math.min(1, x / LIMB))) * 180) / Math.PI;
  const opacity = Math.max(0, Math.min(1, (LIMB - Math.abs(x)) / 4));
  return { tx, x, deg, opacity };
}

// ---------------------------------------------------------------- the flight

const MOON = { x: 135, y: 135, r: 90 };
/** The launch pad in scene units, with the Earth stopped and Starbase front and centre. */
const PAD: P = [EARTH.x, EARTH.y + STARBASE[1] * EARTH_SCALE];

/** The landing site, about one o'clock on the moon, and the way "up" there. */
const SITE_ANGLE = 30;
const SITE_UP: P = [Math.sin((SITE_ANGLE * Math.PI) / 180), -Math.cos((SITE_ANGLE * Math.PI) / 180)];
const SITE: P = [MOON.x + MOON.r * SITE_UP[0], MOON.y + MOON.r * SITE_UP[1]];
const HOVER: P = [SITE[0] + 22 * SITE_UP[0], SITE[1] + 22 * SITE_UP[1]];

/**
 * The rocket is drawn in its own units and scaled by distance: small at the
 * far-off Earth, full size at the moon.
 */
const SCALE_FAR = 1.25 * EARTH_SCALE;
const SCALE_NEAR = 1.15;
/** Booster height including the hot-staging ring, in rocket units; the ship stands on top of it. */
const BOOSTER_H = 16.2;

// Up from the pad and staging close to Earth; the ship then climbs past the
// moon's left side and over its top to the landing site.
const ASCENT: Curve = [PAD, [PAD[0], PAD[1] - 14], [-50, 210], [-40, 202]];
const COAST: Curve = [[-40, 202], [-10, 178], [40, -45], [184, 20]];
/** The raised arms catch the booster under its grid fins, so it hangs this far above the pad (Earth units). */
const HANG = ARM_TOP - FIN_GRIP;
const CATCH: P = [PAD[0], PAD[1] - HANG * EARTH_SCALE];
const RETURN: Curve = [[-40, 202], [-34, 196], [PAD[0], 214], CATCH];

// Home again: up off the moon and back past the moon's left side, then down
// towards the tower on its belly, the way Starship re-enters. Just above the
// tower it lights its engines, flips upright and drops into the arms.
/** The ship's middle when it lights its engines to flip, on its belly with its nose to the left. */
const FLIP_MID: P = [PAD[0] + 3, PAD[1] - 24];
/** Half the ship's length (rocket units): it flips about its middle, not its engines. */
const SHIP_HALF = 5.7;
const FLIP_TAIL = along(FLIP_MID, -90, -SHIP_HALF * SCALE_FAR);
const BACK: Curve = [COAST[3], COAST[2], [-36, 168], FLIP_TAIL];
/** Where the ship's engines are once it is upright, before the landing burn sets it into the arms. */
const UPRIGHT: P = [PAD[0], PAD[1] - 16];
/** The raised arms catch the ship just under its forward flaps, so it hangs this far above the pad (Earth units). */
const SHIP_HANG = ARM_TOP - FLAP_GRIP;
const SHIP_CATCH: P = [PAD[0], PAD[1] - SHIP_HANG * EARTH_SCALE];
/**
 * Seconds from the click. The coast stretches so the ship lights its engines
 * above the tower (at `arrive`, 10 to 16 seconds) just as the Earth stops with
 * Starbase front and centre. It turns onto its belly `belly` seconds before
 * that; `flip` and `drop` are the flip and the landing burn after it.
 */
const RT = { ignite: 0.15, lift: 0.6, hover: 2.0, turn: 3.0, belly: 3.2, flip: 0.9, drop: 1.6 };

/** Seconds from ignition. */
const T = {
  ignite: 0.2,
  lift: 1.0,
  sep: 3.6,
  coastEnd: 9.0,
  flipEnd: 10.2,
  land: 12.4,
  boosterHome: 8.2,
  /** The dust has settled and a click brings the ship home. */
  settled: 13,
};
/** Seconds the hero is on screen before the countdown begins by itself. */
const DELAY = 3;

/** Mars, a tiny dot far off to the upper right, lit from the right like everything else. */
const MARS = { x: 262, y: 2, r: 2.6 };
const MARS_RED = '#C4552F';

// Off to Mars (a click on Mars while the ship stands by on the Earth or the
// moon): one way, shrinking into the distance until it vanishes in a glint.
/** Where the ship winks out, just short of the planet. */
const MARS_END: P = [MARS.x - 3, MARS.y + 3];
/** From staging near the Earth, up past the moon's left side and over its top. */
const MARS_FROM_EARTH: Curve = [[-40, 202], [-10, 178], [30, -40], MARS_END];
/** From just above the landing site, on up the way the ship points, and round to Mars. */
const MARS_FROM_MOON: Curve = [HOVER, [HOVER[0] + 28 * SITE_UP[0], HOVER[1] + 28 * SITE_UP[1]], [238, 0], MARS_END];
/** Seconds of drift from staging, and from lifting clear of the moon, to the glint; then the glint itself. */
const MARS_DRIFT = { earth: 8, moon: 7, glint: 0.8 };

const OCEAN = '#2E5F8E';
const LAND = '#5E8F57';
const FLAME_CORE = '#FFE2B8';
const STEEL = 'rgb(var(--regolith))';
const STEEL_SHADE = 'rgb(var(--dust))';
const TRIM = 'rgb(var(--basalt))';
const TILES = 'rgb(var(--night))';
const SIGNAL = 'rgb(var(--signal))';

/** A flame one unit wide and one unit long, hanging down from (0, 0). */
const FLAME = 'M-0.5 0C-0.5 0.35-0.2 0.78 0 1C0.2 0.78 0.5 0.35 0.5 0Z';
const SHIP_HULL = 'M-1.7 0L-1.7-7.6C-1.7-9.6-0.8-11-0.0-11.4C0.8-11 1.7-9.6 1.7-7.6L1.7 0Z';

const CONTINENTS = [
  // North America, Greenland, South America
  'M14-20C20-26 34-26 40-18C42-12 36-8 32-4C30-1 26 0 24 2C21-2 16-6 13-11C11-15 11-18 14-20Z',
  'M46-26C50-28 55-27 55-23C54-20 49-20 47-22C45-23 45-25 46-26Z',
  'M25 4C30 3 35 6 35 11C35 16 30 22 28 26C26 22 24 15 23 10C22 7 22 5 25 4Z',
  // Europe, Africa, Asia, Australia
  'M78-18C84-22 92-21 94-16C92-13 86-12 82-12C79-13 77-15 78-18Z',
  'M80-9C88-11 98-9 99-3C100 3 95 10 91 17C89 20 86 19 85 14C84 8 79 3 78-2C77-5 77-8 80-9Z',
  'M96-22C108-27 132-26 146-20C152-16 150-10 142-8C134-6 128-2 120-4C112-6 104-10 99-13C95-15 93-19 96-22Z',
  'M140 8C146 5 156 6 158 11C159 15 152 18 146 17C141 16 138 12 140 8Z',
];
const CLOUDS: [number, number, number][] = [
  [30, -6, 8],
  [72, 18, 6],
  [120, 10, 10],
  [170, -14, 6],
];

// ---------------------------------------------------------------- maths

function bez(c: Curve, u: number): P {
  const v = 1 - u;
  const a = v * v * v, b = 3 * v * v * u, d = 3 * v * u * u, e = u * u * u;
  return [a * c[0][0] + b * c[1][0] + d * c[2][0] + e * c[3][0], a * c[0][1] + b * c[1][1] + d * c[2][1] + e * c[3][1]];
}

/** Direction of travel along the curve, in degrees clockwise from straight up. */
function heading(c: Curve, u: number): number {
  const v = 1 - u;
  const dx = 3 * (v * v * (c[1][0] - c[0][0]) + 2 * v * u * (c[2][0] - c[1][0]) + u * u * (c[3][0] - c[2][0]));
  const dy = 3 * (v * v * (c[1][1] - c[0][1]) + 2 * v * u * (c[2][1] - c[1][1]) + u * u * (c[3][1] - c[2][1]));
  return (Math.atan2(dx, -dy) * 180) / Math.PI;
}

/**
 * Turns a speed profile (pairs of progress 0..1 and relative speed) into a
 * function from progress in time to progress along the path, so a stage can
 * speed up, coast and slow down without jumps.
 */
function profile(points: [number, number][]): (p: number) => number {
  const N = 200;
  const speed = (p: number) => {
    for (let i = 1; i < points.length; i++) {
      const [p0, v0] = points[i - 1];
      const [p1, v1] = points[i];
      if (p <= p1) return v0 + ((v1 - v0) * (p - p0)) / (p1 - p0);
    }
    return points[points.length - 1][1];
  };
  const table = [0];
  for (let i = 1; i <= N; i++) table.push(table[i - 1] + speed((i - 0.5) / N) / N);
  const total = table[N];
  return (p: number) => {
    const x = Math.min(Math.max(p, 0), 1) * N;
    const i = Math.min(Math.floor(x), N - 1);
    return (table[i] + (table[i + 1] - table[i]) * (x - i)) / total;
  };
}

const ascentU = profile([[0, 0], [1, 1]]);
const coastU = profile([[0, 1.2], [0.4, 1.0], [1, 0.4]]);
const returnU = profile([[0, 1.4], [0.3, 0.35], [0.75, 1.6], [1, 0]]);
const descentU = profile([[0, 1.3], [0.65, 0.9], [1, 0]]);
const liftU = profile([[0, 0], [0.5, 1], [1, 0.25]]);
const driftU = profile([[0, 0.6], [0.3, 1], [1, 0.7]]);
const backU = profile([[0, 0.3], [0.25, 1.2], [0.8, 1], [1, 0.5]]);

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const span = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);
const easeOut = (x: number) => 1 - (1 - x) * (1 - x);
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
const mix = (a: P, b: P, x: number): P => [lerp(a[0], b[0], x), lerp(a[1], b[1], x)];
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Rocket scale at a point: the closer to the moon (the foreground), the bigger. */
const FLIGHT = dist(PAD, SITE);
const depth = (p: P) => lerp(SCALE_FAR, SCALE_NEAR, smooth(clamp01(1 - dist(p, SITE) / FLIGHT)));

/** Offsets a point `d` units along a stage's own axis (up is negative local y). Hoisted: the flight paths above use it. */
function along(p: P, deg: number, d: number): P {
  const r = (deg * Math.PI) / 180;
  return [p[0] + d * Math.sin(r), p[1] - d * Math.cos(r)];
}

/** A burn that ramps in and out at the window's edges, with a little flicker. */
function burn(t: number, a: number, b: number, length: number, rampIn = 0.18, rampOut = 0.25) {
  if (t <= a || t >= b) return 0;
  const k = Math.min(span(t, a, a + rampIn), 1 - span(t, b - rampOut, b));
  return length * k * (1 + 0.13 * Math.sin(t * 41) + 0.07 * Math.sin(t * 73));
}

/** Position at u (0..1) on a cubic from p0 to p1 that starts at speed v0 and ends at rest, over d seconds. */
const hermite = (p0: number, p1: number, v0: number, d: number, u: number) =>
  (2 * u ** 3 - 3 * u ** 2 + 1) * p0 + (u ** 3 - 2 * u ** 2 + u) * d * v0 + (-2 * u ** 3 + 3 * u ** 2) * p1;

// ---------------------------------------------------------------- particles

interface Puff {
  born: number;
  life: number;
  /** Position at age `a` seconds. */
  at: (a: number) => P;
  r0: number;
  r1: number;
  o: number;
  fill: string;
}

let seed = 11;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

/** Smoke rolling out to either side of the pad, on the face of the Earth; `k` scales it. */
function padPuff(born: number, k: number, spread: number, rMax: number): Puff {
  const side = rand() < 0.5 ? -1 : 1;
  const x0 = side * (0.8 + rand() * 1.6) * k;
  const travel = side * spread * k * (0.45 + rand() * 0.55);
  const lift = (0.2 + rand() * 1.2) * k;
  return {
    born,
    life: 1.8 + rand() * 1.1,
    at: (a) => {
      const e = easeOut(clamp01(a / 1.6));
      return [PAD[0] + x0 + travel * e, PAD[1] - 0.3 * k - lift * e];
    },
    r0: (0.5 + rand() * 0.4) * k,
    r1: rMax * k * (0.6 + rand() * 0.4),
    o: 0.55,
    fill: STEEL,
  };
}

/** Dust rolling out sideways along the moon's surface from the landing site. */
function moonPuff(born: number): Puff {
  const k = SCALE_NEAR;
  const side = rand() < 0.5 ? -1 : 1;
  const s0 = ((SITE_ANGLE * Math.PI) / 180) * MOON.r + side * (0.8 + rand() * 1.6) * k;
  const travel = side * 9 * k * (0.45 + rand() * 0.55);
  const lift = (0.4 + rand() * 1.8) * k;
  return {
    born,
    life: 1.8 + rand() * 1.1,
    at: (a) => {
      const e = easeOut(clamp01(a / 1.6));
      const th = (s0 + travel * e) / MOON.r;
      const h = MOON.r + 0.3 * k + lift * e;
      return [MOON.x + h * Math.sin(th), MOON.y - h * Math.cos(th)];
    },
    r0: (0.5 + rand() * 0.4) * k,
    r1: 2.1 * k * (0.6 + rand() * 0.4),
    o: 0.55,
    fill: STEEL_SHADE,
  };
}

// ---------------------------------------------------------------- component

export default function HeroScene({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const earthRef = useRef<SVGGElement>(null);
  const stripRef = useRef<SVGGElement>(null);
  const towerRef = useRef<SVGGElement>(null);
  const qdArmRef = useRef<SVGRectElement>(null);
  const catchArmRef = useRef<SVGGElement>(null);
  const boosterRef = useRef<SVGGElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const bFlameRef = useRef<SVGGElement>(null);
  const sFlameRef = useRef<SVGGElement>(null);
  const flashRef = useRef<SVGCircleElement>(null);
  const marsRef = useRef<SVGGElement>(null);
  const glintRef = useRef<SVGGElement>(null);
  const puffRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const earth = earthRef.current!;
    const orbit = orbitRef.current!;
    const strip = stripRef.current!;
    const tower = towerRef.current!;
    const qdArm = qdArmRef.current!;
    const catchArm = catchArmRef.current!;
    const booster = boosterRef.current!;
    const ship = shipRef.current!;
    const bFlame = bFlameRef.current!;
    const sFlame = sFlameRef.current!;
    const flash = flashRef.current!;
    const mars = marsRef.current!;
    const glint = glintRef.current!;
    const pool = puffRefs.current.filter((c): c is SVGCircleElement => c !== null);

    const place = (g: SVGGElement, p: P, deg: number, k: number) =>
      g.setAttribute('transform', `translate(${p[0].toFixed(2)} ${p[1].toFixed(2)}) rotate(${deg.toFixed(2)}) scale(${k.toFixed(3)})`);

    /**
     * Turns the Earth to `phase`, carrying the tower and its arms; returns where
     * the pad is, in scene units. `qd` and `grip` are how far the ship's arm and
     * the catch arms reach out (0 swung back, 1 closed); `armY` is how high the
     * catch arms are up the tower.
     */
    const turnEarth = (phase: number, qd = 1, grip = 0, armY = ARM_TOP) => {
      const s = starbaseAt(phase);
      strip.setAttribute('transform', `translate(${s.tx.toFixed(2)} 0)`);
      tower.setAttribute('transform', `translate(${s.x.toFixed(2)} ${STARBASE[1]}) rotate(${s.deg.toFixed(2)})`);
      tower.setAttribute('opacity', s.opacity.toFixed(2));
      qdArm.setAttribute('width', (ARM_QD * lerp(0.3, 1, qd)).toFixed(2));
      const pos: P = [EARTH.x + s.x * EARTH_SCALE, EARTH.y + STARBASE[1] * EARTH_SCALE];
      catchArm.setAttribute(
        'transform',
        `translate(${pos[0].toFixed(2)} ${pos[1].toFixed(2)}) rotate(${s.deg.toFixed(2)}) scale(${EARTH_SCALE.toFixed(4)}) translate(0 ${(-armY).toFixed(2)})`,
      );
      catchArm.setAttribute('opacity', s.opacity.toFixed(2));
      const reach = ARM_CATCH * lerp(0.3, 1, grip);
      const [bar, claw] = catchArm.children;
      bar.setAttribute('width', reach.toFixed(2));
      claw.setAttribute('x', (-5.2 + reach - 0.9).toFixed(2));
      return { pos, deg: s.deg, opacity: s.opacity };
    };
    /** Stands the booster (and the ship, unless it has left) on the pad, or hangs it `hang` Earth units up in the arms. */
    const standOnPad = (pad: ReturnType<typeof turnEarth>, withShip: boolean, hang = 0) => {
      place(booster, along(pad.pos, pad.deg, hang * EARTH_SCALE), pad.deg, SCALE_FAR);
      booster.setAttribute('opacity', pad.opacity.toFixed(2));
      if (withShip) {
        place(ship, along(pad.pos, pad.deg, BOOSTER_H * SCALE_FAR), pad.deg, SCALE_FAR);
        ship.setAttribute('opacity', pad.opacity.toFixed(2));
      }
    };

    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Still: Starbase faces us with the stack on the pad, and the Earth does not respond to clicks.
      standOnPad(turnEarth(PHASE_FRONT), true);
      earth.style.pointerEvents = 'none';
      return;
    }

    // ---- state

    /**
     * ready: the stack stands on the pad and the Earth turns.
     * dock: the Earth eases to a stop with Starbase front and centre.
     * launch: the flight out, `t` seconds from ignition. Once the booster is caught the Earth turns again.
     * moon: the ship sits on the moon. The booster hangs in the arms until the tower goes round the back of the Earth.
     * return: the flight home, `t` seconds from the click, while the Earth brings the tower round and stops.
     * home: the ship hangs in the arms. Round the back of the Earth it is stacked on a new booster.
     * mars: off the moon and away to Mars, `t` seconds from the click. (From the Earth it is a launch with `dest` Mars.)
     * gone: the ship has gone to Mars. Round the back of the Earth a new stack stands on the pad.
     */
    type Mode = 'ready' | 'dock' | 'launch' | 'moon' | 'return' | 'home' | 'mars' | 'gone';
    const state = {
      mode: 'ready' as Mode,
      phase: PHASE_START,
      speed: 0,
      onScreen: 0,
      /** Only the first launch starts by itself. */
      auto: true,
      dock: { from: 0, to: 0, v0: 0, d: 1, t: 0 },
      t: 0,
      clock: 0,
      boosterHeld: false,
      /** Where this launch is going. */
      dest: 'moon' as 'moon' | 'mars',
      /** On the way home: when the ship is upright above the tower, and when the arms take it. */
      arrive: 0,
      caught: 0,
    };

    // ---- smoke, dust and flames

    const puffs: (Puff | null)[] = pool.map(() => null);
    const emit = (p: Puff) => {
      const i = puffs.findIndex((x) => x === null);
      if (i < 0) return; // every puff is in use; skip this one
      puffs[i] = p;
      pool[i].setAttribute('fill', p.fill);
    };
    const drawPuffs = (now: number) =>
      puffs.forEach((p, i) => {
        const c = pool[i];
        if (!p) return;
        const a = now - p.born;
        if (a >= p.life) {
          puffs[i] = null;
          c.setAttribute('opacity', '0');
          return;
        }
        const k = a / p.life;
        const [x, y] = p.at(a);
        c.setAttribute('cx', x.toFixed(2));
        c.setAttribute('cy', y.toFixed(2));
        c.setAttribute('r', lerp(p.r0, p.r1, easeOut(k)).toFixed(2));
        c.setAttribute('opacity', (p.o * (1 - k * k)).toFixed(2));
      });
    const acc = { ground: 0, trail: 0, bLand: 0, moon: 0, rcs: 0 };
    const every = (key: keyof typeof acc, dt: number, interval: number, fn: () => void) => {
      acc[key] += dt;
      while (acc[key] >= interval) {
        acc[key] -= interval;
        fn();
      }
    };
    const setFlame = (g: SVGGElement, length: number, width: number) => {
      if (length < 0.05) {
        g.setAttribute('opacity', '0');
        return;
      }
      g.setAttribute('opacity', '1');
      const [outer, inner] = g.children;
      outer.setAttribute('transform', `scale(${width} ${length.toFixed(2)})`);
      inner.setAttribute('transform', `scale(${(width * 0.5).toFixed(2)} ${(length * 0.6).toFixed(2)})`);
    };
    /** A puff of cold gas from the ship's nose, for a flip. */
    const rcs = (sPos: P, sDeg: number, sK: number) => {
      const nose = along(sPos, sDeg, 10.5 * sK);
      const side = rand() < 0.5 ? -1 : 1;
      emit({ born: state.clock, life: 0.5, at: (a) => [nose[0] + side * 2.5 * sK * a, nose[1] - 1.2 * sK * a], r0: 0.3 * sK, r1: 0.8 * sK, o: 0.7, fill: STEEL });
    };

    // ---- off to Mars

    /**
     * The ship `a` seconds into its drift along `path` to Mars, over `d`
     * seconds. For two thirds of the way it keeps the scene's depth (from the
     * Earth it grows as it passes close by the moon); only then does it shrink
     * away into the distance and wink out in a glint.
     */
    const drift = (a: number, path: Curve, d: number, flame: number) => {
      const x = span(a, 0, d);
      if (x < 1) {
        const u = driftU(x);
        const p = bez(path, u);
        place(ship, p, heading(path, u), Math.max(0.001, depth(p) * (1 - smooth(span(x, 0.65, 1)))));
        ship.setAttribute('opacity', '1');
        setFlame(sFlame, flame, 2.6);
        glint.setAttribute('opacity', '0');
        return;
      }
      ship.setAttribute('opacity', '0');
      setFlame(sFlame, 0, 2.6);
      // A little glint of sunlight off the hull as it goes: up, a quarter turn, and out.
      const g = span(a, d, d + MARS_DRIFT.glint);
      const end = path[3];
      glint.setAttribute(
        'transform',
        `translate(${end[0]} ${end[1]}) rotate(${(45 * g).toFixed(1)}) scale(${(1.6 * Math.sin(Math.PI * g)).toFixed(3)})`,
      );
      glint.setAttribute('opacity', g < 1 ? Math.sin(Math.PI * g).toFixed(2) : '0');
    };

    /** One frame of the trip from the moon to Mars, `t` seconds after the click: up off the surface, then away. */
    const flyMars = (t: number, dt: number) => {
      if (t < RT.hover) {
        const p: P = t < RT.lift ? (t > RT.ignite ? [SITE[0] + 0.1 * Math.sin(t * 95), SITE[1]] : SITE) : mix(SITE, HOVER, liftU(span(t, RT.lift, RT.hover)));
        place(ship, p, SITE_ANGLE, SCALE_NEAR);
        ship.setAttribute('opacity', '1');
        setFlame(sFlame, burn(t, RT.ignite, RT.hover + 0.3, 5.5, 0.35, 0.4), 2.6);
      } else {
        drift(t - RT.hover, MARS_FROM_MOON, MARS_DRIFT.moon, burn(t, RT.ignite, RT.hover + 2.5, 5.5, 0.35, 1.2));
      }
      if (t > RT.ignite + 0.1 && t < RT.lift + 0.7) every('moon', dt, 0.045, () => emit(moonPuff(state.clock)));
    };

    // ---- the flight out

    const sepHeading = heading(ASCENT, 1);
    const coastEndHeading = heading(COAST, 1);

    /** One frame of the flight out, `t` seconds after ignition. The booster is only placed while it flies. */
    const fly = (t: number, dt: number) => {
      const now = state.clock;
      let bPos: P = PAD;
      let bDeg = 0;
      if (t < T.sep) {
        const u = ascentU(span(t, T.lift, T.sep));
        bPos = bez(ASCENT, u);
        bDeg = heading(ASCENT, u);
        if (t > T.ignite + 0.1 && t < T.lift) bPos = [bPos[0] + 0.1 * Math.sin(t * 95), bPos[1]];
      } else if (t < T.boosterHome) {
        bPos = bez(RETURN, returnU(span(t, T.sep, T.boosterHome)));
        const flip = smooth(span(t, T.sep, T.sep + 1.0));
        const upright = smooth(span(t, T.sep + 1.8, T.boosterHome - 0.5));
        bDeg = lerp(lerp(sepHeading, -40, flip), 0, upright);
      }
      const bK = depth(bPos);
      if (t < T.boosterHome) {
        place(booster, bPos, bDeg, bK);
        booster.setAttribute('opacity', '1');
      }
      const bBurn =
        burn(t, T.ignite, T.sep, 9, 0.4, 0.12) +
        burn(t, T.sep + 0.4, T.sep + 1.1, 5.5) +
        burn(t, T.boosterHome - 1.2, T.boosterHome, 6.5, 0.2, 0.3);
      // On the pad the plume is short and spreads out as smoke; it lengthens as the stack climbs.
      setFlame(bFlame, Math.min(bBurn, 2 + (dist(bPos, PAD) / bK) * 1.1), 3.1);

      let sPos: P;
      let sDeg: number;
      const toMars = state.dest === 'mars';
      if (t < T.sep) {
        sPos = along(bPos, bDeg, BOOSTER_H * bK);
        sDeg = bDeg;
      } else if (toMars) {
        sPos = MARS_FROM_EARTH[0];
        sDeg = 0;
      } else if (t < T.coastEnd) {
        const u = coastU(span(t, T.sep, T.coastEnd));
        sPos = bez(COAST, u);
        sDeg = heading(COAST, u);
      } else if (t < T.flipEnd) {
        const k = smooth(span(t, T.coastEnd, T.flipEnd));
        sPos = mix(COAST[3], HOVER, k);
        sDeg = lerp(coastEndHeading, SITE_ANGLE, k);
      } else {
        sPos = mix(HOVER, SITE, descentU(span(t, T.flipEnd, T.land)));
        sDeg = SITE_ANGLE;
      }
      const sK = t < T.sep ? bK : depth(sPos);
      if (t < T.sep || !toMars) {
        place(ship, sPos, sDeg, sK);
        ship.setAttribute('opacity', '1');
        const sBurn = burn(t, T.sep, T.sep + 2.4, 6.5, 0.12, 0.35) + burn(t, T.flipEnd - 0.15, T.land, 5.5, 0.2, 0.18);
        setFlame(sFlame, sBurn, 2.6);
      } else {
        drift(t - T.sep, MARS_FROM_EARTH, MARS_DRIFT.earth, burn(t, T.sep, T.sep + 3.2, 6.5, 0.12, 0.6));
      }

      // Hot staging
      const f = span(t, T.sep - 0.05, T.sep + 0.45);
      if (f > 0 && f < 1) {
        const at = along(bPos, bDeg, (BOOSTER_H - 0.6) * bK);
        flash.setAttribute('cx', at[0].toFixed(2));
        flash.setAttribute('cy', at[1].toFixed(2));
        flash.setAttribute('r', ((1 + 6 * easeOut(f)) * bK).toFixed(2));
        flash.setAttribute('opacity', (0.85 * (1 - f)).toFixed(2));
      } else flash.setAttribute('opacity', '0');

      // Smoke and dust
      if (t > T.ignite + 0.1 && t < T.lift + 0.8) every('ground', dt, 0.05, () => emit(padPuff(now, SCALE_FAR, 13, 3.4)));
      if (t > T.lift && t < T.sep - 0.3)
        every('trail', dt, 0.08, () => {
          const tip = along(bPos, bDeg, -(2.5 + rand() * 4) * bK);
          emit({ born: now, life: 1.1 + rand() * 0.5, at: (a) => [tip[0], tip[1] + bK * a], r0: 0.5 * bK, r1: (1.6 + rand()) * bK, o: 0.4, fill: STEEL });
        });
      if (t > T.boosterHome - 0.45 && t < T.boosterHome + 0.2) every('bLand', dt, 0.07, () => emit(padPuff(now, SCALE_FAR, 7, 2.2)));
      if (!toMars && t > T.coastEnd + 0.1 && t < T.coastEnd + 0.9) every('rcs', dt, 0.2, () => rcs(sPos, sDeg, sK));
      if (!toMars && t > T.land - 0.35 && t < T.land + 0.15) every('moon', dt, 0.04, () => emit(moonPuff(now)));
    };

    // ---- the flight home

    const backStartHeading = heading(BACK, 0);

    /**
     * One frame of the flight home, `t` seconds after the click: up off the
     * moon, back the way it came, down towards the tower on its belly, then
     * engines on, a flip to upright and a landing burn into the arms. The ship
     * is placed until the arms take it.
     */
    const flyHome = (t: number, dt: number) => {
      const now = state.clock;
      const A = state.arrive;
      const C = state.caught;
      let p: P;
      let deg: number;
      let k: number;
      if (t < RT.lift) {
        p = t > RT.ignite ? [SITE[0] + 0.1 * Math.sin(t * 95), SITE[1]] : SITE;
        deg = SITE_ANGLE;
      } else if (t < RT.hover) {
        p = mix(SITE, HOVER, liftU(span(t, RT.lift, RT.hover)));
        deg = SITE_ANGLE;
      } else if (t < RT.turn) {
        const x = smooth(span(t, RT.hover, RT.turn));
        p = mix(HOVER, BACK[0], x);
        deg = lerp(SITE_ANGLE, backStartHeading, x);
      } else if (t < A) {
        // Nose first, then over onto its belly (heat shield down, nose to the left) for the fall.
        const u = backU(span(t, RT.turn, A));
        p = bez(BACK, u);
        deg = lerp(heading(BACK, u), -90, smooth(span(t, A - RT.belly, A - RT.belly + 1.4)));
      } else if (t < A + RT.flip) {
        // Engines on: it swings upright about its middle, overshooting a touch.
        const x = smooth(span(t, A, A + RT.flip));
        deg = lerp(-90, 0, x) + 7 * Math.sin(Math.PI * span(t, A + RT.flip * 0.6, A + RT.flip + 0.5));
        k = SCALE_FAR;
        const mid = mix(FLIP_MID, along(UPRIGHT, 0, SHIP_HALF * k), x);
        p = along(mid, deg, -SHIP_HALF * k);
      } else {
        p = mix(UPRIGHT, SHIP_CATCH, descentU(span(t, A + RT.flip, C)));
        deg = 7 * Math.sin(Math.PI * span(t, A + RT.flip * 0.6, A + RT.flip + 0.5));
      }
      k = t < A ? depth(p) : SCALE_FAR;
      if (t < C) {
        place(ship, p, deg, k);
        ship.setAttribute('opacity', '1');
      }
      const sBurn =
        burn(t, RT.ignite, RT.hover + 0.3, 5.5, 0.35, 0.4) +
        burn(t, RT.turn, RT.turn + 1.4, 6.5, 0.15, 0.35) +
        burn(t, A - 0.05, C - 0.05, 5.5, 0.12, 0.15);
      setFlame(sFlame, sBurn, 2.6);

      if (t > RT.ignite + 0.1 && t < RT.lift + 0.7) every('moon', dt, 0.045, () => emit(moonPuff(now)));
      if (t > A - RT.belly && t < A - RT.belly + 1.2) every('rcs', dt, 0.2, () => rcs(p, deg, k));
      if (t > C - 0.6 && t < C) every('bLand', dt, 0.08, () => emit(padPuff(now, SCALE_FAR, 6, 1.8)));
    };

    // ---- the Earth, the countdown and the clock

    const resetFlight = () => {
      (Object.keys(acc) as (keyof typeof acc)[]).forEach((key) => (acc[key] = 0));
      state.t = 0;
    };

    const launch = (dest: 'moon' | 'mars' = 'moon') => {
      state.dest = dest;
      // Ease to a stop with Starbase front and centre: the next time it comes round.
      const ahead = mod(PHASE_FRONT - state.phase, STRIP);
      const v0 = Math.max(state.speed, 0.1);
      const d = Math.min(2.5, Math.max(0.8, (2 * ahead) / v0));
      state.dock = { from: state.phase, to: state.phase + ahead, v0, d, t: 0 };
      state.mode = 'dock';
      state.auto = false;
      state.boosterHeld = true;
      resetFlight();
      run();
    };

    const comeHome = () => {
      // The Earth brings Starbase round to stop just as the ship lights its
      // engines above the tower. If the old booster is still in the arms, it goes round the
      // back once more, where the booster is cleared away out of sight.
      const v0 = Math.max(state.speed, 0.1);
      const ahead = mod(PHASE_FRONT - state.phase, STRIP);
      const D = ahead + (state.boosterHeld && ahead < LIMB + 1 ? STRIP : 0);
      const A = Math.min(16, Math.max(10, RT.turn + 7 + (D / STRIP) * 6));
      // Close by: slow to a stop and wait. Far: hurry round, stopping on arrival.
      const d = D < (v0 * A) / 2 ? Math.max(0.5, (2 * D) / v0) : A;
      state.dock = { from: state.phase, to: state.phase + D, v0, d, t: 0 };
      state.arrive = A;
      state.caught = A + RT.flip + RT.drop;
      state.mode = 'return';
      resetFlight();
      run();
    };

    const onClick = () => {
      if (state.mode === 'ready') launch();
      else if (state.mode === 'moon') comeHome();
    };
    /** Mars: from either standby, the ship leaves for good. */
    const onMars = () => {
      if (state.mode === 'ready') launch('mars');
      else if (state.mode === 'moon') {
        state.mode = 'mars';
        resetFlight();
        run();
      }
    };

    const spin = (dt: number, rampSeconds: number) => {
      state.speed = Math.min(SPIN, state.speed + (SPIN * dt) / rampSeconds);
      state.phase += state.speed * dt;
    };
    /** Advances the Earth's ease to a stop; true once it has stopped. */
    const dockStep = (dt: number) => {
      const k = state.dock;
      k.t += dt;
      const u = Math.min(1, k.t / k.d);
      state.phase = hermite(k.from, k.to, k.v0, k.d, u);
      state.speed = 0;
      return u >= 1;
    };

    let cursor = 'pointer';
    const step = (dt: number) => {
      // The signal dot circles the moon once every two minutes, as on the rest of the site.
      state.clock += dt;
      orbit.setAttribute('transform', `rotate(${(-(state.clock * 3) % 360).toFixed(2)} ${MOON.x} ${MOON.y})`);

      if (state.mode === 'ready') {
        spin(dt, 0.8);
        if (state.auto) {
          state.onScreen += dt;
          if (state.onScreen >= DELAY) launch();
        }
      } else if (state.mode === 'dock') {
        if (dockStep(dt)) state.mode = 'launch';
      } else if (state.mode === 'launch') {
        state.t += dt;
        fly(state.t, dt);
        // The Earth waits until the booster is caught, then picks up speed again.
        if (state.t >= T.boosterHome) spin(dt, 1.5);
        if (state.dest === 'moon' && state.t >= T.settled) state.mode = 'moon';
        if (state.dest === 'mars' && state.t >= T.sep + MARS_DRIFT.earth + MARS_DRIFT.glint) state.mode = 'gone';
      } else if (state.mode === 'mars') {
        state.t += dt;
        flyMars(state.t, dt);
        spin(dt, 1.5);
        if (state.t >= RT.hover + MARS_DRIFT.moon + MARS_DRIFT.glint) state.mode = 'gone';
      } else if (state.mode === 'return') {
        state.t += dt;
        flyHome(state.t, dt);
        if (state.t < state.caught) dockStep(dt);
        else spin(dt, 1.5);
        if (state.t >= state.caught + 0.6) state.mode = 'home';
      } else {
        state.t += dt;
        spin(dt, 1.5);
      }

      // The arms: the ship's arm swings back just before liftoff; the catch
      // arms close on whatever comes home and open again out of sight.
      const { mode, t } = state;
      // Caught: a little dip as the arms take the weight, then straight down the tower to the pad.
      const held = (at: number, high: number) =>
        lerp(high, 0, smooth(span(t, at + 0.35, at + 2))) - 0.6 * Math.sin(Math.PI * span(t, at, at + 0.45));
      const boosterHang = mode === 'launch' ? held(T.boosterHome, HANG) : 0;
      const shipHang = held(state.caught, SHIP_HANG);
      const shipHeld = (mode === 'return' && t >= state.caught) || mode === 'home';
      let qd = 0;
      let grip = 0;
      let armY = ARM_TOP;
      if ((mode === 'launch' && t >= T.boosterHome) || (mode !== 'launch' && state.boosterHeld)) armY = boosterHang + FIN_GRIP;
      else if (shipHeld) armY = shipHang + FLAP_GRIP;
      if (mode === 'ready' || mode === 'dock') qd = 1;
      else if (mode === 'launch') {
        qd = 1 - smooth(span(t, 0.3, 0.8));
        grip = smooth(span(t, T.boosterHome - 0.4, T.boosterHome));
      } else if (mode === 'home') grip = 1;
      else if (state.boosterHeld) grip = 1;
      else if (mode === 'return') grip = smooth(span(t, state.caught - 0.4, state.caught));
      const pad = turnEarth(state.phase, qd, grip, armY);

      if (mode === 'ready' || mode === 'dock') standOnPad(pad, true);
      else if (mode === 'launch') {
        if (t >= T.boosterHome) standOnPad(pad, false, boosterHang);
      } else if (state.boosterHeld) {
        if (pad.opacity === 0) {
          // Round the back of the Earth: the booster is taken away and the arms go back up.
          state.boosterHeld = false;
          booster.setAttribute('opacity', '0');
          turnEarth(state.phase, qd, 0, ARM_TOP);
        } else standOnPad(pad, false, 0);
      }
      if (shipHeld) {
        place(ship, along(pad.pos, pad.deg, shipHang * EARTH_SCALE), pad.deg, SCALE_FAR);
        ship.setAttribute('opacity', pad.opacity.toFixed(2));
      }
      if ((mode === 'home' || mode === 'gone') && pad.opacity === 0) {
        // Round the back of the Earth: the ship is stacked on a new booster, ready to go again.
        state.mode = 'ready';
        standOnPad(turnEarth(state.phase, 1, 0), true);
      }

      drawPuffs(state.clock);
      const want = state.mode === 'ready' || state.mode === 'moon' ? 'pointer' : 'default';
      if (want !== cursor) earth.style.cursor = mars.style.cursor = cursor = want;
      // The ship itself takes clicks only while it sits on the moon (a click brings it home).
      const shipClicks = state.mode === 'moon' ? 'auto' : 'none';
      if (ship.style.pointerEvents !== shipClicks) {
        ship.style.pointerEvents = shipClicks;
        ship.style.cursor = shipClicks === 'auto' ? 'pointer' : '';
      }
    };

    let raf = 0;
    let last = 0;
    let visible = false;
    const frame = (now: number) => {
      // Clamped, so a hidden tab pauses the scene instead of skipping ahead.
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      step(dt);
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    function run() {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) run();
        else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(svg);

    earth.addEventListener('click', onClick);
    mars.addEventListener('click', onMars);
    ship.addEventListener('click', onClick);

    if (import.meta.env.DEV) {
      // Development only. window.__heroSeek(seconds) stops the clock and runs
      // the scene forward by that many seconds of screen time; /?scene=<seconds>
      // does it from a fresh load, for screenshots. /?scene=20,8 runs 20
      // seconds, clicks the Earth, then runs 8 more; /?scene=20,m8 clicks Mars.
      const seek = (s: number) => {
        io.disconnect();
        cancelAnimationFrame(raf);
        raf = 0;
        visible = false;
        for (let x = 0; x <= s; x += 1 / 60) step(1 / 60);
      };
      (window as unknown as { __heroSeek?: (s: number) => void }).__heroSeek = seek;
      const frameAt = new URLSearchParams(window.location.search).get('scene');
      if (frameAt !== null)
        frameAt.split(',').forEach((s, i) => {
          if (i > 0) (s.startsWith('m') ? onMars : onClick)();
          seek(Number(s.replace(/^m/, '')));
        });
    }

    return () => {
      io.disconnect();
      earth.removeEventListener('click', onClick);
      mars.removeEventListener('click', onMars);
      ship.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
    };
  }, []);

  // The prerendered frame: the Earth at its starting phase, the stack on the pad.
  const start = starbaseAt(PHASE_START);
  const startPad: P = [EARTH.x + start.x * EARTH_SCALE, EARTH.y + STARBASE[1] * EARTH_SCALE];
  const startShip = along(startPad, start.deg, BOOSTER_H * SCALE_FAR);
  const night = `M0 ${-R}A${R} ${R} 0 0 0 0 ${R}A${R * 0.55} ${R} 0 0 1 0 ${-R}Z`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 270 270"
      className={className}
      style={{ overflow: 'visible', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hero-earth">
          <circle r={R} />
        </clipPath>
        <clipPath id="hero-ship-hull">
          <path d={SHIP_HULL} />
        </clipPath>
      </defs>

      {/* The moon, exactly as the logo draws it, with its orbiting signal */}
      <FarsideMark orbit orbitRef={orbitRef} x={0} y={0} size={270} />

      {/* Mars, very far off. Clicking it sends a standing-by ship there for good. */}
      <g ref={marsRef} transform={`translate(${MARS.x} ${MARS.y})`} style={{ pointerEvents: 'auto', cursor: 'pointer' }}>
        <circle r={10} fill="transparent" />
        <circle r={MARS.r} fill={MARS_RED} />
        <ellipse cy={-MARS.r + 0.45} rx={MARS.r * 0.4} ry={0.35} fill={STEEL} opacity={0.85} />
        <path
          d={`M0 ${-MARS.r}A${MARS.r} ${MARS.r} 0 0 0 0 ${MARS.r}A${MARS.r * 0.55} ${MARS.r} 0 0 1 0 ${-MARS.r}Z`}
          fill="rgb(var(--night) / 0.55)"
        />
      </g>

      {/* Earth, far off and lit from the right like the moon, with the launch
          tower at Starbase. Drawn at radius 32 and scaled down. Clicking it
          starts the countdown early. */}
      <g
        ref={earthRef}
        transform={`translate(${EARTH.x} ${EARTH.y}) scale(${EARTH_SCALE.toFixed(4)})`}
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
      >
        <circle r={R + 18} fill="transparent" />
        <circle r={R + 1.6} fill="none" stroke="rgb(var(--regolith) / 0.16)" strokeWidth={1.2} />
        <circle r={R} fill={OCEAN} />
        <g clipPath="url(#hero-earth)">
          <g transform={`translate(${-R} 0)`}>
            <g ref={stripRef} transform={`translate(${start.tx} 0)`}>
              {[0, STRIP].map((dx) => (
                <g key={dx} transform={`translate(${dx} 0)`} fill={LAND}>
                  {CONTINENTS.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </g>
              ))}
            </g>
            <g className="earth-clouds" fill="rgb(var(--regolith) / 0.55)">
              {[0, STRIP].map((dx) =>
                CLOUDS.map(([x, y, w]) => <rect key={`${dx}-${x}`} x={dx + x - w / 2} y={y - 0.9} width={w} height={1.8} rx={0.9} />),
              )}
            </g>
          </g>
          <ellipse cy={-R + 1.5} rx={11} ry={3.4} fill={STEEL} />
          <ellipse cy={R - 1.2} rx={13} ry={3} fill={STEEL} />
          <path d={night} fill="rgb(var(--night) / 0.55)" />
        </g>
        {/* The launch tower and its catch arms, standing at Starbase */}
        <g
          ref={towerRef}
          transform={`translate(${start.x.toFixed(2)} ${STARBASE[1]}) rotate(${start.deg.toFixed(2)})`}
          opacity={start.opacity}
          fill={TRIM}
        >
          <rect x={-7.4} y={-TOWER_H} width={2.3} height={TOWER_H + 0.8} />
          <rect x={-6.6} y={-TOWER_H - 2.5} width={0.6} height={2.6} />
          <rect ref={qdArmRef} x={-5.2} y={-23.5} width={ARM_QD} height={ARM_W} fill={STEEL_SHADE} />
        </g>
      </g>

      {/* Smoke and dust */}
      <g>
        {Array.from({ length: 44 }, (_, i) => (
          <circle
            key={i}
            ref={(el) => {
              puffRefs.current[i] = el;
            }}
            r={0}
            opacity={0}
          />
        ))}
      </g>

      {/* Super Heavy: origin at the engine skirt, nose up */}
      <g
        ref={boosterRef}
        transform={`translate(${startPad[0].toFixed(2)} ${startPad[1].toFixed(2)}) rotate(${start.deg.toFixed(2)}) scale(${SCALE_FAR.toFixed(3)})`}
        opacity={start.opacity}
      >
        <g ref={bFlameRef} opacity={0}>
          <path d={FLAME} fill={SIGNAL} />
          <path d={FLAME} fill={FLAME_CORE} />
        </g>
        <rect x={-2.8} y={-15} width={1.2} height={1.1} fill={TRIM} />
        <rect x={1.6} y={-15} width={1.2} height={1.1} fill={TRIM} />
        <rect x={-1.7} y={-15} width={3.4} height={15} fill={STEEL} />
        <rect x={-1.7} y={-15} width={1.1} height={15} fill={STEEL_SHADE} />
        <rect x={-1.85} y={-1.1} width={3.7} height={1.1} fill={TRIM} />
        <rect x={-1.7} y={-16.2} width={3.4} height={1.2} fill={TILES} />
      </g>

      {/* Starship: origin at the engines, heat shield on the dark side */}
      <g
        ref={shipRef}
        transform={`translate(${startShip[0].toFixed(2)} ${startShip[1].toFixed(2)}) rotate(${start.deg.toFixed(2)}) scale(${SCALE_FAR.toFixed(3)})`}
        opacity={start.opacity}
      >
        <g ref={sFlameRef} opacity={0}>
          <path d={FLAME} fill={SIGNAL} />
          <path d={FLAME} fill={FLAME_CORE} />
        </g>
        {/* A generous invisible target, so the little ship is easy to click on the moon */}
        <rect x={-6} y={-16} width={12} height={19} fill="transparent" />
        <path d="M-1.7-0.4L-3.1-1L-3.1-2.9L-1.7-4Z" fill={TRIM} />
        <path d="M1.7-0.4L3.1-1L3.1-2.9L1.7-4Z" fill={TRIM} />
        <path d="M-1.55-7L-2.6-7.6L-1.85-9.3Z" fill={TRIM} />
        <path d="M1.55-7L2.6-7.6L1.85-9.3Z" fill={TRIM} />
        <path d={SHIP_HULL} fill={STEEL} />
        <rect x={-2} y={-12} width={1.65} height={12.2} fill={TILES} clipPath="url(#hero-ship-hull)" />
      </g>

      {/* The catch arms, in front of the vehicles so they close across them; they ride up and down the tower */}
      <g
        ref={catchArmRef}
        transform={`translate(${startPad[0].toFixed(2)} ${startPad[1].toFixed(2)}) rotate(${start.deg.toFixed(2)}) scale(${EARTH_SCALE.toFixed(4)}) translate(0 ${-ARM_TOP})`}
        opacity={start.opacity}
        fill={STEEL_SHADE}
      >
        <rect x={-5.2} y={0} width={ARM_CATCH * 0.3} height={ARM_W} />
        <rect x={-5.2 + ARM_CATCH * 0.3 - 0.9} y={-2.2} width={0.9} height={2.4} />
      </g>

      {/* Hot staging */}
      <circle ref={flashRef} r={0} opacity={0} fill={SIGNAL} />

      {/* The glint as the ship vanishes towards Mars */}
      <g ref={glintRef} opacity={0} fill={FLAME_CORE}>
        <path d="M0-3L0.45-0.45L3 0L0.45 0.45L0 3L-0.45 0.45L-3 0L-0.45-0.45Z" />
        <circle r={0.7} fill="#FFFFFF" />
      </g>
    </svg>
  );
}
