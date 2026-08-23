/**
 * Site-wide 404 handler.
 *
 * `vercel.json` routes every request that matched no static file and no API
 * route here, so unknown paths get a real HTTP 404 instead of a 200 with the
 * SPA shell. The body is negotiated: Markdown for agents (with links to the
 * sitemap, llms.txt, and the OpenAPI document), JSON for API clients, and the
 * prerendered `404.html` design for browsers.
 */

import { PATH_PARAM } from "../shared/api";
import { renderNotFoundMarkdown } from "../shared/markdown";
import { renderNotFoundHtml } from "../shared/not-found-page";
import {
  NO_CACHE,
  errorBody,
  html,
  json,
  markdown,
  plainText,
  stripBodyForHead,
} from "../shared/http";
import {
  HTML_TYPE,
  JSON_TYPE,
  MARKDOWN_TYPE,
  negotiate,
  notAcceptableBody,
} from "../shared/negotiate";
import { AGENT_RESOURCES, ORIGIN, absolute } from "../shared/site";

const PRODUCES = [MARKDOWN_TYPE, HTML_TYPE, JSON_TYPE] as const;

/**
 * Requests from a browser navigation get the designed page; everything else
 * defaults to Markdown, which is the most useful representation for an agent.
 */
const defaultFor = (request: Request): string =>
  request.headers.get("sec-fetch-mode") === "navigate" ||
  (request.headers.get("accept") ?? "").includes(HTML_TYPE)
    ? HTML_TYPE
    : MARKDOWN_TYPE;

/** Path the client originally asked for, as forwarded by `vercel.json`. */
export const requestedPath = (request: Request): string => {
  const url = new URL(request.url);
  const forwarded = url.searchParams.get(PATH_PARAM);
  if (forwarded === null) return url.pathname;
  return forwarded.startsWith("/") ? forwarded : `/${forwarded}`;
};

export const handleNotFound = (request: Request): Response => {
  const accept = request.headers.get("accept");
  const path = requestedPath(request);

  // Reorder so the client's implicit default wins ties.
  const produces =
    defaultFor(request) === HTML_TYPE
      ? [HTML_TYPE, MARKDOWN_TYPE, JSON_TYPE]
      : [MARKDOWN_TYPE, HTML_TYPE, JSON_TYPE];

  const { mediaType } = negotiate(accept, produces);

  if (mediaType === null) {
    // The resource does not exist, so there is nothing to negotiate: 404 beats
    // 406 here. Answering 406 would also make
    // `curl -o /dev/null -w "%{http_code}"` print a non-404 for clients like
    // an image crawler (`Accept: image/png`) probing a missing asset.
    return stripBodyForHead(
      request,
      plainText(
        `404 Not Found: ${path}\n\n${notAcceptableBody(PRODUCES, accept)}`,
        { status: 404 },
      ),
    );
  }

  if (mediaType === JSON_TYPE) {
    const body = errorBody(
      "not_found",
      404,
      `No resource at "${path}" on ${ORIGIN}.`,
      `Discover what exists at ${absolute("/sitemap.xml")}, ${absolute("/llms.txt")}, or ${absolute("/openapi.json")}.`,
    );
    return stripBodyForHead(
      request,
      json(
        { ...body, resources: AGENT_RESOURCES },
        { status: 404, cacheControl: NO_CACHE },
      ),
    );
  }

  if (mediaType === HTML_TYPE) {
    return stripBodyForHead(
      request,
      html(renderNotFoundHtml(), { status: 404, cacheControl: NO_CACHE }),
    );
  }

  return stripBodyForHead(
    request,
    markdown(renderNotFoundMarkdown(path), {
      status: 404,
      cacheControl: NO_CACHE,
    }),
  );
};

export const config = { runtime: "edge" };
export default function(request: Request): Response | Promise<Response> {
    return handleNotFound(request);
}
