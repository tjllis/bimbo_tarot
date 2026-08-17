import { CARDS, type CardData } from "../data/deck";

/** Cards dealt up front — the widest fan any layout shows. */
export const DEALT = 9;

export interface FanTuning {
  /** How many of the dealt cards this layout puts on the table. */
  count: number;
  /** Horizontal gap between neighbours, before and per point of shuffle. */
  spreadBase: number;
  spreadGain: number;
  /** How much of a drag's travel counts towards the shuffle. */
  drag: number;
  /** Scatter, as [settled, mid-shuffle] pairs. */
  jitterX: [number, number];
  jitterY: [number, number];
  jitterRotate: [number, number];
  /** Per-card arc away from the middle of the fan. */
  stepY: number;
  stepRotate: number;
  /** How far a picked card rises out of the fan. */
  lift: number;
  /** Halo radius, as [resting, picked]. */
  glow: [number, number];
}

/** Phone: seven cards, a tight arc that stays inside a 390px screen. */
export const PHONE_FAN: FanTuning = {
  count: 7,
  spreadBase: 20,
  spreadGain: 0.13,
  drag: 0.5,
  jitterX: [5, 20],
  jitterY: [4, 20],
  jitterRotate: [3, 22],
  stepY: 7,
  stepRotate: 7,
  lift: 34,
  glow: [22, 40],
};

/** Desktop: nine bigger cards, opened right across the table. */
export const DESKTOP_FAN: FanTuning = {
  count: 9,
  spreadBase: 42,
  spreadGain: 0.5,
  drag: 0.4,
  jitterX: [8, 34],
  jitterY: [6, 26],
  jitterRotate: [3, 20],
  stepY: 9,
  stepRotate: 5,
  lift: 48,
  glow: [26, 60],
};

/** Draw `count` distinct cards from the deck. */
export function deal(count: number): CardData[] {
  const pool = [...CARDS];
  const out: CardData[] = [];

  for (let i = 0; i < count && pool.length > 0; i++) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

/**
 * Deterministic -0.5…0.5 wobble. The same (index, seed) always yields the same
 * number, so a re-render never re-scatters the fan — only a bumped seed does.
 */
function wobble(index: number, seed: number): number {
  const n = Math.sin((index + 1) * 12.9898 + seed * 1.7) * 43758.5453;
  return n - Math.floor(n) - 0.5;
}

export interface FanSlot {
  x: number;
  y: number;
  rotate: number;
  borderWidth: number;
  glow: number;
}

/**
 * Where each face-down card sits. The spread opens as `amount` climbs, and the
 * scatter collapses once the shuffle is done, so the deck settles into a clean
 * fan that still fits the screen it was tuned for.
 */
export function fanLayout(
  amount: number,
  seed: number,
  picked: number[],
  tuning: FanTuning,
): FanSlot[] {
  const settled = amount >= 100 ? 0 : 1;
  const spread = tuning.spreadBase + amount * tuning.spreadGain;
  const middle = (tuning.count - 1) / 2;

  return Array.from({ length: tuning.count }, (_, i) => {
    const w = wobble(i, seed);
    const offset = i - middle;
    const isPicked = picked.includes(i);

    return {
      x: offset * spread + w * tuning.jitterX[settled],
      y:
        Math.abs(offset) * tuning.stepY +
        w * tuning.jitterY[settled] -
        (isPicked ? tuning.lift : 0),
      rotate: offset * tuning.stepRotate + w * tuning.jitterRotate[settled],
      borderWidth: isPicked ? 3 : 1.5,
      glow: isPicked ? tuning.glow[1] : tuning.glow[0],
    };
  });
}
