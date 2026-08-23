/**
 * Content negotiation for the HTML pages.
 *
 * `vercel.json` routes a page request here (before the static filesystem check)
 * whenever the `Accept` header is something a plain static file cannot answer
 * correctly — it mentions `text/markdown`, or it excludes every type this site
 * can produce. Ordinary browser requests never reach this function; they are
 * served the prerendered HTML straight from the CDN.
 *
 * Implements the acceptmarkdown.com contract:
 *   - `Accept` is parsed per RFC 9110 (q-values, specificity, `q=0`) rather than
 *     substring-matched, so `text/markdown;q=0, text/html` correctly yields HTML;
 *   - Markdown responses carry `Content-Type: text/markdown; charset=utf-8`;
 *   - every response carries `Vary: Accept, Accept-Encoding`;
 *   - a genuinely unsatisfiable `Accept` gets `406` with a body listing the
 *     available representations (RFC 9110 §15.5.7).
 */

import { PATH_PARAM } from "../shared/api";
import { markdownForPath } from "../shared/markdown";
import {
  HTML_TYPE,
  MARKDOWN_TYPE,
  negotiate,
  notAcceptableBody,
  varyHeaders,
} from "../shared/negotiate";
import { pageForPath } from "../shared/site";

/** HTML first: it is the default when the client expresses no preference. */
const PRODUCES = [HTML_TYPE, MARKDOWN_TYPE] as const;

const CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

/**
 * Canonical page path the client asked for.
 *
 * A function reached through a rewrite observes the destination path, so
 * `vercel.json` forwards the original path in a `path` query parameter.
 */
export const resolvePath = (request: Request): string => {
  const url = new URL(request.url);
  const forwarded = url.searchParams.get(PATH_PARAM);
  if (forwarded === null) return url.pathname;
  if (forwarded === "" || forwarded === "/") return "/";
  return forwarded.startsWith("/") ? forwarded : `/${forwarded}`;
};

/** Handle the request. Exported separately so tests can inject a fetcher. */
export const handlePageRequest = async (
  request: Request,
  fetchHtml: (htmlPath: string, request: Request) => Promise<Response>,
): Promise<Response> => {
  const accept = request.headers.get("accept");
  const path = resolvePath(request);
  const page = pageForPath(path);

  if (!page) {
    // vercel.json only routes known page paths here.
    return new Response(null, {
      status: 404,
      headers: varyHeaders(),
    });
  }

  const { mediaType } = negotiate(accept, PRODUCES);

  if (mediaType === null) {
    return new Response(notAcceptableBody(PRODUCES, accept), {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        ...varyHeaders(),
      },
    });
  }

  if (mediaType === HTML_TYPE) {
    // The client mentioned Markdown (or another type) but ranked HTML higher.
    // Serve the same prerendered document the CDN would have, re-fetched by its
    // explicit file path so the negotiation route cannot match a second time.
    try {
      const upstream = await fetchHtml(`/${page.htmlFile}`, request);
      if (upstream.ok) {
        const headers = new Headers(upstream.headers);
        headers.set("Content-Type", `${HTML_TYPE}; charset=utf-8`);
        headers.set("Cache-Control", CACHE_CONTROL);
        for (const [key, value] of Object.entries(varyHeaders())) {
          headers.set(key, value);
        }
        return new Response(request.method === "HEAD" ? null : upstream.body, {
          status: 200,
          headers,
        });
      }
    } catch {
      // Fall through to Markdown below.
    }
    // Serving Markdown is a better failure mode than a 5xx: the client said it
    // accepts Markdown too (that is why this route matched at all).
  }

  const body = markdownForPath(path);
  if (body === undefined) {
    return new Response(null, { status: 404, headers: varyHeaders() });
  }

  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: {
      "Content-Type": `${MARKDOWN_TYPE}; charset=utf-8`,
      "Cache-Control": CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
      "Access-Control-Allow-Origin": "*",
      // RFC 9110 §8.7: name the specific variant that was selected. Uses a
      // distinct header from `vercel.json`'s `Link`, so neither overwrites the
      // other at the edge.
      "Content-Location": page.markdownPath,
      ...varyHeaders(),
    },
  });
};

/** Fetch the prerendered HTML from this same deployment. */
const fetchHtmlFromOrigin = (
  htmlPath: string,
  request: Request,
): Promise<Response> =>
  fetch(new URL(htmlPath, request.url), {
    headers: { Accept: HTML_TYPE },
    redirect: "follow",
  });

// Edge is declared here, not in vercel.json (`functions.runtime` is for community runtimes).
export const config = { runtime: "edge" };

export default function handler(request: Request): Promise<Response> {
  return handlePageRequest(request, fetchHtmlFromOrigin);
}
