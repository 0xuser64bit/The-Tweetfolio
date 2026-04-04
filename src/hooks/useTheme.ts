import { useState, useEffect } from "react";

type Theme = "lights-out" | "dim" | "light";

const THEME_KEY = "tweetfolio-theme";

const themeOrder: Theme[] = ["lights-out", "dim", "light"];

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return (saved as Theme) || "lights-out";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-lights-out", "theme-dim", "theme-light");
    root.classList.add(`theme-${theme}`);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return { theme, cycleTheme };
};

export default useTheme;
