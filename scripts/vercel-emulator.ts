/**
 * Local emulator for the `vercel.json` routing rules.
 *
 * Implements Vercel's documented request pipeline against the real `build/`
 * output and the real functions in `api/`, in the platform's order:
 *
 *   1. `routes`      — deployment routes, evaluated *before* the filesystem
 *   2. `trailingSlash` redirect
 *   3. filesystem    — static files, directory indexes, `api/*` functions
 *   4. `rewrites`    — only reached when the filesystem missed
 *   5. `headers`     — additive, matched against the original request path
 *
 * Used by `tests/routing.test.ts` to prove the config behaves as intended, and
 * by `scripts/verify.ts` to curl every public endpoint locally. It is a
 * development tool, never deployed.
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DIR = path.join(ROOT, "build");

interface HasCondition {
  type: "header" | "cookie" | "query" | "host";
  key?: string;
  value?: string | { re?: string; eq?: string; pre?: string; suf?: string };
}

interface RouteEntry {
  src: string;
  dest?: string;
  status?: number;
  headers?: Record<string, string>;
  has?: HasCondition[];
  missing?: HasCondition[];
  continue?: boolean;
  methods?: string[];
}

interface RewriteEntry {
  source: string;
  destination: string;
  has?: HasCondition[];
  missing?: HasCondition[];
}

interface HeaderEntry {
  source: string;
  headers: { key: string; value: string }[];
  has?: HasCondition[];
}

interface VercelConfig {
  trailingSlash?: boolean;
  routes?: RouteEntry[];
  rewrites?: RewriteEntry[];
  headers?: HeaderEntry[];
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
};

/**
 * Translate a `source` pattern (path-to-regexp subset) into a RegExp.
 * Supports `:name`, `:name*`, and literal segments — everything this project's
 * `vercel.json` uses.
 */
export const sourceToRegExp = (
  source: string,
): { regexp: RegExp; keys: string[] } => {
  const keys: string[] = [];
  let pattern = "";
  let index = 0;

  while (index < source.length) {
    const char = source[index];

    if (char === ":") {
      const match = /^:([A-Za-z0-9_]+)(\*|\+|\?)?/.exec(source.slice(index));
      if (match) {
        const [raw, name, modifier] = match;
        keys.push(name);
        if (modifier === "*") {
          // Repeated, optional: also swallow the preceding "/".
          pattern = pattern.replace(/\/$/, "");
          pattern += "(?:/(.*))?";
        } else if (modifier === "+") {
          pattern = pattern.replace(/\/$/, "");
          pattern += "/(.+)";
        } else if (modifier === "?") {
          pattern += "([^/]*)";
        } else {
          pattern += "([^/]+)";
        }
        index += raw.length;
        continue;
      }
    }

    pattern += char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    index += 1;
  }

  return { regexp: new RegExp(`^${pattern}$`), keys };
};

const conditionValue = (
  request: Request,
  url: URL,
  condition: HasCondition,
): string | null => {
  switch (condition.type) {
    case "header":
      return request.headers.get(condition.key ?? "");
    case "query":
      return url.searchParams.get(condition.key ?? "");
    case "cookie": {
      const cookie = request.headers.get("cookie") ?? "";
      const match = new RegExp(`(?:^|;\\s*)${condition.key}=([^;]*)`).exec(
        cookie,
      );
      return match ? match[1] : null;
    }
    case "host":
      return url.host;
    default:
      return null;
  }
};

const valueMatches = (
  actual: string,
  value: HasCondition["value"],
): boolean => {
  if (value === undefined) return true;
  if (typeof value === "string") return new RegExp(`^${value}$`).test(actual);
  if (value.re !== undefined) return new RegExp(`^${value.re}$`).test(actual);
  if (value.eq !== undefined) return actual === value.eq;
  if (value.pre !== undefined) return actual.startsWith(value.pre);
  if (value.suf !== undefined) return actual.endsWith(value.suf);
  return true;
};

const conditionsMatch = (
  request: Request,
  url: URL,
  has: HasCondition[] | undefined,
  missing: HasCondition[] | undefined,
): boolean => {
  for (const condition of has ?? []) {
    const actual = conditionValue(request, url, condition);
    if (actual === null || !valueMatches(actual, condition.value)) return false;
  }
  for (const condition of missing ?? []) {
    const actual = conditionValue(request, url, condition);
    if (actual !== null && valueMatches(actual, condition.value)) return false;
  }
  return true;
};

/** Merge a destination's query string onto the incoming one. */
const applyDestination = (url: URL, destination: string): URL => {
  const [destPath, destQuery] = destination.split("?");
  const next = new URL(url.toString());
  next.pathname = destPath;
  if (destQuery) {
    for (const [key, value] of new URLSearchParams(destQuery)) {
      next.searchParams.set(key, value);
    }
  }
  return next;
};

const interpolate = (
  template: string,
  match: RegExpExecArray,
  keys: string[],
): string => {
  let out = template;

  // Named groups: $name
  for (const [name, value] of Object.entries(match.groups ?? {})) {
    out = out.split(`$${name}`).join(value ?? "");
  }
  // path-to-regexp keys: :name and :name*
  keys.forEach((key, position) => {
    const value = match[position + 1] ?? "";
    out = out.split(`:${key}*`).join(value).split(`:${key}`).join(value);
  });
  // Positional groups: $1, $2 ... (highest index first so $10 beats $1)
  for (let i = match.length - 1; i >= 0; i -= 1) {
    out = out.split(`$${i}`).join(match[i] ?? "");
  }

  return out;
};

interface StaticHit {
  filePath: string;
  contentType: string;
}

/** Resolve a pathname against the build output, following directory indexes. */
export const resolveStatic = (pathname: string): StaticHit | null => {
  const relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidates = relative
    ? [relative, path.join(relative, "index.html")]
    : ["index.html"];

  for (const candidate of candidates) {
    const filePath = path.join(BUILD_DIR, candidate);
    if (!filePath.startsWith(BUILD_DIR)) continue;
    if (!existsSync(filePath) || !statSync(filePath).isFile()) continue;
    return {
      filePath,
      contentType: MIME[path.extname(filePath)] ?? "application/octet-stream",
    };
  }

  return null;
};

type FunctionHandler = (request: Request) => Response | Promise<Response>;

/** Load the `/api` functions the way Vercel's filesystem router would. */
const loadFunctions = async (): Promise<Map<string, FunctionHandler>> => {
  const names = ["page", "not-found", "v1"];
  const handlers = new Map<string, FunctionHandler>();

  for (const name of names) {
    const mod = (await import(`../api/${name}.ts`)) as {
      default: { fetch: FunctionHandler } | FunctionHandler;
    };
    const handler =
      typeof mod.default === "function" ? mod.default : mod.default.fetch;
    handlers.set(`/api/${name}`, handler);
  }

  return handlers;
};

const staticResponse = (hit: StaticHit, request: Request): Response => {
  const body = readFileSync(hit.filePath);
  return new Response(request.method === "HEAD" ? null : body, {
    status: 200,
    headers: {
      "Content-Type": hit.contentType,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};

export interface Emulator {
  (request: Request): Promise<Response>;
}

/** Build a request handler that applies `vercel.json` to `build/` and `api/`. */
export const createEmulator = async (): Promise<Emulator> => {
  const config = JSON.parse(
    readFileSync(path.join(ROOT, "vercel.json"), "utf8"),
  ) as VercelConfig;
  const functions = await loadFunctions();

  const dispatch = async (url: URL, request: Request): Promise<Response> => {
    const fn = functions.get(url.pathname);
    if (fn) {
      const forwarded = new Request(url, {
        method: request.method,
        headers: request.headers,
      });
      return fn(forwarded);
    }

    const hit = resolveStatic(url.pathname);
    if (hit) return staticResponse(hit, request);

    return new Response("emulator: unresolved destination", { status: 500 });
  };

  return async (request: Request): Promise<Response> => {
    let url = new URL(request.url);
    const originalPath = url.pathname;

    // 1. routes (pre-filesystem)
    for (const route of config.routes ?? []) {
      if (route.methods && !route.methods.includes(request.method)) continue;
      const match = new RegExp(route.src, "i").exec(url.pathname);
      if (!match) continue;
      if (!conditionsMatch(request, url, route.has, route.missing)) continue;

      if (route.dest) {
        url = applyDestination(url, interpolate(route.dest, match, []));
      }
      if (route.status && !route.dest) {
        return withHeaders(
          new Response(null, { status: route.status }),
          config,
          request,
          originalPath,
        );
      }
      if (!route.continue) {
        return withHeaders(
          await dispatch(url, request),
          config,
          request,
          originalPath,
        );
      }
    }

    // 2. trailingSlash redirect
    if (
      config.trailingSlash === false &&
      url.pathname.length > 1 &&
      url.pathname.endsWith("/")
    ) {
      const target = new URL(url.toString());
      target.pathname = url.pathname.replace(/\/+$/, "");
      return new Response(null, {
        status: 308,
        headers: { Location: target.pathname + target.search },
      });
    }

    // 3. filesystem
    const fn = functions.get(url.pathname);
    if (fn) {
      return withHeaders(
        await fn(
          new Request(url, {
            method: request.method,
            headers: request.headers,
          }),
        ),
        config,
        request,
        originalPath,
      );
    }
    const hit = resolveStatic(url.pathname);
    if (hit) {
      return withHeaders(
        staticResponse(hit, request),
        config,
        request,
        originalPath,
      );
    }

    // 4. rewrites
    for (const rewrite of config.rewrites ?? []) {
      const { regexp, keys } = sourceToRegExp(rewrite.source);
      const match = regexp.exec(url.pathname);
      if (!match) continue;
      if (!conditionsMatch(request, url, rewrite.has, rewrite.missing))
        continue;

      url = applyDestination(
        url,
        interpolate(rewrite.destination, match, keys),
      );
      return withHeaders(
        await dispatch(url, request),
        config,
        request,
        originalPath,
      );
    }

    return withHeaders(
      new Response("Not Found", { status: 404 }),
      config,
      request,
      originalPath,
    );
  };
};

/** Apply `headers` rules, which match the original request path. */
const withHeaders = (
  response: Response,
  config: VercelConfig,
  request: Request,
  originalPath: string,
): Response => {
  const headers = new Headers(response.headers);
  const url = new URL(request.url);

  for (const entry of config.headers ?? []) {
    const { regexp } = sourceToRegExp(entry.source);
    if (!regexp.test(originalPath)) continue;
    if (!conditionsMatch(request, url, entry.has, undefined)) continue;
    for (const { key, value } of entry.headers) headers.set(key, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
