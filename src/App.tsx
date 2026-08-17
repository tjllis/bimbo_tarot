import AppHeader from "./components/AppHeader/AppHeader";
// import StarField from "./components/StarField/StarField";
import { DESKTOP_QUERY, useMediaQuery } from "./hooks/useMediaQuery";
import { useReading } from "./hooks/useReading";
import { DESKTOP_FAN, PHONE_FAN } from "./lib/fan";
import PickScreen from "./screens/PickScreen/PickScreen";
import RevealScreen from "./screens/RevealScreen/RevealScreen";
import ShuffleScreen from "./screens/ShuffleScreen/ShuffleScreen";
import styles from "./App.module.css";
import StarCanvas from "./components/StarCanvas/StarCanvas";

export default function App() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const tuning = isDesktop ? DESKTOP_FAN : PHONE_FAN;
  const reading = useReading(tuning);

  return (
    <div className={styles.app}>
      <StarCanvas />

      <div className={styles.screen}>
        <AppHeader
          screen={reading.screen}
          onBack={reading.screen === "pick" ? undefined : reading.back}
          onHome={reading.restart}
        />

        {reading.screen === "pick" && <PickScreen onStart={reading.start} />}

        {reading.screen === "shuffle" && (
          <ShuffleScreen
            amount={reading.amount}
            seed={reading.seed}
            spread={reading.spread}
            picked={reading.picked}
            isShuffled={reading.isShuffled}
            isPicked={reading.isPicked}
            remaining={reading.remaining}
            tuning={tuning}
            isDesktop={isDesktop}
            onDrag={reading.drag}
            onAutoShuffle={reading.autoShuffle}
            onPick={reading.togglePick}
            onReveal={reading.reveal}
          />
        )}

        {reading.screen === "reveal" && (
          <RevealScreen
            spread={reading.spread}
            reading={reading.reading}
            picked={reading.picked}
            flipped={reading.flipped}
            active={reading.active}
            isDesktop={isDesktop}
            onFlip={reading.flip}
            onRestart={reading.restart}
          />
        )}
      </div>
    </div>
  );
}
