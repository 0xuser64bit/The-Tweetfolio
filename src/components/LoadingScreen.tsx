import React, { useEffect, useId, useState } from "react";
import PROFILE_IMAGE from "../assets/profile.jpg";

interface Props {
  onLoadingComplete: () => void;
}

/** Square profile loader: gold border draws 0% → 100% around the avatar. */
const Spinner = () => {
  const uid = useId();
  const gradientId = `${uid}-loader-gold`;
  const glowId = `${uid}-loader-glow`;

  return (
    <div
      className="flex flex-col items-center gap-5"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <div className="relative h-24 w-24">
        {/* Avatar */}
        <div className="absolute inset-[4px] rounded-[12px] overflow-hidden bg-x-primary shadow-[0_0_18px_rgba(205,129,5,0.25)]">
          <img
            src={PROFILE_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Square border progress ring */}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 96 96"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="8"
              y1="8"
              x2="88"
              y2="88"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#f9e87f" />
              <stop offset="0.45" stopColor="#e2b719" />
              <stop offset="1" stopColor="#cb7b00" />
            </linearGradient>
            <filter
              id={glowId}
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dim track (full square border) */}
          <rect
            x="3"
            y="3"
            width="90"
            height="90"
            rx="14"
            ry="14"
            fill="none"
            stroke="rgba(226, 183, 25, 0.28)"
            strokeWidth="3"
          />

          {/* Progress stroke: pathLength 100 → dashoffset 100→0 = 0%→100% */}
          <rect
            x="3"
            y="3"
            width="90"
            height="90"
            rx="14"
            ry="14"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100}
            filter={`url(#${glowId})`}
            className="square-border-loader"
          />
        </svg>
      </div>
    </div>
  );
};

const LoadingScreen: React.FC<Props> = ({ onLoadingComplete }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const readyPromises: Promise<unknown>[] = [
      // Wait for fonts to be ready.
      document.fonts?.ready ?? Promise.resolve(),
      // Wait for the profile image to load.
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = PROFILE_IMAGE;
      }),
    ];

    // Keep the square border progress on-screen for one full 0→100% cycle.
    const minDisplay = new Promise<void>((resolve) =>
      setTimeout(resolve, 1350),
    );
    // Hard cap so a stalled font/image never blocks forever.
    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 4000));

    Promise.race([
      Promise.all([Promise.all(readyPromises), minDisplay]),
      timeout,
    ]).then(() => {
      if (cancelled) return;
      setHidden(true);
      // small delay for the fade-out before unmounting
      setTimeout(() => !cancelled && onLoadingComplete(), 200);
    });

    return () => {
      cancelled = true;
    };
  }, [onLoadingComplete]);

  return (
    <div
      className={`loading-overlay fixed inset-0 z-[80] items-center justify-center bg-x-primary motion-safe:transition-opacity motion-safe:duration-200 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
