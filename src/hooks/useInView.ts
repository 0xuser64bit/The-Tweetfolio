import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Returns a `className` instead of raw opacity/transform utilities so the
 * hidden state can live behind the `.js` gate in `index.css`. Without
 * JavaScript the element is visible immediately, which keeps the prerendered
 * HTML readable to crawlers, and the returned markup is identical on the
 * server and the client so hydration stays clean.
 */
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    isInView,
    className: isInView ? "reveal reveal--visible" : "reveal",
  };
};

export default useInView;
