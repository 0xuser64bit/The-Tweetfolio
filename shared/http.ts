/**
 * Shared HTTP helpers for the Vercel Functions under `/api`.
 *
 * Every response these helpers build carries `Vary: Accept, Accept-Encoding`
 * so a CDN can never hand a cached HTML variant to an agent that asked for
 * Markdown (or vice versa), and every error uses the single JSON envelope
 * documented in `shared/openapi.ts`.
 */

import {
  CHARSET,
  HTML_TYPE,
  JSON_TYPE,
  MARKDOWN_TYPE,
  negotiate,
  varyHeaders,
} from "./negotiate";
import type { ErrorCode } from "./openapi";
import { absolute } from "./site";

export const READ_METHODS = ["GET", "HEAD", "OPTIONS"] as const;

/** Cache policy for immutable-per-deployment JSON and Markdown. */
export const PUBLIC_CACHE =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

/** Error responses must not be cached across clients with different Accepts. */
export const NO_CACHE = "no-store";

const baseHeaders = (contentType: string, cacheControl: string) => ({
  "Content-Type": contentType,
  "Cache-Control": cacheControl,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": READ_METHODS.join(", "),
  "X-Content-Type-Options": "nosniff",
  ...varyHeaders(),
});

export interface ErrorBody {
  error: {
    code: ErrorCode;
    status: number;
    message: string;
    hint: string;
    documentation: string;
  };
}

/** Build the canonical error payload. Exported so tests can assert on it. */
export const errorBody = (
  code: ErrorCode,
  status: number,
  message: string,
  hint: string,
): ErrorBody => ({
  error: {
    code,
    status,
    message,
    hint,
    documentation: absolute("/openapi.json"),
  },
});

export const json = (
  data: unknown,
  { status = 200, cacheControl = PUBLIC_CACHE } = {},
): Response =>
  new Response(status === 204 ? null : `${JSON.stringify(data, null, 2)}\n`, {
    status,
    headers: baseHeaders(JSON_TYPE + CHARSET, cacheControl),
  });

export const jsonError = (
  code: ErrorCode,
  status: number,
  message: string,
  hint: string,
): Response =>
  json(errorBody(code, status, message, hint), {
    status,
    cacheControl: NO_CACHE,
  });

export const markdown = (
  body: string,
  { status = 200, cacheControl = PUBLIC_CACHE } = {},
): Response =>
  new Response(body, {
    status,
    headers: baseHeaders(MARKDOWN_TYPE + CHARSET, cacheControl),
  });

export const html = (
  body: string,
  { status = 200, cacheControl = PUBLIC_CACHE } = {},
): Response =>
  new Response(body, {
    status,
    headers: baseHeaders(HTML_TYPE + CHARSET, cacheControl),
  });

export const plainText = (
  body: string,
  { status = 200, cacheControl = NO_CACHE } = {},
): Response =>
  new Response(body, {
    status,
    headers: baseHeaders("text/plain" + CHARSET, cacheControl),
  });

/** 204 preflight/OPTIONS response advertising the read-only method set. */
export const noContent = (): Response =>
  new Response(null, {
    status: 204,
    headers: {
      ...baseHeaders(JSON_TYPE + CHARSET, NO_CACHE),
      Allow: READ_METHODS.join(", "),
    },
  });

/**
 * Reject write methods before any handler logic runs.
 * Returns `null` when the request may proceed.
 */
export const guardMethod = (request: Request): Response | null => {
  if (request.method === "OPTIONS") return noContent();
  if ((READ_METHODS as readonly string[]).includes(request.method)) return null;

  const response = jsonError(
    "method_not_allowed",
    405,
    `${request.method} is not supported. This API is read-only.`,
    `Use one of: ${READ_METHODS.join(", ")}.`,
  );
  response.headers.set("Allow", READ_METHODS.join(", "));
  return response;
};

/**
 * Reject requests whose `Accept` header explicitly excludes JSON.
 *
 * Deliberately permissive: a browser navigating to an API URL sends an `Accept`
 * header ending in a catch-all range, which still allows JSON, so it gets the
 * real response instead of a 406. Only a client that leaves no room for JSON at
 * all (`Accept: text/csv`, or `application/json;q=0`) is refused.
 *
 * Returns `null` when the request may proceed.
 */
export const guardJsonAccept = (request: Request): Response | null => {
  if (negotiate(request.headers.get("accept"), [JSON_TYPE]).mediaType) {
    return null;
  }

  return jsonError(
    "not_acceptable",
    406,
    "This endpoint can only produce application/json.",
    "Send `Accept: application/json` or omit the header.",
  );
};

/** HEAD must not carry a body but must keep the headers of the GET response. */
export const stripBodyForHead = (
  request: Request,
  response: Response,
): Response =>
  request.method === "HEAD"
    ? new Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      })
    : response;
