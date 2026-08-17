import type { Screen } from "../../hooks/useReading";
import styles from "./styles.module.css";

interface Props {
  screen: Screen;
  onBack?: () => void;
  /** Start over from the pick screen. Omit to make the title inert. */
  onHome?: () => void;
}

const STEPS: { screen: Screen; label: string }[] = [
  { screen: "pick", label: "1 pick" },
  { screen: "shuffle", label: "2 shuffle" },
  { screen: "reveal", label: "3 reveal" },
];

export default function AppHeader(props: Props) {
  // on the pick screen there is nowhere to go, so it stays plain text
  const isHome = props.screen === "pick";

  return (
    <header className={styles.header}>
      <div className={styles.side}>
        {props.onBack && (
          <button className={styles.back} onClick={props.onBack} aria-label="Back">
            ←
          </button>
        )}
      </div>

      <h1 className={styles.title}>
        {isHome || !props.onHome ? (
          "Bimbo Tarot"
        ) : (
          <button
            className={styles.home}
            onClick={props.onHome}
            aria-label="Bimbo Tarot — start a new reading"
          >
            Bimbo Tarot
          </button>
        )}
      </h1>

      {/* desktop only — the phone header has no room for it */}
      <div className={styles.side} data-steps>
        <ol className={styles.steps}>
          {STEPS.map((step) => (
            <li
              key={step.screen}
              className={styles.step}
              data-current={step.screen === props.screen ? "" : undefined}
              aria-current={step.screen === props.screen ? "step" : undefined}
            >
              {step.label}
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
