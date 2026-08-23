/**
 * Request handling for the read-only JSON API.
 *
 * The Vercel Functions under `api/v1/` are thin wrappers around
 * `handleApiRequest`, so the routing table, the error envelopes, and the
 * OpenAPI document all have a single source of truth that tests can call
 * directly without a running server.
 */

import {
  contributions,
  education,
  experience,
  profile,
  projectBySlug,
  projects,
  skills,
  type ProjectResource,
} from "./content";
import {
  guardJsonAccept,
  guardMethod,
  json,
  jsonError,
  stripBodyForHead,
} from "./http";
import { PROJECT_CATEGORIES } from "./openapi";
import { AGENT_RESOURCES, API_BASE, API_VERSION, absolute } from "./site";

/** Resources reachable under `API_BASE`. */
export const API_RESOURCES = [
  "profile",
  "projects",
  "experience",
  "education",
  "contributions",
  "skills",
] as const;

export type ApiResource = (typeof API_RESOURCES)[number];

const collectionMeta = (
  count: number,
  total: number,
  category?: string,
): Record<string, unknown> =>
  category ? { count, total, category } : { count, total };

const apiIndex = () => ({
  service: "Arth Prajapati portfolio API",
  version: API_VERSION,
  documentation: absolute("/openapi.json"),
  endpoints: [
    { path: API_BASE, description: "This index." },
    {
      path: `${API_BASE}/profile`,
      description: "Identity, bio, links, and availability.",
    },
    {
      path: `${API_BASE}/projects`,
      description:
        "Every shipped project. Supports ?category=Web3|AI|FullStack and ?limit=N.",
    },
    {
      path: `${API_BASE}/projects/{slug}`,
      description: "A single project by slug.",
    },
    {
      path: `${API_BASE}/experience`,
      description: "Work history, most recent first.",
    },
    { path: `${API_BASE}/education`, description: "Formal education." },
    {
      path: `${API_BASE}/contributions`,
      description: "Open source pull requests and issues.",
    },
    { path: `${API_BASE}/skills`, description: "Skills grouped by category." },
  ],
  resources: AGENT_RESOURCES,
});

const filterProjects = (
  url: URL,
): { projects: ProjectResource[]; error?: Response; category?: string } => {
  const category = url.searchParams.get("category");
  const limitRaw = url.searchParams.get("limit");

  let selected = projects;

  if (category !== null) {
    if (!(PROJECT_CATEGORIES as readonly string[]).includes(category)) {
      return {
        projects: [],
        error: jsonError(
          "bad_request",
          400,
          `\`category\` must be one of: ${PROJECT_CATEGORIES.join(", ")}.`,
          "Retry with a supported category, or omit the parameter.",
        ),
      };
    }
    selected = selected.filter((project) =>
      project.categories.includes(
        category as ProjectResource["categories"][number],
      ),
    );
  }

  if (limitRaw !== null) {
    const limit = Number(limitRaw);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return {
        projects: [],
        error: jsonError(
          "bad_request",
          400,
          "`limit` must be an integer between 1 and 100.",
          "Retry with `?limit=10`, or omit the parameter to receive every project.",
        ),
      };
    }
    selected = selected.slice(0, limit);
  }

  return { projects: selected, category: category ?? undefined };
};

const notFoundResource = (pathname: string): Response =>
  jsonError(
    "not_found",
    404,
    `No API resource at "${pathname}".`,
    `List every endpoint at ${absolute(API_BASE)}.`,
  );

/**
 * Route a request against the JSON API.
 *
 * `pathname` is taken from the request URL, but callers may override it when a
 * platform rewrite has replaced the original path (see `api/v1/project.ts`).
 */
export const handleApiRequest = (
  request: Request,
  pathnameOverride?: string,
): Response => {
  const methodError = guardMethod(request);
  if (methodError) return methodError;

  const acceptError = guardJsonAccept(request);
  if (acceptError) return acceptError;

  const url = new URL(request.url);
  const rawPath = pathnameOverride ?? url.pathname;
  const pathname =
    rawPath.length > 1 && rawPath.endsWith("/")
      ? rawPath.slice(0, -1)
      : rawPath;

  if (!pathname.startsWith(API_BASE)) {
    return stripBodyForHead(request, notFoundResource(pathname));
  }

  const segments = pathname
    .slice(API_BASE.length)
    .split("/")
    .filter((segment) => segment.length > 0);

  const respond = (response: Response) => stripBodyForHead(request, response);

  if (segments.length === 0) return respond(json(apiIndex()));

  const [resource, id, ...rest] = segments;
  if (rest.length > 0) return respond(notFoundResource(pathname));

  switch (resource) {
    case "profile":
      if (id) return respond(notFoundResource(pathname));
      return respond(json({ data: profile }));

    case "projects": {
      if (id) {
        const project = projectBySlug(id);
        if (!project) {
          return respond(
            jsonError(
              "not_found",
              404,
              `No project with slug "${id}".`,
              `List every available slug at ${absolute(`${API_BASE}/projects`)}.`,
            ),
          );
        }
        return respond(json({ data: project }));
      }

      const result = filterProjects(url);
      if (result.error) return respond(result.error);
      return respond(
        json({
          data: result.projects,
          meta: collectionMeta(
            result.projects.length,
            projects.length,
            result.category,
          ),
        }),
      );
    }

    case "experience":
      if (id) return respond(notFoundResource(pathname));
      return respond(
        json({
          data: experience,
          meta: collectionMeta(experience.length, experience.length),
        }),
      );

    case "education":
      if (id) return respond(notFoundResource(pathname));
      return respond(
        json({
          data: education,
          meta: collectionMeta(education.length, education.length),
        }),
      );

    case "contributions":
      if (id) return respond(notFoundResource(pathname));
      return respond(
        json({
          data: contributions,
          meta: collectionMeta(contributions.length, contributions.length),
        }),
      );

    case "skills":
      if (id) return respond(notFoundResource(pathname));
      return respond(
        json({
          data: skills,
          meta: collectionMeta(skills.length, skills.length),
        }),
      );

    default:
      return respond(notFoundResource(pathname));
  }
};

/**
 * Query parameters `vercel.json` uses to restate the original path segments.
 *
 * A Vercel Function reached through a rewrite observes the rewrite destination,
 * not the path the client asked for, so the routing rules pass the segments
 * along explicitly. The double-underscore prefix keeps them from colliding with
 * real query parameters like `?category=` or `?limit=`.
 */
export const RESOURCE_PARAM = "__resource";
export const ID_PARAM = "__id";
export const PATH_PARAM = "__path";

/** Rebuild the canonical API pathname a request was aimed at. */
export const apiPathnameFor = (request: Request): string => {
  const url = new URL(request.url);
  const resource = url.searchParams.get(RESOURCE_PARAM);
  const id = url.searchParams.get(ID_PARAM);
  const forwardedPath = url.searchParams.get(PATH_PARAM);

  if (resource) {
    return id ? `${API_BASE}/${resource}/${id}` : `${API_BASE}/${resource}`;
  }

  if (forwardedPath !== null) {
    // An unmatched path somewhere under `/api`.
    const normalized = forwardedPath.replace(/^\/+/, "");
    return normalized ? `/api/${normalized}` : "/api";
  }

  return url.pathname;
};
