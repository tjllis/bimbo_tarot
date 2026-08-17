import { useRef, useEffect } from "react";
import styles from "./styles.module.css";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  phase: number;
}

// function = global, can be called before definition, accesses this
function createStars(width: number, height: number, count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    opacity: Math.random(),
    speed: Math.random() * 0.6 + 0.2,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const = local, can't be called before definition, no this
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let stars: Star[] = [];

    const resize = () => {
      /** offset- = width & height calculated in browser,
       * width & height = size of a area that can be used for drawing
       * if not equal, img can be sqewed on resize
       */
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = createStars(canvas.width, canvas.height, 160);
    };

    const draw = (n: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // clear frame

      for (const star of stars) {
        // min = 0.15; Math.sin() = -1... 1; 0.5 + 0.5 * sin => 0... 1
        const opacity =
          0.15 +
          0.85 * (0.5 + 0.5 * Math.sin(n * 0.005 * star.speed + star.phase));
        ctx.beginPath();
        // draw a circle
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        // color it
        ctx.fillStyle = `rgba(255, 50, 255, ${opacity})`;
        ctx.fill();
      }
      id = requestAnimationFrame(draw); // loop the drawing
    };

    const obs = new ResizeObserver(resize);
    obs.observe(canvas);
    resize();
    id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
      obs.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.starCanvas}></canvas>;
}
