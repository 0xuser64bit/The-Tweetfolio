import { useEffect, useRef, useState } from "react";

/**
 * Signature cover — a canvas-based "signal wave" that represents the builder's
 * pulse. Two flowing sine waves (gold + accent) drift across a dark gradient
 * with a blueprint grid. Lightweight, theme-aware, and respects reduced motion.
 */
const Cover = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationId = 0;
    let running = true;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      yOffset: number,
      lineWidth: number,
      alpha: number,
    ) => {
      const rect = canvas.getBoundingClientRect();
      const { width, height } = rect;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.globalAlpha = alpha;

      for (let x = 0; x <= width; x += 3) {
        const y =
          height * yOffset +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7) * amplitude * 0.4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const draw = () => {
      if (!running) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const colors = getComputedStyle(document.documentElement);
      const gold = colors.getPropertyValue("--color-x-gold").trim() || "#e2b719";
      const accent =
        colors.getPropertyValue("--color-accent").trim() || "#1d9bf0";

      drawWave(18, 0.018, 0.018, gold, 0.45, 1.5, 0.55);
      drawWave(12, 0.012, 0.012, accent, 0.6, 1, 0.3);
      drawWave(24, 0.025, 0.01, gold, 0.3, 0.75, 0.2);

      time += 1;
      animationId = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const colors = getComputedStyle(document.documentElement);
      const gold = colors.getPropertyValue("--color-x-gold").trim() || "#e2b719";
      const accent =
        colors.getPropertyValue("--color-accent").trim() || "#1d9bf0";

      drawWave(18, 0.018, 0, gold, 0.45, 1.5, 0.55);
      drawWave(12, 0.012, 0, accent, 0.6, 1, 0.3);
    };

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open cover photo"
        className="group relative block w-full aspect-[3/1] overflow-hidden focus:outline-none"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-x-primary via-x-secondary to-x-primary" />
        {/* Blueprint grid */}
        <div className="absolute inset-0 texture-grid opacity-[0.12]" />
        {/* Canvas signal wave */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
        {/* Hover hint */}
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="meta-mono text-x-text-secondary bg-x-primary/60 backdrop-blur-sm px-2 py-1 rounded">
            signal
          </span>
        </div>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cover photo"
          className="fixed inset-0 z-[60] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/85"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 max-w-6xl w-full p-4">
            <div className="relative aspect-[3/1] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-x-primary via-x-secondary to-x-primary" />
              <div className="absolute inset-0 texture-grid opacity-[0.12]" />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              />
            </div>
            <p className="meta-mono text-x-text-secondary text-center mt-3">
              the builder's signal — a live waveform, always in motion
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Cover;
