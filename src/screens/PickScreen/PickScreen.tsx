import styles from "./styles.module.css";

interface Props {
  onStart: (spread: number) => void;
}

const READINGS = [
  {
    spread: 1,
    emoji: "✨",
    name: "One Card Pull",
    blurb: "daily vibe check from the universe",
  },
  {
    spread: 3,
    emoji: "💋",
    name: "Three Card Spread",
    blurb: "situationship · current era · villain arc",
  },
];

export default function PickScreen(props: Props) {
  return (
    <div className={styles.screen}>
      <div className={styles.intro}>
        <span className={styles.orb}>🔮</span>
        <h2 className={styles.heading}>pick a reading</h2>
        <p className={styles.sub}>the cosmos already knows your business, bestie</p>
      </div>

      <div className={styles.options}>
        {READINGS.map((r) => (
          <button
            key={r.spread}
            className={styles.option}
            onClick={() => props.onStart(r.spread)}
          >
            <span className={styles.optionEmoji}>{r.emoji}</span>
            <span className={styles.optionText}>
              <span className={styles.optionName}>{r.name}</span>
              <span className={styles.optionBlurb}>{r.blurb}</span>
            </span>
          </button>
        ))}
      </div>

      <p className={styles.footnote}>not financial advice 💅</p>
    </div>
  );
}
