import { useEffect, useState } from "react";

/**
 * Tracks which #section-* element is closest to the top of the viewport
 * (or fully in view). Used to drive active state on the left sidebar,
 * profile tabs, and bottom nav so all three stay in sync as the user scrolls.
 */
const useActiveSection = (sectionIds: string[], rootMargin = "-40% 0px -55% 0px"): string => {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // pick the entry with the smallest distance to top of viewport
          const top = visible.reduce((prev, curr) =>
            curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev,
          );
          setActive(top.target.id);
        }
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
};

export default useActiveSection;
