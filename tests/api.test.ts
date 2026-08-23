import { describe, expect, test } from "bun:test";
import {
  API_RESOURCES,
  ID_PARAM,
  PATH_PARAM,
  RESOURCE_PARAM,
  apiPathnameFor,
  handleApiRequest,
} from "../shared/api";
import { projects } from "../shared/content";
import { API_BASE, ORIGIN, absolute } from "../shared/site";
import { PROJECT_CATEGORIES } from "../shared/openapi";

/** Build the request a `vercel.json` rewrite would produce for `apiPath`. */
const request = (
  apiPath: string,
  init: RequestInit & { search?: string } = {},
): Request => {
  const { search = "", ...rest } = init;
  const segments = apiPath
    .replace(API_BASE, "")
    .split("/")
    .filter((segment) => segment.length > 0);

  const url = new URL("/api/v1", ORIGIN);
  if (segments[0]) url.searchParams.set(RESOURCE_PARAM, segments[0]);
  if (segments[1]) url.searchParams.set(ID_PARAM, segments[1]);
  for (const [key, value] of new URLSearchParams(search)) {
    url.searchParams.set(key, value);
  }

  return new Request(url, rest);
};

const call = (apiPath: string, init?: RequestInit & { search?: string }) =>
  handleApiRequest(
    request(apiPath, init),
    apiPathnameFor(request(apiPath, init)),
  );

const body = async (response: Response) => (await response.json()) as any;

describe("apiPathnameFor", () => {
  test("rebuilds the index path when no segments were forwarded", () => {
    expect(apiPathnameFor(new Request(`${ORIGIN}/api/v1`))).toBe(API_BASE);
  });

  test("rebuilds a collection path", () => {
    expect(
      apiPathnameFor(
        new Request(`${ORIGIN}/api/v1?${RESOURCE_PARAM}=projects`),
      ),
    ).toBe(`${API_BASE}/projects`);
  });

  test("rebuilds an item path", () => {
    expect(
      apiPathnameFor(
        new Request(
          `${ORIGIN}/api/v1?${RESOURCE_PARAM}=projects&${ID_PARAM}=praxis`,
        ),
      ),
    ).toBe(`${API_BASE}/projects/praxis`);
  });

  test("rebuilds an unmatched /api path", () => {
    expect(
      apiPathnameFor(new Request(`${ORIGIN}/api/v1?${PATH_PARAM}=v2/things`)),
    ).toBe("/api/v2/things");
    expect(apiPathnameFor(new Request(`${ORIGIN}/api/v1?${PATH_PARAM}=`))).toBe(
      "/api",
    );
  });
});

describe("every response", () => {
  test("is JSON with Vary: Accept so CDNs cannot cross-serve variants", async () => {
    for (const resource of ["", ...API_RESOURCES]) {
      const response = call(`${API_BASE}/${resource}`);
      expect(response.headers.get("Content-Type")).toBe(
        "application/json; charset=utf-8",
      );
      expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.status).toBe(200);
      await response.json();
    }
  });
});

describe("GET /api/v1", () => {
  test("returns a machine-readable index of every endpoint", async () => {
    const payload = await body(call(API_BASE));
    expect(payload.service).toBeString();
    expect(payload.documentation).toBe(absolute("/openapi.json"));
    expect(payload.endpoints.map((e: any) => e.path)).toContain(
      `${API_BASE}/projects`,
    );
    expect(payload.resources.map((r: any) => r.path)).toContain("/llms.txt");
  });
});

describe("GET /api/v1/profile", () => {
  test("returns the profile", async () => {
    const payload = await body(call(`${API_BASE}/profile`));
    expect(payload.data.name).toBe("Arth Prajapati");
    expect(payload.data.handle).toBe("user64bit");
    expect(payload.data.bio).toBeString();
  });

  test("404s on a sub-path", async () => {
    const response = call(`${API_BASE}/profile/extra`);
    expect(response.status).toBe(404);
    expect((await body(response)).error.code).toBe("not_found");
  });
});

describe("GET /api/v1/projects", () => {
  test("returns every project with slugs and metadata", async () => {
    const payload = await body(call(`${API_BASE}/projects`));
    expect(payload.data).toHaveLength(projects.length);
    expect(payload.meta).toEqual({
      count: projects.length,
      total: projects.length,
    });

    const [first] = payload.data;
    expect(first.slug).toMatch(/^[a-z0-9-]+$/);
    expect(first.url).toBe(absolute(`${API_BASE}/projects/${first.slug}`));
    expect(first.categories).toBeArray();
  });

  test("filters by category and echoes it in meta", async () => {
    const payload = await body(
      call(`${API_BASE}/projects`, { search: "category=Web3" }),
    );
    expect(payload.meta.category).toBe("Web3");
    expect(payload.meta.total).toBe(projects.length);
    expect(payload.data.length).toBeGreaterThan(0);
    expect(payload.data.length).toBeLessThan(projects.length);
    for (const project of payload.data) {
      expect(project.categories).toContain("Web3");
    }
  });

  test("accepts every documented category", () => {
    for (const category of PROJECT_CATEGORIES) {
      expect(
        call(`${API_BASE}/projects`, { search: `category=${category}` }).status,
      ).toBe(200);
    }
  });

  test("rejects an unknown category with a 400 and a resolution hint", async () => {
    const response = call(`${API_BASE}/projects`, { search: "category=Rust" });
    expect(response.status).toBe(400);
    expect(response.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );

    const { error } = await body(response);
    expect(error.code).toBe("bad_request");
    expect(error.status).toBe(400);
    expect(error.message).toContain("Web3");
    expect(error.hint).toBeString();
    expect(error.documentation).toBe(absolute("/openapi.json"));
  });

  test("applies limit", async () => {
    const payload = await body(
      call(`${API_BASE}/projects`, { search: "limit=3" }),
    );
    expect(payload.data).toHaveLength(3);
    expect(payload.meta).toEqual({ count: 3, total: projects.length });
  });

  test("rejects a non-numeric or out-of-range limit", async () => {
    for (const limit of ["0", "abc", "101", "1.5", "-4"]) {
      const response = call(`${API_BASE}/projects`, {
        search: `limit=${limit}`,
      });
      expect(response.status).toBe(400);
      expect((await body(response)).error.code).toBe("bad_request");
    }
  });
});

describe("GET /api/v1/projects/{slug}", () => {
  test("returns the matching project for every slug", async () => {
    for (const project of projects) {
      const payload = await body(call(`${API_BASE}/projects/${project.slug}`));
      expect(payload.data.slug).toBe(project.slug);
      expect(payload.data.name).toBe(project.name);
    }
  });

  test("404s with a hint pointing at the collection", async () => {
    const response = call(`${API_BASE}/projects/does-not-exist`);
    expect(response.status).toBe(404);
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const { error } = await body(response);
    expect(error.code).toBe("not_found");
    expect(error.status).toBe(404);
    expect(error.message).toContain("does-not-exist");
    expect(error.hint).toContain(`${API_BASE}/projects`);
  });
});

describe("collections", () => {
  test("each returns data plus consistent meta", async () => {
    for (const resource of [
      "experience",
      "education",
      "contributions",
      "skills",
    ]) {
      const payload = await body(call(`${API_BASE}/${resource}`));
      expect(payload.data).toBeArray();
      expect(payload.data.length).toBeGreaterThan(0);
      expect(payload.meta.count).toBe(payload.data.length);
      expect(payload.meta.total).toBe(payload.data.length);
      for (const item of payload.data) expect(item.slug).toBeString();
    }
  });

  test("contributions expose repository, status, and url", async () => {
    const payload = await body(call(`${API_BASE}/contributions`));
    const [first] = payload.data;
    expect(first.repository).toMatch(/^[^/]+\/[^/]+$/);
    expect(["merged", "open", "issued", "solved"]).toContain(first.status);
    expect(first.url).toStartWith("https://");
  });
});

describe("unknown paths", () => {
  test("return a JSON 404, never HTML", async () => {
    for (const path of ["/api/v1/nope", "/api/v1/nope/deeper", "/api/v2"]) {
      const url = new URL("/api/v1", ORIGIN);
      url.searchParams.set(PATH_PARAM, path.replace(/^\/api\/?/, ""));
      const response = handleApiRequest(
        new Request(url),
        apiPathnameFor(new Request(url)),
      );
      expect(response.status).toBe(404);
      expect(response.headers.get("Content-Type")).toBe(
        "application/json; charset=utf-8",
      );
      const { error } = await body(response);
      expect(error.code).toBe("not_found");
      expect(error.hint).toContain(API_BASE);
    }
  });
});

describe("method handling", () => {
  test("HEAD keeps the headers but drops the body", async () => {
    const response = call(`${API_BASE}/profile`, { method: "HEAD" });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
    expect(await response.text()).toBe("");
  });

  test("OPTIONS advertises the read-only method set", () => {
    const response = call(API_BASE, { method: "OPTIONS" });
    expect(response.status).toBe(204);
    expect(response.headers.get("Allow")).toBe("GET, HEAD, OPTIONS");
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, HEAD, OPTIONS",
    );
  });

  test("write methods get a 405 with an Allow header and JSON body", async () => {
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const response = call(`${API_BASE}/profile`, { method });
      expect(response.status).toBe(405);
      expect(response.headers.get("Allow")).toBe("GET, HEAD, OPTIONS");

      const { error } = await body(response);
      expect(error.code).toBe("method_not_allowed");
      expect(error.status).toBe(405);
      expect(error.message).toContain(method);
      expect(error.hint).toContain("GET");
    }
  });
});

describe("Accept handling", () => {
  test("serves JSON to a browser-style Accept header", () => {
    const response = call(`${API_BASE}/profile`, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    expect(response.status).toBe(200);
  });

  test("406s only when JSON is genuinely unacceptable", async () => {
    for (const accept of ["text/csv", "application/json;q=0", "text/html"]) {
      const response = call(`${API_BASE}/profile`, { headers: { accept } });
      expect(response.status).toBe(406);
      const { error } = await body(response);
      expect(error.code).toBe("not_acceptable");
      expect(error.hint).toContain("application/json");
    }
  });
});
