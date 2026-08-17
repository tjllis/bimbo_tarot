import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import CardBack from "../../components/CardBack/CardBack";
import { POSITIONS, type CardData } from "../../data/deck";
import { readingUrl } from "../../lib/permalink";
import styles from "./styles.module.css";

interface Props {
  spread: number;
  reading: CardData[];
  picked: number[];
  flipped: number[];
  active: number | null;
  isDesktop: boolean;
  onFlip: (index: number) => void;
  onRestart: () => void;
}

const HOLDING = "the universe is holding. flip a card when you can handle it.";

export default function RevealScreen(props: Props) {
  const [shared, setShared] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  const isThree = props.spread === 3;
  const allFlipped = props.picked.every((i) => props.flipped.includes(i));
  const activeSlot =
    props.active !== null && props.flipped.includes(props.active)
      ? props.picked.indexOf(props.active)
      : -1;
  const activeCard = activeSlot >= 0 ? props.reading[activeSlot] : undefined;

  /** A three-card spread reads each card for its position; one card reads general. */
  const readingFor = (card: CardData, slot: number) =>
    isThree ? card[POSITIONS[slot].key] : card.general;

  const detailLabel = activeCard
    ? isThree
      ? `your ${POSITIONS[activeSlot].label}`
      : "today's vibe"
    : props.isDesktop
      ? "flip a card, bestie"
      : "tap a card, bestie";

  const share = () => {
    const cards = props.reading.map(
      (c, i) => `${c.name} — ${readingFor(c, i)}`,
    );
    const text = isThree
      ? [
          "The cards have spoken. Here's my reading:",
          ...cards.map((card, i) => `${POSITIONS[i].share}: ${card}`),
        ].join("\n")
      : `The cards have spoken. Here's my card of the day:\n${cards[0]}`;

    // a link back to this exact spread, so they see the cards, not a retelling
    const url = readingUrl(props.reading);

    // phones have a real share sheet; on desktop it's a worse clipboard
    if (!props.isDesktop && navigator.share) {
      void navigator.share({ text, url }).catch(() => {});
      return;
    }

    void navigator.clipboard?.writeText(`${text}\n${url}`).catch(() => {});
    setShared(true);
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShared(false), 1800);
  };

  return (
    <div className={styles.screen}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>
          {allFlipped
            ? "your reading"
            : props.isDesktop
              ? "click to flip"
              : "tap to flip"}
        </h2>
        <p className={styles.sub}>
          {isThree ? "three cards, zero mercy" : "one card, full honesty"}
        </p>
      </div>

      <div className={styles.spread} data-three={isThree ? "" : undefined}>
        {props.reading.map((card, slot) => {
          const index = props.picked[slot];
          const isFlipped = props.flipped.includes(index);

          return (
            <div key={index} className={styles.slot}>
              <span className={styles.slotLabel}>
                {isThree ? POSITIONS[slot].label : ""}
              </span>
              <div
                className={styles.cardFrame}
                style={{ viewTransitionName: `card-${index}` }}
              >
                <button
                  className={styles.flipper}
                  data-flipped={isFlipped ? "" : undefined}
                  data-lifted={
                    isFlipped && props.active === index ? "" : undefined
                  }
                  aria-label={isFlipped ? card.name : "Flip card"}
                  onClick={() => props.onFlip(index)}
                >
                  <span className={styles.face} data-side="back">
                    <CardBack />
                  </span>
                  <span className={styles.face} data-side="front">
                    <span className={styles.faceNum}>{card.num}</span>
                    <span className={styles.faceEmoji}>{card.emoji}</span>
                    <span className={styles.faceName}>{card.name}</span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.detail}>
        <span className={styles.detailLabel}>{detailLabel}</span>
        <p className={styles.detailText}>
          {activeCard ? readingFor(activeCard, activeSlot) : HOLDING}
        </p>
      </div>

      <div className={styles.actions}>
        {/* nothing to share until the cards are actually face up */}
        <Button
          label={shared ? "copied to the group chat ✓" : "share this 💌"}
          variant="primary"
          grow
          disabled={!allFlipped}
          onClick={share}
        />
        <Button label="again" onClick={props.onRestart} />
      </div>
    </div>
  );
}
