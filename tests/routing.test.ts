import { beforeAll, describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import {
  createEmulator,
  sourceToRegExp,
  type Emulator,
} from "../scripts/vercel-emulator";
import { API_BASE, ORIGIN, PAGES } from "../shared/site";
import { projects } from "../shared/content";

/**
 * Exercises `vercel.json` end to end against the real `build/` output and the
 * real functions in `api/`, using the emulator in `scripts/vercel-emulator.ts`.
 *
 * Requires a build: run `bun run build` first (the `test` script does).
 */

const BUILT = existsSync("build/index.html") && existsSync("build/index.md");

let app: Emulator;

beforeAll(async () => {
  if (BUILT) app = await createEmulator();
});

const get = (
  path: string,
  headers: Record<string, string> = {},
  init: RequestInit = {},
) => app(new Request(new URL(path, ORIGIN), { ...init, headers }));

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

describe("preconditions", () => {
  test("the build output exists (run `bun run build` first)", () => {
    expect(
      BUILT,
      "build/ is missing or incomplete — the routing suite needs `bun run build`",
    ).toBe(true);
  });
});

describe("sourceToRegExp", () => {
  test("matches literal sources", () => {
    expect(sourceToRegExp("/llms.txt").regexp.test("/llms.txt")).toBe(true);
    expect(sourceToRegExp("/llms.txt").regexp.test("/llmsXtxt")).toBe(false);
  });

  test("captures a named segment", () => {
    const { regexp, keys } = sourceToRegExp("/api/v1/:resource");
    expect(keys).toEqual(["resource"]);
    expect(regexp.exec("/api/v1/projects")?.[1]).toBe("projects");
    expect(regexp.test("/api/v1/projects/praxis")).toBe(false);
  });

  test("captures a catch-all segment, including the empty case", () => {
    const { regexp } = sourceToRegExp("/:path*");
    expect(regexp.exec("/a/b/c")?.[1]).toBe("a/b/c");
    expect(regexp.test("/")).toBe(true);
  });
});

describe.if(BUILT)("agent-friendly 404s", () => {
  test("an unknown path returns a real 404, not the app shell", async () => {
    for (const path of [
      "/some-path-that-does-not-exist",
      "/nope",
      "/blog/2024/hello",
      "/proof-of-work/extra",
      "/og-image.png",
      "/apple-touch-icon.png",
    ]) {
      const response = await get(path);
      expect(response.status, path).toBe(404);
      expect(await response.text(), path).not.toContain('<div id="root">');
    }
  });

  test("stays a 404 whatever the client asks for", async () => {
    for (const accept of [
      "*/*",
      "text/html",
      "text/markdown",
      "application/json",
      "image/png",
      "application/pdf",
    ]) {
      const response = await get("/nope", { accept });
      expect(response.status, accept).toBe(404);
    }
  });

  test("the default 404 body is Markdown pointing at the indexes", async () => {
    const response = await get("/nope", { accept: "*/*" });
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );

    const body = await response.text();
    expect(body).toStartWith("# 404");
    expect(body).toContain("/sitemap.xml");
    expect(body).toContain("/llms.txt");
    expect(body).toContain("/openapi.json");
  });

  test("a browser gets the designed HTML 404, still with a 404 status", async () => {
    const response = await get("/nope", {
      accept: BROWSER_ACCEPT,
      "sec-fetch-mode": "navigate",
    });
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(await response.text()).toContain("this page doesn't exist");
  });

  test("an unknown API path returns a JSON 404", async () => {
    for (const path of ["/api/v2", "/api/nope", `${API_BASE}/nope`]) {
      const response = await get(path);
      expect(response.status, path).toBe(404);
      expect(response.headers.get("Content-Type"), path).toBe(
        "application/json; charset=utf-8",
      );
      expect((await response.json()).error.code).toBe("not_found");
    }
  });
});

describe.if(BUILT)("known pages are served, not 404ed", () => {
  for (const { path } of PAGES) {
    test(`${path} returns prerendered HTML`, async () => {
      const response = await get(path, { accept: BROWSER_ACCEPT });
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toStartWith("text/html");

      const body = await response.text();
      expect(body).toContain("<h1");
      expect(body.length).toBeGreaterThan(2000);
    });

    test(`${path} sets Vary: Accept on the HTML variant`, async () => {
      const response = await get(path, { accept: BROWSER_ACCEPT });
      expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    });
  }

  test("a trailing slash redirects to the canonical path", async () => {
    const response = await get("/proof-of-work/");
    expect(response.status).toBe(308);
    expect(response.headers.get("Location")).toBe("/proof-of-work");
  });
});

describe.if(BUILT)("Markdown content negotiation", () => {
  for (const { path, markdownPath } of PAGES) {
    test(`${path} with Accept: text/markdown returns Markdown`, async () => {
      const response = await get(path, { accept: "text/markdown" });
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
      expect(await response.text()).toStartWith("# ");
    });

    test(`${markdownPath} is also a plain static file`, async () => {
      const response = await get(markdownPath);
      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    });

    test(`${path} serves the same bytes both ways`, async () => {
      const negotiated = await (
        await get(path, { accept: "text/markdown" })
      ).text();
      const direct = await (await get(markdownPath)).text();
      expect(negotiated).toBe(direct);
    });
  }

  test("a browser Accept header still gets HTML", async () => {
    const response = await get("/", { accept: BROWSER_ACCEPT });
    expect(response.headers.get("Content-Type")).toStartWith("text/html");
  });

  test("no Accept header gets HTML", async () => {
    const response = await get("/");
    expect(response.headers.get("Content-Type")).toStartWith("text/html");
  });

  test("q-values are honoured in both directions", async () => {
    const md = await get("/", {
      accept: "text/html;q=0.5, text/markdown;q=0.9",
    });
    expect(md.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");

    const html = await get("/", {
      accept: "text/markdown;q=0, text/html;q=0.9",
    });
    expect(html.headers.get("Content-Type")).toStartWith("text/html");
    expect(html.status).toBe(200);
  });

  test("an unsatisfiable Accept gets a 406", async () => {
    for (const accept of ["application/json", "application/pdf", "image/png"]) {
      const response = await get("/", { accept });
      expect(response.status, accept).toBe(406);
      expect(response.headers.get("Vary"), accept).toBe(
        "Accept, Accept-Encoding",
      );
      expect(await response.text()).toContain("text/markdown");
    }
  });

  test("every acceptable Accept header still gets a 200", async () => {
    for (const accept of [
      "text/markdown",
      "text/html",
      "text/*",
      "*/*",
      BROWSER_ACCEPT,
      "text/markdown, text/html;q=0.8",
    ]) {
      const response = await get("/", { accept });
      expect(response.status, accept).toBe(200);
    }
  });
});

describe.if(BUILT)("JSON API", () => {
  test("the index is reachable at its documented path", async () => {
    const response = await get(API_BASE);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
    expect((await response.json()).endpoints.length).toBeGreaterThan(0);
  });

  test("every collection is reachable", async () => {
    for (const resource of [
      "profile",
      "projects",
      "experience",
      "education",
      "contributions",
      "skills",
    ]) {
      const response = await get(`${API_BASE}/${resource}`);
      expect(response.status, resource).toBe(200);
      expect((await response.json()).data).toBeDefined();
    }
  });

  test("a project is reachable by slug", async () => {
    const response = await get(`${API_BASE}/projects/${projects[0].slug}`);
    expect(response.status).toBe(200);
    expect((await response.json()).data.slug).toBe(projects[0].slug);
  });

  test("query parameters survive the rewrite", async () => {
    const response = await get(`${API_BASE}/projects?category=Web3&limit=2`);
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload.data).toHaveLength(2);
    expect(payload.meta.category).toBe("Web3");
  });

  test("a bad query parameter returns a JSON 400", async () => {
    const response = await get(`${API_BASE}/projects?category=Nope`);
    expect(response.status).toBe(400);
    expect((await response.json()).error.code).toBe("bad_request");
  });

  test("a write method returns a JSON 405", async () => {
    const response = await get(`${API_BASE}/profile`, {}, { method: "DELETE" });
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET, HEAD, OPTIONS");
  });
});

describe.if(BUILT)("machine-readable files", () => {
  const expectations: [string, string, string?][] = [
    ["/llms.txt", "text/plain; charset=utf-8", "# Arth Prajapati"],
    ["/llms-full.txt", "text/plain; charset=utf-8", "# Arth Prajapati"],
    ["/openapi.json", "application/json; charset=utf-8", '"openapi"'],
    ["/sitemap.xml", "application/xml; charset=utf-8", "<urlset"],
    ["/robots.txt", "text/plain; charset=utf-8", "Sitemap:"],
  ];

  for (const [path, contentType, contains] of expectations) {
    test(`${path} is served as ${contentType}`, async () => {
      const response = await get(path);
      expect(response.status, path).toBe(200);
      expect(response.headers.get("Content-Type"), path).toBe(contentType);
      if (contains) expect(await response.text()).toContain(contains);
    });
  }

  test("hashed assets are served and cached immutably", async () => {
    const html = await (await get("/")).text();
    const asset = /\/assets\/[^"']+/.exec(html)?.[0];
    expect(asset).toBeString();

    const response = await get(asset!);
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=31536000, immutable",
    );
  });
});

describe("vercel.json stays in sync with the page table", () => {
  const config = require("../vercel.json") as {
    routes: { src: string; dest?: string }[];
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };

  test("every page has a Markdown negotiation route", () => {
    for (const { path, markdownPath } of PAGES) {
      const route = config.routes.find((entry) =>
        new RegExp(entry.src).test(path),
      );
      expect(route, path).toBeDefined();
      expect(route!.dest, path).toContain("/api/page");
      expect(markdownPath).toBeString();
    }
  });

  test("every page sets Vary: Accept", () => {
    for (const { path } of PAGES) {
      const entry = config.headers.find((header) => header.source === path);
      const vary = entry?.headers.find((header) => header.key === "Vary");
      expect(vary?.value, path).toBe("Accept, Accept-Encoding");
    }
  });

  test("every Markdown alternate declares its content type", () => {
    for (const { markdownPath } of PAGES) {
      const entry = config.headers.find(
        (header) => header.source === markdownPath,
      );
      const type = entry?.headers.find(
        (header) => header.key === "Content-Type",
      );
      expect(type?.value, markdownPath).toBe("text/markdown; charset=utf-8");
    }
  });
});
