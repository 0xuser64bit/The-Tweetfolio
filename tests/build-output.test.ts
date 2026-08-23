import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { markdownForPath } from "../shared/markdown";
import { renderNotFoundHtml } from "../shared/not-found-page";
import { openapi } from "../shared/openapi";
import { projects } from "../shared/content";
import { PAGES, absolute } from "../shared/site";

/**
 * Asserts the shipped `build/` output, i.e. exactly what an AI crawler that does
 * not run JavaScript would receive. Requires `bun run build` (the `test` script
 * runs it first).
 */

const BUILD = "build";
const read = (relative: string) =>
  readFileSync(path.join(BUILD, relative), "utf8");

const BUILT = existsSync(path.join(BUILD, "index.html"));

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Strip tags, scripts, and styles the way a text extractor would. */
const visibleText = (html: string): string =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

describe("preconditions", () => {
  test("the build output exists (run `bun run build` first)", () => {
    expect(BUILT, "build/ is missing — run `bun run build`").toBe(true);
  });
});

describe.if(BUILT)("prerendered HTML — content without JavaScript", () => {
  for (const page of PAGES) {
    const html = read(page.htmlFile);
    const text = visibleText(html);

    test(`${page.path} has exactly one H1`, () => {
      const h1s = [...html.matchAll(/<h1[\b >][\s\S]*?<\/h1>/g)];
      expect(h1s).toHaveLength(1);
      expect(h1s[0][0].replace(/<[^>]+>/g, "").trim().length).toBeGreaterThan(
        3,
      );
    });

    test(`${page.path} has well over 500 characters of text`, () => {
      expect(text.length).toBeGreaterThan(500);
    });

    test(`${page.path} renders real content, not an empty shell`, () => {
      expect(html).not.toContain("<!--app-html-->");
      expect(html).not.toMatch(/<div id="root">\s*<\/div>/);
      expect(text).toContain("Arth");
    });

    test(`${page.path} contains the actual portfolio data`, () => {
      // Every page renders the shared shell plus its own feed content.
      expect(text).toContain("Praxis");
      expect(text).toContain("user64bit");

      if (page.path === "/") {
        expect(text).toContain("Full-stack dev");
        expect(text).toContain("Open Source");
        expect(text).toContain("Odoo");
      } else {
        // The thread page renders every project, not just the first three.
        for (const name of projects.map((project) => project.name)) {
          expect(text, name).toContain(name);
        }
      }
    });

    test(`${page.path} has per-page title, description, and canonical`, () => {
      // Attribute-order/whitespace tolerant: the shell is formatted HTML.
      expect(html).toContain(`<title>${page.title}</title>`);
      expect(html).toMatch(
        new RegExp(
          `name="description"\\s+content="${escapeRegExp(page.description)}"`,
        ),
      );
      expect(html).toMatch(
        new RegExp(
          `rel="canonical"\\s+href="${escapeRegExp(absolute(page.path))}"`,
        ),
      );
      expect(html).toMatch(
        new RegExp(
          `property="og:url"\\s+content="${escapeRegExp(absolute(page.path))}"`,
        ),
      );
    });

    test(`${page.path} advertises its Markdown alternate`, () => {
      expect(html).toMatch(
        new RegExp(
          `rel="alternate"\\s+type="text/markdown"\\s+href="${escapeRegExp(
            absolute(page.markdownPath),
          )}"`,
        ),
      );
      expect(html).toContain('rel="service-desc"');
    });

    test(`${page.path} references only assets that exist`, () => {
      const assets = new Set(
        [...html.matchAll(/["'(](\/assets\/[^"')]+)/g)].map((m) => m[1]),
      );
      expect(assets.size).toBeGreaterThan(0);
      for (const asset of assets) {
        expect(
          existsSync(path.join(BUILD, asset)),
          `missing asset ${asset}`,
        ).toBe(true);
      }
    });
  }

  test("the home page no longer relies on a <noscript> fallback", () => {
    expect(read("index.html")).not.toContain("<noscript>");
  });

  test("the shell marks itself scripted before first paint", () => {
    const html = read("index.html");
    expect(html).toContain('classList.add("js")');
    expect(html.indexOf('classList.add("js")')).toBeLessThan(
      html.indexOf("</head>"),
    );
  });

  test("no-JS visitors are not left staring at the loading overlay", () => {
    const css = readFileSync(
      path.join(
        BUILD,
        /\/assets\/[^"']+\.css/.exec(read("index.html"))![0].slice(1),
      ),
      "utf8",
    );
    expect(css).toContain(".loading-overlay{display:none}");
    expect(css).toContain(".js .loading-overlay{display:flex}");
    expect(css).toContain(".js .app-shell--loading{display:none}");
  });
});

describe.if(BUILT)("the shell keeps the anchors the prerenderer needs", () => {
  // `scripts/prerender.ts` rewrites per-page metadata by pattern. If a
  // formatter or an edit removes one of these, the build must fail rather than
  // silently ship the wrong title/canonical — these assertions document the
  // contract that `replaceOnce` enforces at build time.
  const shell = readFileSync("index.html", "utf8");

  const anchors: [string, RegExp][] = [
    ["app placeholder", /<!--app-html-->/],
    ["title", /<title>[\s\S]*?<\/title>/],
    ["description", /<meta\s+name="description"\s+content="[^"]*"/],
    ["canonical", /<link\s+rel="canonical"\s+href="[^"]*"/],
    ["og:url", /<meta\s+property="og:url"\s+content="[^"]*"/],
    [
      "markdown alternate",
      /<link\s+rel="alternate"\s+type="text\/markdown"\s+href="[^"]*"/,
    ],
  ];

  for (const [label, pattern] of anchors) {
    test(`index.html has exactly one ${label}`, () => {
      const matches = shell.match(new RegExp(pattern.source, "g"));
      expect(matches, label).not.toBeNull();
      expect(matches!.length, label).toBe(1);
    });
  }
});

describe.if(BUILT)("Markdown alternates", () => {
  for (const page of PAGES) {
    test(`${page.markdownPath} matches the shared renderer`, () => {
      const expected = markdownForPath(page.path);
      expect(expected).toBeString();
      expect(read(page.markdownPath.replace(/^\//, ""))).toBe(expected!);
    });
  }
});

describe.if(BUILT)("404.html", () => {
  test("is byte-identical to what api/not-found.ts serves", () => {
    expect(read("404.html")).toBe(renderNotFoundHtml());
  });

  test("is noindex and self-contained", () => {
    const html = read("404.html");
    expect(html).toContain('content="noindex, follow"');
    expect(html).not.toContain("/assets/");
  });

  test("points agents at the machine-readable indexes", () => {
    const html = read("404.html");
    for (const target of ["/llms.txt", "/sitemap.xml", "/openapi.json"]) {
      expect(html).toContain(`href="${target}"`);
    }
  });
});

describe.if(BUILT)("openapi.json", () => {
  test("is valid JSON and matches the shared spec", () => {
    expect(JSON.parse(read("openapi.json"))).toEqual(
      JSON.parse(JSON.stringify(openapi)),
    );
  });
});

describe.if(BUILT)("sitemap.xml", () => {
  test("lists every page with its Markdown alternate", () => {
    const xml = read("sitemap.xml");
    expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
    for (const page of PAGES) {
      expect(xml).toContain(`<loc>${absolute(page.path)}</loc>`);
      expect(xml).toContain(`href="${absolute(page.markdownPath)}"`);
    }
  });

  test("lists nothing that is not a real page", () => {
    const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => m[1],
    );
    expect(locs).toEqual(PAGES.map((page) => absolute(page.path)));
  });
});

describe.if(BUILT)("robots.txt", () => {
  test("allows crawling and points at the sitemap and llms.txt", () => {
    const robots = read("robots.txt");
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${absolute("/sitemap.xml")}`);
    expect(robots).toContain(absolute("/llms.txt"));
    expect(robots).toContain(absolute("/openapi.json"));
  });
});

describe.if(BUILT)("build output completeness", () => {
  test("every file an agent is told about exists", () => {
    for (const relative of [
      "index.html",
      "index.md",
      "proof-of-work/index.html",
      "proof-of-work.md",
      "404.html",
      "llms.txt",
      "llms-full.txt",
      "openapi.json",
      "sitemap.xml",
      "robots.txt",
      "favicon.ico",
      "manifest.json",
    ]) {
      expect(existsSync(path.join(BUILD, relative)), relative).toBe(true);
    }
  });
});
