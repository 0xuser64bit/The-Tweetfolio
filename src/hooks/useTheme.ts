import { useEffect, useState } from "react";

export type Theme = "lights-out" | "dim" | "light";

const THEME_KEY = "tweetfolio-theme";

export const DEFAULT_THEME: Theme = "lights-out";

const themeOrder: Theme[] = ["lights-out", "dim", "light"];

const isTheme = (value: string | null): value is Theme =>
  value !== null && (themeOrder as string[]).includes(value);

/**
 * Cycles the X-style theme and persists it.
 *
 * State starts at `DEFAULT_THEME` rather than reading `localStorage` during
 * render, because the same component tree is rendered at build time where no
 * storage exists. The stored preference is applied in an effect, matching what
 * the bootstrap script in `index.html` already put on <html> before first
 * paint — so there is no flash and no hydration mismatch.
 */
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (isTheme(saved)) setTheme(saved);
    } catch {
      // Storage unavailable (private mode, blocked cookies): keep the default.
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-lights-out", "theme-dim", "theme-light");
    root.classList.add(`theme-${theme}`);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Persisting is best-effort.
    }
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(theme);
    setTheme(themeOrder[(currentIndex + 1) % themeOrder.length]);
  };

  return { theme, cycleTheme };
};

export default useTheme;
