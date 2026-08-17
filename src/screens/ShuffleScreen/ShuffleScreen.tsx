import { useRef, type PointerEvent } from "react";
import Button from "../../components/Button/Button";
import CardBack from "../../components/CardBack/CardBack";
import { fanLayout, type FanTuning } from "../../lib/fan";
import styles from "./styles.module.css";

interface Props {
  amount: number;
  seed: number;
  spread: number;
  picked: number[];
  isShuffled: boolean;
  isPicked: boolean;
  remaining: number;
  tuning: FanTuning;
  isDesktop: boolean;
  onDrag: (travelled: number) => void;
  onAutoShuffle: () => void;
  onPick: (index: number) => void;
  onReveal: () => void;
}

function title(p: Props) {
  if (!p.isShuffled) return "shuffle it out";
  return p.isPicked ? "you're ready, bestie" : "pick a card, bestie";
}

function subtitle(p: Props) {
  const tap = p.isDesktop ? "click" : "tap";

  if (!p.isShuffled) {
    return p.isDesktop
      ? "drag across the deck until the bar fills 💗"
      : "drag across the cards until the bar fills 💗";
  }
  if (p.isPicked) return "the deck has spoken. no take-backs.";
  return p.spread === 1
    ? `${tap} the one that's calling your name`
    : `${tap} ${p.remaining} more — trust the hand`;
}

export default function ShuffleScreen(props: Props) {
  const lastX = useRef<number | null>(null);
  const slots = fanLayout(props.amount, props.seed, props.picked, props.tuning);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    lastX.current = e.clientX;
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (lastX.current === null || props.isShuffled) return;
    const travelled = Math.abs(e.clientX - lastX.current);
    lastX.current = e.clientX;
    props.onDrag(travelled);
  };

  const endDrag = () => {
    lastX.current = null;
  };

  return (
    <div className={styles.screen}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>{title(props)}</h2>
        <p className={styles.sub}>{subtitle(props)}</p>
      </div>

      <div
        className={styles.fan}
        data-pickable={props.isShuffled ? "" : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {slots.map((slot, i) => {
          const isPicked = props.picked.includes(i);

          return (
            <button
              key={i}
              className={styles.card}
              aria-label={`Card ${i + 1}`}
              aria-pressed={isPicked}
              disabled={!props.isShuffled}
              onClick={() => props.onPick(i)}
              style={{
                transform: `translate(${slot.x}px, ${slot.y}px) rotate(${slot.rotate}deg)`,
                borderWidth: `${slot.borderWidth}px`,
                boxShadow: `0 0 ${slot.glow}px var(--glow)`,
                viewTransitionName: isPicked ? `card-${i}` : undefined,
              }}
            >
              <CardBack />
            </button>
          );
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.meter}>
          <div
            className={styles.meterFill}
            style={{ width: `${props.amount}%` }}
          />
        </div>

        <div className={styles.actions}>
          {props.isShuffled ? (
            <Button
              label="Reveal my reading ✨"
              variant="primary"
              disabled={!props.isPicked}
              onClick={props.onReveal}
            />
          ) : (
            <Button
              label="shuffle for me, I'm tired"
              onClick={props.onAutoShuffle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
