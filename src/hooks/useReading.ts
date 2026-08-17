import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { type CardData } from "../data/deck";
import { DEALT, deal, type FanTuning } from "../lib/fan";

export type Screen = "pick" | "shuffle" | "reveal";

interface State {
  screen: Screen;
  spread: number;
  amount: number;
  seed: number;
  fan: CardData[];
  picked: number[];
  flipped: number[];
  active: number | null;
}

const INITIAL: State = {
  screen: "pick",
  spread: 1,
  amount: 0,
  seed: 0,
  fan: [],
  picked: [],
  flipped: [],
  active: null,
};

/**
 * Run a state change as a view transition, so the cards keep their identity and
 * animate from the fan into their reveal slots. Browsers without the API — and
 * anyone who asked for less motion — just get the plain swap.
 */
function withViewTransition(update: () => void) {
  const start = document.startViewTransition?.bind(document);
  const stillMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!start || stillMotion) {
    update();
    return;
  }
  // flushSync so the DOM is already in its new state when the snapshot is taken
  start(() => flushSync(update));
}

const AUTO_STEP = 12;
const AUTO_TICK_MS = 90;
const DRAG_THRESHOLD = 6;
const MAX_DRAG_STEP = 9;

export function useReading(tuning: FanTuning) {
  const [state, setState] = useState<State>(INITIAL);
  const auto = useRef<number | null>(null);

  const stopAuto = useCallback(() => {
    if (auto.current !== null) {
      clearInterval(auto.current);
      auto.current = null;
    }
  }, []);

  useEffect(() => stopAuto, [stopAuto]);

  // Crossing the breakpoint mid-reading narrows the fan (9 cards → 7). Drop any
  // pick that no longer has a card under it rather than reveal a phantom.
  useEffect(() => {
    setState((s) =>
      s.picked.some((i) => i >= tuning.count)
        ? { ...s, picked: s.picked.filter((i) => i < tuning.count) }
        : s,
    );
  }, [tuning.count]);

  const start = useCallback(
    (spread: number) => {
      stopAuto();
      setState({ ...INITIAL, screen: "shuffle", spread, fan: deal(DEALT) });
    },
    [stopAuto],
  );

  /** Feed a pointer's horizontal travel into the shuffle. */
  const drag = useCallback(
    (travelled: number) => {
      if (travelled <= DRAG_THRESHOLD) return;
      stopAuto();
      setState((s) => ({
        ...s,
        amount: Math.min(
          100,
          s.amount + Math.min(MAX_DRAG_STEP, travelled * tuning.drag),
        ),
        seed: s.seed + 1,
      }));
    },
    [stopAuto, tuning.drag],
  );

  const autoShuffle = useCallback(() => {
    stopAuto();
    auto.current = window.setInterval(() => {
      setState((s) => {
        const amount = Math.min(100, s.amount + AUTO_STEP);
        if (amount >= 100) stopAuto();
        return { ...s, amount, seed: s.seed + 1 };
      });
    }, AUTO_TICK_MS);
  }, [stopAuto]);

  /** Choose a face-down card. Choosing a picked one puts it back. */
  const togglePick = useCallback((index: number) => {
    setState((s) => {
      if (s.amount < 100) return s;
      if (s.picked.includes(index)) {
        return { ...s, picked: s.picked.filter((i) => i !== index) };
      }
      if (s.picked.length >= s.spread) return s;
      return { ...s, picked: [...s.picked, index] };
    });
  }, []);

  const reveal = useCallback(() => {
    withViewTransition(() =>
      setState((s) =>
        s.picked.length === s.spread ? { ...s, screen: "reveal" } : s,
      ),
    );
  }, []);

  const flip = useCallback((index: number) => {
    setState((s) => ({
      ...s,
      flipped: s.flipped.includes(index) ? s.flipped : [...s.flipped, index],
      active: index,
    }));
  }, []);

  const back = useCallback(() => {
    stopAuto();
    setState((s) =>
      s.screen === "reveal"
        ? { ...s, screen: "shuffle" }
        : { ...INITIAL, screen: "pick" },
    );
  }, [stopAuto]);

  const restart = useCallback(() => {
    stopAuto();
    setState({ ...INITIAL });
  }, [stopAuto]);

  const isShuffled = state.amount >= 100;
  const isPicked = state.picked.length === state.spread;

  return {
    ...state,
    isShuffled,
    isPicked,
    remaining: state.spread - state.picked.length,
    /** The cards behind the slots you picked, in pick order. */
    reading: state.picked.map((i) => state.fan[i]),
    start,
    drag,
    autoShuffle,
    togglePick,
    reveal,
    flip,
    back,
    restart,
  };
}
