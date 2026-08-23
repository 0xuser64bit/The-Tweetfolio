/**
 * Canonical site metadata shared by every consumer: the browser bundle, the
 * build-time prerender/generator, and the Vercel Functions under `/api`.
 *
 * Nothing in `shared/` may touch `window`, `document`, or Node built-ins so it
 * stays importable from all three environments.
 */

export const ORIGIN = "https://user64bit.wtf";

export const SITE_NAME = "TweetFolio";

/** Canonical API prefix. Bump the version segment for breaking changes. */
export const API_BASE = "/api/v1";

/** Version of the JSON API contract described by `shared/openapi.ts`. */
export const API_VERSION = "1.0.0";

export const OPENAPI_PATH = "/openapi.json";

export const SITEMAP_PATH = "/sitemap.xml";

export const LLMS_PATH = "/llms.txt";

export const LLMS_FULL_PATH = "/llms-full.txt";

/** Resolve a site-relative path to an absolute URL. */
export const absolute = (path: string): string =>
  new URL(path, ORIGIN).toString();

export interface PageMeta {
  /** Request path an agent or browser asks for. */
  path: string;
  /** Path of the prerendered HTML file inside the build output. */
  htmlFile: string;
  /** Static Markdown alternate for this page. */
  markdownPath: string;
  title: string;
  description: string;
  priority: string;
}

/**
 * Every HTML page the site publishes. Drives the prerender loop, the sitemap,
 * the Markdown alternates, and the `Accept` negotiation routes in vercel.json.
 */
export const PAGES: PageMeta[] = [
  {
    path: "/",
    htmlFile: "index.html",
    markdownPath: "/index.md",
    title: "Arth Prajapati",
    description:
      "Arth Prajapati — Full-stack developer portfolio. Web3, AI, open source. Building at the intersection of code and crypto.",
    priority: "1.0",
  },
  {
    path: "/proof-of-work",
    htmlFile: "proof-of-work/index.html",
    markdownPath: "/proof-of-work.md",
    title: "Proof of Work — Arth Prajapati",
    description:
      "Every project Arth Prajapati has shipped, as a thread: Solana agents, MEV tooling, AI products, and full-stack apps.",
    priority: "0.8",
  },
];

export const pageForPath = (path: string): PageMeta | undefined => {
  const normalized =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return PAGES.find((page) => page.path === normalized);
};

export interface AgentResource {
  path: string;
  title: string;
  description: string;
  contentType: string;
}

/**
 * Machine-readable entry points advertised on the 404 page, in llms.txt, and in
 * the API index so an agent can always find its way from a dead end.
 */
export const AGENT_RESOURCES: AgentResource[] = [
  {
    path: LLMS_PATH,
    title: "llms.txt",
    description: "Curated index of this site for language models.",
    contentType: "text/plain; charset=utf-8",
  },
  {
    path: LLMS_FULL_PATH,
    title: "llms-full.txt",
    description: "Every page of this site concatenated as Markdown.",
    contentType: "text/plain; charset=utf-8",
  },
  {
    path: SITEMAP_PATH,
    title: "sitemap.xml",
    description: "All canonical HTML URLs.",
    contentType: "application/xml; charset=utf-8",
  },
  {
    path: OPENAPI_PATH,
    title: "openapi.json",
    description: "OpenAPI 3.1 description of the read-only JSON API.",
    contentType: "application/json; charset=utf-8",
  },
  {
    path: API_BASE,
    title: "JSON API index",
    description: "Machine-readable portfolio data with hypermedia links.",
    contentType: "application/json; charset=utf-8",
  },
];
