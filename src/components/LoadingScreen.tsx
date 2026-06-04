import React, { useEffect, useState } from "react";
import PROFILE_IMAGE from "../assets/profile.jpg";

interface Props {
  onLoadingComplete: () => void;
}

const Spinner = () => (
  <div className="flex flex-col items-center gap-5" role="status" aria-live="polite">
    <span className="sr-only">Loading…</span>
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute -inset-1.5 w-26 h-26 rounded-full border-2 border-x-border border-t-x-accent animate-spin"
      />
      <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-x-border bg-x-secondary">
        <img
          src={PROFILE_IMAGE}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
);

export const SuspenseLoader = () => (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-x-primary">
    <Spinner />
  </div>
);

const LoadingScreen: React.FC<Props> = ({ onLoadingComplete }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const readyPromises: Promise<unknown>[] = [
      // Wait for fonts to be ready (or 1.5s timeout fallback).
      document.fonts?.ready ?? Promise.resolve(),
      // Wait for the profile image to load (or 1.5s timeout fallback).
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = PROFILE_IMAGE;
      }),
    ];

    const timeout = new Promise<void>((resolve) => setTimeout(resolve, 1500));

    Promise.race([Promise.all(readyPromises), timeout]).then(() => {
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
      className={`fixed inset-0 z-[80] flex items-center justify-center bg-x-primary motion-safe:transition-opacity motion-safe:duration-200 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
