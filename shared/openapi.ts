/**
 * OpenAPI 3.1 description of the read-only JSON API.
 *
 * `scripts/generate-agent-files.ts` serializes this into `openapi.json` in the
 * build output, and `api/v1/[...path].ts` implements it. Keep the two in sync —
 * `tests/openapi.test.ts` asserts every documented path is routable and every
 * routable path is documented.
 */

import { API_BASE, API_VERSION, ORIGIN, absolute } from "./site";
import { profile } from "./content";

/** Machine-readable error codes returned by the API and the 404 handler. */
export const ERROR_CODES = [
  "bad_request",
  "not_found",
  "method_not_allowed",
  "not_acceptable",
  "internal_error",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export const PROJECT_CATEGORIES = ["Web3", "AI", "FullStack"] as const;

const errorResponse = (
  description: string,
  example: Record<string, unknown>,
) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/ErrorResponse" },
      example,
    },
  },
});

const jsonResponse = (description: string, schemaRef: string) => ({
  description,
  headers: {
    "Cache-Control": {
      description: "Edge and browser caching policy.",
      schema: { type: "string" },
    },
  },
  content: {
    "application/json": {
      schema: { $ref: schemaRef },
    },
  },
});

const NOT_ACCEPTABLE = errorResponse(
  "The `Accept` header does not allow `application/json`.",
  {
    error: {
      code: "not_acceptable",
      status: 406,
      message: "This endpoint can only produce application/json.",
      hint: "Send `Accept: application/json` or omit the header.",
      documentation: absolute("/openapi.json"),
    },
  },
);

const METHOD_NOT_ALLOWED = errorResponse(
  "The HTTP method is not supported. The API is read-only.",
  {
    error: {
      code: "method_not_allowed",
      status: 405,
      message: "POST is not supported. This API is read-only.",
      hint: "Use GET, HEAD, or OPTIONS.",
      documentation: absolute("/openapi.json"),
    },
  },
);

const collection = (
  operationId: string,
  summary: string,
  itemRef: string,
  extras: Record<string, unknown> = {},
) => ({
  get: {
    operationId,
    summary,
    tags: ["portfolio"],
    responses: {
      "200": {
        description: summary,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["data", "meta"],
              properties: {
                data: { type: "array", items: { $ref: itemRef } },
                meta: { $ref: "#/components/schemas/CollectionMeta" },
              },
            },
          },
        },
      },
      "405": METHOD_NOT_ALLOWED,
      "406": NOT_ACCEPTABLE,
    },
    ...extras,
  },
});

export const openapi = {
  openapi: "3.1.0",
  info: {
    title: "Arth Prajapati portfolio API",
    version: API_VERSION,
    summary:
      "Read-only JSON access to the portfolio published at user64bit.wtf.",
    description: [
      "Every section of the portfolio is available as JSON so agents do not have",
      "to parse HTML. All endpoints are unauthenticated, read-only, and safe to",
      "cache. Errors always use the same JSON envelope with a stable `code`, a",
      "human-readable `message`, and a `hint` describing how to recover.",
      "",
      `Markdown alternates of the HTML pages are available at ${absolute("/index.md")}`,
      `and ${absolute("/proof-of-work.md")}, or by sending \`Accept: text/markdown\``,
      "to the HTML URLs.",
    ].join("\n"),
    contact: {
      name: profile.name,
      email: profile.email,
      url: ORIGIN,
    },
    license: {
      name: "MIT",
      identifier: "MIT",
    },
  },
  servers: [{ url: ORIGIN, description: "Production" }],
  tags: [
    {
      name: "portfolio",
      description:
        "Portfolio content: profile, projects, experience, and more.",
    },
    { name: "meta", description: "Discovery and service metadata." },
  ],
  paths: {
    [API_BASE]: {
      get: {
        operationId: "getApiIndex",
        summary: "Index of every available endpoint.",
        tags: ["meta"],
        responses: {
          "200": jsonResponse(
            "Service metadata and links to every endpoint.",
            "#/components/schemas/ApiIndex",
          ),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE,
        },
      },
    },
    [`${API_BASE}/profile`]: {
      get: {
        operationId: "getProfile",
        summary: "Identity, bio, links, and availability.",
        tags: ["portfolio"],
        responses: {
          "200": jsonResponse(
            "The portfolio owner's profile.",
            "#/components/schemas/ProfileEnvelope",
          ),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE,
        },
      },
    },
    [`${API_BASE}/projects`]: collection(
      "listProjects",
      "Every shipped project.",
      "#/components/schemas/Project",
      {
        parameters: [
          {
            name: "category",
            in: "query",
            required: false,
            description: "Filter to a single category.",
            schema: { type: "string", enum: [...PROJECT_CATEGORIES] },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum number of projects to return.",
            schema: { type: "integer", minimum: 1, maximum: 100 },
          },
        ],
        responses: {
          "200": {
            description: "Every shipped project.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["data", "meta"],
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Project" },
                    },
                    meta: { $ref: "#/components/schemas/CollectionMeta" },
                  },
                },
              },
            },
          },
          "400": errorResponse("A query parameter was invalid.", {
            error: {
              code: "bad_request",
              status: 400,
              message: "`category` must be one of: Web3, AI, FullStack.",
              hint: "Retry with a supported category, or omit the parameter.",
              documentation: absolute("/openapi.json"),
            },
          }),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE,
        },
      },
    ),
    [`${API_BASE}/projects/{slug}`]: {
      get: {
        operationId: "getProject",
        summary: "A single project by slug.",
        tags: ["portfolio"],
        parameters: [
          {
            name: "slug",
            in: "path",
            required: true,
            description: "Lowercase hyphenated project identifier.",
            schema: { type: "string", pattern: "^[a-z0-9-]+$" },
            example: "praxis",
          },
        ],
        responses: {
          "200": jsonResponse(
            "The requested project.",
            "#/components/schemas/ProjectEnvelope",
          ),
          "404": errorResponse("No project matches the slug.", {
            error: {
              code: "not_found",
              status: 404,
              message: 'No project with slug "does-not-exist".',
              hint: `List every available slug at ${absolute(`${API_BASE}/projects`)}.`,
              documentation: absolute("/openapi.json"),
            },
          }),
          "405": METHOD_NOT_ALLOWED,
          "406": NOT_ACCEPTABLE,
        },
      },
    },
    [`${API_BASE}/experience`]: collection(
      "listExperience",
      "Work history, most recent first.",
      "#/components/schemas/Experience",
    ),
    [`${API_BASE}/education`]: collection(
      "listEducation",
      "Formal education.",
      "#/components/schemas/Education",
    ),
    [`${API_BASE}/contributions`]: collection(
      "listContributions",
      "Open source pull requests and issues.",
      "#/components/schemas/Contribution",
    ),
    [`${API_BASE}/skills`]: collection(
      "listSkills",
      "Skills grouped by category.",
      "#/components/schemas/SkillGroup",
    ),
  },
  components: {
    schemas: {
      ErrorResponse: {
        type: "object",
        description:
          "Every non-2xx response from this API uses this envelope, including the site-wide 404 handler when JSON is requested.",
        required: ["error"],
        properties: {
          error: {
            type: "object",
            required: ["code", "status", "message", "hint", "documentation"],
            properties: {
              code: {
                type: "string",
                enum: [...ERROR_CODES],
                description: "Stable, machine-readable error identifier.",
              },
              status: {
                type: "integer",
                description: "HTTP status code, repeated for convenience.",
              },
              message: {
                type: "string",
                description: "Human-readable explanation of what went wrong.",
              },
              hint: {
                type: "string",
                description: "Concrete next step an agent can take to recover.",
              },
              documentation: {
                type: "string",
                format: "uri",
                description: "URL of this OpenAPI document.",
              },
            },
          },
        },
      },
      CollectionMeta: {
        type: "object",
        required: ["count", "total"],
        properties: {
          count: {
            type: "integer",
            description: "Number of items in `data`.",
          },
          total: {
            type: "integer",
            description: "Number of items before filtering or limiting.",
          },
          category: {
            type: "string",
            description: "Echo of the `category` filter, when supplied.",
          },
        },
      },
      ApiIndex: {
        type: "object",
        required: ["service", "version", "documentation", "endpoints"],
        properties: {
          service: { type: "string" },
          version: { type: "string" },
          documentation: { type: "string", format: "uri" },
          endpoints: {
            type: "array",
            items: {
              type: "object",
              required: ["path", "description"],
              properties: {
                path: { type: "string" },
                description: { type: "string" },
              },
            },
          },
          resources: {
            type: "array",
            description: "Other machine-readable files published by this site.",
            items: {
              type: "object",
              required: ["path", "title", "description", "contentType"],
              properties: {
                path: { type: "string" },
                title: { type: "string" },
                description: { type: "string" },
                contentType: { type: "string" },
              },
            },
          },
        },
      },
      Profile: {
        type: "object",
        required: ["name", "handle", "bio"],
        properties: {
          name: { type: "string" },
          handle: { type: "string" },
          x: { type: "string", format: "uri" },
          github: { type: "string", format: "uri" },
          headline: { type: "string" },
          bio: { type: "string" },
          location: { type: "string" },
          website: { type: "string", format: "uri" },
          joined: { type: "string" },
          email: { type: "string", format: "email" },
          availability: { type: "string" },
          hobbies: { type: "array", items: { type: "string" } },
        },
      },
      ProfileEnvelope: {
        type: "object",
        required: ["data"],
        properties: { data: { $ref: "#/components/schemas/Profile" } },
      },
      Project: {
        type: "object",
        required: ["slug", "name", "categories", "description"],
        properties: {
          slug: { type: "string" },
          name: { type: "string" },
          categories: {
            type: "array",
            items: { type: "string", enum: [...PROJECT_CATEGORIES] },
          },
          summary: { type: "string" },
          description: { type: "array", items: { type: "string" } },
          techStack: { type: "array", items: { type: "string" } },
          repository: { type: ["string", "null"], format: "uri" },
          liveUrl: { type: ["string", "null"], format: "uri" },
          demoVideo: { type: ["string", "null"], format: "uri" },
          url: {
            type: "string",
            format: "uri",
            description: "Canonical API URL for this project.",
          },
        },
      },
      ProjectEnvelope: {
        type: "object",
        required: ["data"],
        properties: { data: { $ref: "#/components/schemas/Project" } },
      },
      Experience: {
        type: "object",
        required: ["slug", "organization", "timeline", "description"],
        properties: {
          slug: { type: "string" },
          organization: { type: "string" },
          timeline: { type: "string" },
          current: { type: "boolean" },
          description: { type: "string" },
        },
      },
      Education: {
        type: "object",
        required: ["slug", "title", "description"],
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          date: { type: "string" },
          description: { type: "string" },
        },
      },
      Contribution: {
        type: "object",
        required: ["slug", "title", "repository", "status", "url"],
        properties: {
          slug: { type: "string" },
          title: { type: "string" },
          repository: { type: "string" },
          reference: { type: ["string", "null"] },
          status: {
            type: "string",
            enum: ["merged", "open", "issued", "solved"],
          },
          url: { type: "string", format: "uri" },
        },
      },
      SkillGroup: {
        type: "object",
        required: ["slug", "category", "items"],
        properties: {
          slug: { type: "string" },
          category: { type: "string" },
          items: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
} as const;
