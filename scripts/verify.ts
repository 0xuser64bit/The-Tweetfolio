/**
 * Verifies every public endpoint and machine-readable file against the real
 * `build/` output and the real `/api` functions, using the `vercel.json` routing
 * emulator.
 *
 * Run after a build:
 *
 *   bun run verify
 *
 * This is the local equivalent of curling the deployed site. It cannot prove
 * Vercel's own edge behaviour — only that the configuration and the code agree.
 */

import { createEmulator } from "./vercel-emulator";
import { API_BASE, ORIGIN, PAGES } from "../shared/site";
import { projects } from "../shared/content";

const BROWSER_ACCEPT =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

interface Check {
  label: string;
  path: string;
  accept?: string;
  method?: string;
  expectStatus: number;
  expectType?: string;
  expectVary?: boolean;
  expectBody?: string;
}

const checks: Check[] = [
  // 1. Agent-friendly 404s
  {
    label: "404 · unknown path (curl default)",
    path: "/some-path-that-does-not-exist",
    accept: "*/*",
    expectStatus: 404,
    expectType: "text/markdown; charset=utf-8",
    expectBody: "# 404",
  },
  {
    label: "404 · body points at sitemap/llms.txt/openapi",
    path: "/nope",
    accept: "text/markdown",
    expectStatus: 404,
    expectBody: "/llms.txt",
  },
  {
    label: "404 · browser gets the designed page, still 404",
    path: "/nope",
    accept: BROWSER_ACCEPT,
    expectStatus: 404,
    expectType: "text/html; charset=utf-8",
  },
  {
    label: "404 · missing asset is a real 404",
    path: "/og-image.png",
    accept: "image/png",
    expectStatus: 404,
  },

  // 2. Content without JavaScript
  ...PAGES.flatMap((page): Check[] => [
    {
      label: `HTML · ${page.path} prerendered`,
      path: page.path,
      accept: BROWSER_ACCEPT,
      expectStatus: 200,
      expectType: "text/html; charset=utf-8",
      expectBody: "<h1",
      expectVary: true,
    },
  ]),

  // 3. OpenAPI spec published
  {
    label: "OpenAPI · /openapi.json",
    path: "/openapi.json",
    expectStatus: 200,
    expectType: "application/json; charset=utf-8",
    expectBody: '"openapi": "3.1.0"',
  },

  // 4. JSON error responses
  {
    label: "API · index",
    path: API_BASE,
    expectStatus: 200,
    expectType: "application/json; charset=utf-8",
  },
  ...(
    [
      "profile",
      "projects",
      "experience",
      "education",
      "contributions",
      "skills",
    ] as const
  ).map(
    (resource): Check => ({
      label: `API · ${resource}`,
      path: `${API_BASE}/${resource}`,
      expectStatus: 200,
      expectType: "application/json; charset=utf-8",
    }),
  ),
  {
    label: "API · project by slug",
    path: `${API_BASE}/projects/${projects[0].slug}`,
    expectStatus: 200,
    expectType: "application/json; charset=utf-8",
  },
  {
    label: "API · filter + limit survive the rewrite",
    path: `${API_BASE}/projects?category=Web3&limit=2`,
    expectStatus: 200,
    expectBody: '"category": "Web3"',
  },
  {
    label: "JSON error · 404 unknown resource",
    path: `${API_BASE}/nope`,
    expectStatus: 404,
    expectType: "application/json; charset=utf-8",
    expectBody: '"code": "not_found"',
  },
  {
    label: "JSON error · 404 unknown project",
    path: `${API_BASE}/projects/nope`,
    expectStatus: 404,
    expectBody: '"hint"',
  },
  {
    label: "JSON error · 400 bad query",
    path: `${API_BASE}/projects?category=Nope`,
    expectStatus: 400,
    expectBody: '"code": "bad_request"',
  },
  {
    label: "JSON error · 405 write method",
    path: `${API_BASE}/profile`,
    method: "DELETE",
    expectStatus: 405,
    expectBody: '"code": "method_not_allowed"',
  },
  {
    label: "JSON error · 406 JSON unacceptable",
    path: `${API_BASE}/profile`,
    accept: "text/csv",
    expectStatus: 406,
    expectBody: '"code": "not_acceptable"',
  },

  // 5. Markdown content negotiation
  ...PAGES.flatMap((page): Check[] => [
    {
      label: `Markdown · ${page.path} Accept: text/markdown`,
      path: page.path,
      accept: "text/markdown",
      expectStatus: 200,
      expectType: "text/markdown; charset=utf-8",
      expectBody: "# ",
      expectVary: true,
    },
    {
      label: `Markdown · ${page.markdownPath} static alternate`,
      path: page.markdownPath,
      expectStatus: 200,
      expectType: "text/markdown; charset=utf-8",
      expectVary: true,
    },
  ]),
  {
    label: "Markdown · q-values prefer Markdown when ranked higher",
    path: "/",
    accept: "text/html;q=0.5, text/markdown;q=0.9",
    expectStatus: 200,
    expectType: "text/markdown; charset=utf-8",
  },
  {
    label: "Markdown · q=0 falls back to HTML",
    path: "/",
    accept: "text/markdown;q=0, text/html",
    expectStatus: 200,
    expectType: "text/html; charset=utf-8",
  },
  {
    label: "Markdown · unsupported type gets 406",
    path: "/",
    accept: "application/pdf",
    expectStatus: 406,
    expectVary: true,
  },

  // Machine-readable files
  {
    label: "Agents · /llms.txt",
    path: "/llms.txt",
    expectStatus: 200,
    expectType: "text/plain; charset=utf-8",
    expectBody: "# Arth Prajapati",
  },
  {
    label: "Agents · /llms-full.txt",
    path: "/llms-full.txt",
    expectStatus: 200,
    expectType: "text/plain; charset=utf-8",
  },
  {
    label: "Agents · /sitemap.xml",
    path: "/sitemap.xml",
    expectStatus: 200,
    expectType: "application/xml; charset=utf-8",
  },
  {
    label: "Agents · /robots.txt",
    path: "/robots.txt",
    expectStatus: 200,
    expectBody: "Sitemap:",
  },
  {
    label: "Canonical · trailing slash redirects",
    path: "/proof-of-work/",
    expectStatus: 308,
  },
];

const main = async () => {
  const app = await createEmulator();
  let failures = 0;

  const pad = Math.max(...checks.map((check) => check.label.length));

  for (const check of checks) {
    const headers: Record<string, string> = {};
    if (check.accept) headers.accept = check.accept;

    const response = await app(
      new Request(new URL(check.path, ORIGIN), {
        method: check.method ?? "GET",
        headers,
      }),
    );
    const body = await response.text();
    const problems: string[] = [];

    if (response.status !== check.expectStatus) {
      problems.push(`status ${response.status} ≠ ${check.expectStatus}`);
    }
    if (
      check.expectType &&
      response.headers.get("Content-Type") !== check.expectType
    ) {
      problems.push(
        `type "${response.headers.get("Content-Type")}" ≠ "${check.expectType}"`,
      );
    }
    if (check.expectVary) {
      const vary = response.headers.get("Vary") ?? "";
      if (!vary.toLowerCase().includes("accept")) {
        problems.push(`Vary "${vary}" is missing Accept`);
      }
    }
    if (check.expectBody && !body.includes(check.expectBody)) {
      problems.push(`body is missing ${JSON.stringify(check.expectBody)}`);
    }

    const status = problems.length === 0 ? "PASS" : "FAIL";
    if (problems.length > 0) failures += 1;

    const vary = response.headers.get("Vary") ? " vary" : "";
    console.log(
      `${status}  ${check.label.padEnd(pad)}  ${String(response.status).padStart(3)} ${
        response.headers.get("Content-Type") ?? "-"
      }${vary}${problems.length ? `\n        ${problems.join("; ")}` : ""}`,
    );
  }

  console.log(
    `\n${checks.length - failures}/${checks.length} checks passed against build/ via vercel.json.`,
  );
  if (failures > 0) process.exit(1);
};

await main();
