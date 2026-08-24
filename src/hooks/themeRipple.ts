import { flushSync } from "react-dom";

export type RippleOrigin = { x: number; y: number };

export const RIPPLE_DURATION_MS = 720;

const RING_DELAYS_MS = [0, 110, 220] as const;

const WAVE_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";

type ViewTransitionLike = {
  ready: Promise<void>;
  finished: Promise<void>;
  skipTransition: () => void;
};

type PopoverElement = HTMLElement & {
  showPopover?: () => void;
  hidePopover?: () => void;
};

let activeTransition: ViewTransitionLike | null = null;
let activeLayer: HTMLElement | null = null;
let layerTimer = 0;

export const farthestViewportDistance = (
  origin: RippleOrigin,
  viewport: { width: number; height: number } = {
    width: window.innerWidth,
    height: window.innerHeight,
  },
): number => {
  const dx = Math.max(origin.x, viewport.width - origin.x);
  const dy = Math.max(origin.y, viewport.height - origin.y);
  return Math.hypot(dx, dy);
};

export const originFromElement = (element: Element): RippleOrigin => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const startViewTransition = (update: () => void): ViewTransitionLike | null => {
  const start = (
    document as Document & {
      startViewTransition?: (cb: () => void) => ViewTransitionLike;
    }
  ).startViewTransition;
  return typeof start === "function" ? start.call(document, update) : null;
};

const removeRippleLayer = (): void => {
  if (layerTimer) {
    window.clearTimeout(layerTimer);
    layerTimer = 0;
  }
  if (!activeLayer) return;
  const layer = activeLayer as PopoverElement;
  if (typeof layer.hidePopover === "function") {
    try {
      layer.hidePopover();
    } catch {
      // Already closed or not a popover.
    }
  }
  layer.remove();
  activeLayer = null;
};

const mountRippleLayer = (origin: RippleOrigin, radius: number): void => {
  removeRippleLayer();

  const layer: PopoverElement = document.createElement("div");
  layer.className = "theme-ripple-layer";
  layer.setAttribute("aria-hidden", "true");

  const splash = document.createElement("span");
  splash.className = "theme-ripple-splash";
  splash.style.left = `${origin.x}px`;
  splash.style.top = `${origin.y}px`;
  layer.append(splash);

  RING_DELAYS_MS.forEach((delay, index) => {
    const ring = document.createElement("span");
    ring.className = "theme-ripple-ring";
    ring.dataset.ring = String(index);
    ring.style.left = `${origin.x}px`;
    ring.style.top = `${origin.y}px`;
    ring.style.width = `${radius * 2}px`;
    ring.style.height = `${radius * 2}px`;
    ring.style.animationDelay = `${delay}ms`;
    layer.append(ring);
  });

  const usePopover = typeof layer.showPopover === "function";
  if (usePopover) layer.setAttribute("popover", "manual");

  document.body.append(layer);

  if (usePopover) {
    try {
      layer.showPopover?.();
    } catch {
      layer.removeAttribute("popover");
    }
  }

  activeLayer = layer;
  const lastDelay = RING_DELAYS_MS[RING_DELAYS_MS.length - 1];
  layerTimer = window.setTimeout(
    removeRippleLayer,
    RIPPLE_DURATION_MS + lastDelay + 80,
  );
};

const animateClip = (origin: RippleOrigin, radius: number): void => {
  try {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${origin.x}px ${origin.y}px)`,
          `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
        ],
      },
      {
        duration: RIPPLE_DURATION_MS,
        easing: WAVE_EASING,
        pseudoElement: "::view-transition-new(root)",
      },
    );
  } catch {
    // Pseudo-element animate is a progressive enhancement.
  }
};

/**
 * Applies a theme change as a circular wave from `origin`, like a stone
 * hitting water. Falls back to an instant swap when motion is reduced or
 * View Transitions are missing; rings still play in the latter case.
 */
export const applyThemeWithRipple = (
  origin: RippleOrigin | undefined,
  apply: () => void,
): void => {
  if (!origin || prefersReducedMotion()) {
    flushSync(apply);
    return;
  }

  const radius = farthestViewportDistance(origin);

  try {
    activeTransition?.skipTransition();
  } catch {
    // Previous transition already finished.
  }

  const root = document.documentElement;
  root.classList.add("theme-rippling");

  const vt = startViewTransition(() => {
    flushSync(apply);
  });

  if (!vt) {
    root.classList.remove("theme-rippling");
    flushSync(apply);
    mountRippleLayer(origin, radius);
    return;
  }

  activeTransition = vt;

  vt.ready
    .then(() => {
      if (activeTransition !== vt) return;
      mountRippleLayer(origin, radius);
      animateClip(origin, radius);
    })
    .catch(() => {
      // Transition skipped or aborted before it was ready.
    });

  vt.finished.finally(() => {
    if (activeTransition !== vt) return;
    activeTransition = null;
    root.classList.remove("theme-rippling");
  });
};
