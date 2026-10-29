import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absolute, pageForPath } from "../../../shared/site";

const RouteEffects = ({ ready }: { ready: boolean }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const page = pageForPath(pathname);
    if (!page) return;
    document.title = page.title;
    for (const [selector, value] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', page.title],
      ['meta[property="og:description"]', page.description],
      ['meta[property="og:url"]', absolute(page.path)],
      ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
    ]) {
      document.querySelector(selector)?.setAttribute("content", value);
    }
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", absolute(page.path));
    document
      .querySelector('link[rel="alternate"][type="text/markdown"]')
      ?.setAttribute("href", absolute(page.markdownPath));
  }, [pathname]);

  useEffect(() => {
    if (!ready) return;
    const frame = requestAnimationFrame(() => {
      let targetId = hash.slice(1);
      try {
        targetId = decodeURIComponent(targetId);
      } catch {}
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        target.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, ready]);

  return null;
};

export default RouteEffects;
