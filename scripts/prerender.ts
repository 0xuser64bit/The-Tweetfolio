/**
 * Build-time static site generation.
 *
 * Runs after `vite build` and turns the SPA shell into real HTML documents:
 *
 * 1. Renders every route in `src/routes.tsx` with React on the server and
 *    injects the markup into the `index.html` template produced by Vite, so
 *    `curl` (and every AI crawler) sees an `<h1>` and the full body copy.
 * 2. Writes a static `404.html` for the platform's not-found response.
 * 3. Writes the machine-readable files: `sitemap.xml`, `robots.txt`,
 *    `llms.txt`, `llms-full.txt`, `openapi.json`, and a Markdown alternate for
 *    every page.
 *
 * This file is bundled by Vite (`vite build --ssr`) before it runs, so it can
 * use TypeScript and import from `src/` and `shared/` directly.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../src/entry-server";
import {
  markdownForPath,
  renderLlmsFullTxt,
  renderLlmsTxt,
} from "../shared/markdown";
import { renderNotFoundHtml } from "../shared/not-found-page";
import { openapi } from "../shared/openapi";
import { LLMS_PATH, PAGES, absolute } from "../shared/site";

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "build",
);

/** Marker in `index.html` that the rendered app replaces. */
const APP_PLACEHOLDER = "<!--app-html-->";

const write = async (relativePath: string, contents: string) => {
  const target = path.join(OUT_DIR, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
  return relativePath;
};

/**
 * Substitute exactly one match, or fail the build.
 *
 * The shell is hand-authored HTML that a formatter may re-wrap across lines, so
 * every pattern here is whitespace-tolerant — and a pattern that stops matching
 * must break the build loudly rather than silently ship a page with the wrong
 * title, description, or canonical URL.
 */
const replaceOnce = (
  html: string,
  pattern: RegExp,
  replacement: string,
  label: string,
): string => {
  const matches = html.match(new RegExp(pattern.source, `${pattern.flags}g`));
  if (!matches || matches.length !== 1) {
    throw new Error(
      `prerender: expected exactly one ${label} in index.html, found ${matches?.length ?? 0}. ` +
        `Update the pattern in scripts/prerender.ts to match the current shell.`,
    );
  }
  return html.replace(pattern, replacement);
};

/** Replace the render placeholder and per-page metadata in the shell. */
const buildDocument = (
  template: string,
  {
    html,
    title,
    description,
    canonical,
    markdownPath,
  }: {
    html: string;
    title: string;
    description: string;
    canonical: string;
    markdownPath: string;
  },
): string => {
  if (!template.includes(APP_PLACEHOLDER)) {
    throw new Error(
      `prerender: index.html is missing the ${APP_PLACEHOLDER} placeholder.`,
    );
  }

  let document = template.replace(APP_PLACEHOLDER, html);

  document = replaceOnce(
    document,
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
    "<title>",
  );
  document = replaceOnce(
    document,
    /(<meta\s+name="description"\s+content=")[^"]*(")/,
    `$1${description}$2`,
    'meta[name="description"]',
  );
  document = replaceOnce(
    document,
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    `$1${canonical}$2`,
    'link[rel="canonical"]',
  );
  document = replaceOnce(
    document,
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
    `$1${canonical}$2`,
    'meta[property="og:url"]',
  );
  document = replaceOnce(
    document,
    /(<link\s+rel="alternate"\s+type="text\/markdown"\s+href=")[^"]*(")/,
    `$1${absolute(markdownPath)}$2`,
    'link[rel="alternate"][type="text/markdown"]',
  );

  return document;
};

const renderSitemap = (): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...PAGES.map((page) =>
      [
        "  <url>",
        `    <loc>${absolute(page.path)}</loc>`,
        `    <xhtml:link rel="alternate" type="text/markdown" href="${absolute(page.markdownPath)}" />`,
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");

const renderRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absolute("/sitemap.xml")}`,
    "",
    "# Machine-readable entry points for AI agents:",
    `#   ${absolute(LLMS_PATH)}        curated index of this site`,
    `#   ${absolute("/llms-full.txt")}   every page as Markdown`,
    `#   ${absolute("/openapi.json")}    OpenAPI 3.1 description of the JSON API`,
    `#   ${absolute("/api/v1")}          JSON API index`,
    "",
    "# Every HTML page also answers `Accept: text/markdown` with Markdown.",
    "",
  ].join("\n");

const main = async () => {
  const template = await readFile(path.join(OUT_DIR, "index.html"), "utf8");
  const written: string[] = [];

  for (const page of PAGES) {
    const { html, status } = await render(page.path);
    if (status !== 200) {
      throw new Error(
        `Prerendering "${page.path}" returned status ${status}; expected 200.`,
      );
    }

    written.push(
      await write(
        page.htmlFile,
        buildDocument(template, {
          html,
          title: page.title,
          description: page.description,
          canonical: absolute(page.path),
          markdownPath: page.markdownPath,
        }),
      ),
    );

    const md = markdownForPath(page.path);
    if (!md) {
      throw new Error(`No Markdown renderer registered for "${page.path}".`);
    }
    written.push(await write(page.markdownPath.replace(/^\//, ""), md));
  }

  // Static 404 body, byte-identical to what `api/not-found.ts` serves for HTML
  // clients. Keeping it in the output lets the platform fall back to it
  // directly if the function is ever unavailable.
  written.push(await write("404.html", renderNotFoundHtml()));

  written.push(await write("sitemap.xml", renderSitemap()));
  written.push(await write("robots.txt", renderRobots()));
  written.push(await write("llms.txt", renderLlmsTxt()));
  written.push(await write("llms-full.txt", renderLlmsFullTxt()));
  written.push(
    await write("openapi.json", `${JSON.stringify(openapi, null, 2)}\n`),
  );

  console.log(`prerender: wrote ${written.length} files to build/`);
  for (const file of written) console.log(`  build/${file}`);
};

await main();
robotTxt += '
# DEPLOY TEST 4
';
