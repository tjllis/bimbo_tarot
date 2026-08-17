import styles from "./styles.module.css";

/**
 * The 3×3 dot pattern printed on every card back. Dot size comes from the
 * `--dot` custom property, so each surface sizes it from CSS.
 */
export default function CardBack() {
  return (
    <span className={styles.dots} aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} data-tone={i % 2 === 0 ? "2" : "1"} />
      ))}
    </span>
  );
}
