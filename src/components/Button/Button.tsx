import styles from "./styles.module.css";

interface Props {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  grow?: boolean;
}

export default function Button(props: Props) {
  return (
    <button
      className={styles.button}
      data-variant={props.variant ?? "ghost"}
      data-grow={props.grow ? "" : undefined}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
