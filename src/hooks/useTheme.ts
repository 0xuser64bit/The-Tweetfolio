import { useEffect, useRef, useState } from "react";

export type Theme = "lights-out" | "dim" | "light";

const THEME_KEY = "tweetfolio-theme";

export const DEFAULT_THEME: Theme = "lights-out";

const themeOrder: Theme[] = ["lights-out", "dim", "light"];

const THEME_COLOR: Record<Theme, string> = {
  "lights-out": "#000000",
  dim: "#15202b",
  light: "#ffffff",
};

const isTheme = (value: string | null): value is Theme =>
  value !== null && (themeOrder as string[]).includes(value);

export const nextTheme = (theme: Theme): Theme =>
  themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];

/**
 * Writes the palette onto <html> immediately so a view-transition callback
 * can snapshot the new colors in the same turn, not after React's effect flush.
 */
export const applyThemeClass = (theme: Theme): void => {
  const root = document.documentElement;
  root.classList.remove("theme-lights-out", "theme-dim", "theme-light");
  root.classList.add(`theme-${theme}`);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
};

const persistTheme = (theme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Persisting is best-effort.
  }
};

const readStoredTheme = (): Theme | null => {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    return isTheme(saved) ? saved : null;
  } catch {
    return null;
  }
};

/**
 * Cycles the X-style theme and persists it.
 *
 * State starts at `DEFAULT_THEME` rather than reading `localStorage` during
 * render, because the same component tree is rendered at build time where no
 * storage exists. The stored preference is applied in an effect, matching what
 * the bootstrap script in `index.html` already put on <html> before first
 * paint — so there is no flash and no hydration mismatch.
 *
 * Palette class changes run synchronously inside `cycleTheme` so callers can
 * wrap them in `document.startViewTransition`.
 */
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const themeRef = useRef<Theme>(theme);
  themeRef.current = theme;

  useEffect(() => {
    const saved = readStoredTheme();
    if (!saved) return;
    themeRef.current = saved;
    applyThemeClass(saved);
    setTheme(saved);
  }, []);

  const cycleTheme = () => {
    const next = nextTheme(themeRef.current);
    themeRef.current = next;
    applyThemeClass(next);
    persistTheme(next);
    setTheme(next);
  };

  return { theme, cycleTheme };
};

export default useTheme;
