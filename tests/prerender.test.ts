import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "../src/entry-server";
import routes from "../src/routes";
import {
  categoriesFor,
  projects,
  type ProjectCategory,
} from "../shared/content";
import { PAGES } from "../shared/site";

/**
 * `entry-client.tsx` hydrates the prerendered markup, so the server render and
 * the browser's first client render must produce identical HTML. A mismatch
 * would make React throw away the server output — silently undoing the
 * "content without JavaScript" fix on the next dependency bump.
 */

/** Strip the router's hydration payload, which only the server emits. */
const withoutHydrationScript = (html: string): string =>
  html.replace(/<script>[\s\S]*?<\/script>/g, "");

describe("server render", () => {
  for (const { path } of PAGES) {
    test(`${path} renders with a 200 status`, async () => {
      const { status } = await render(path);
      expect(status).toBe(200);
    });

    test(`${path} produces markup identical to the client's first render`, async () => {
      const { html: server } = await render(path);

      const router = createMemoryRouter(routes, { initialEntries: [path] });
      const client = renderToString(
        React.createElement(RouterProvider, { router }),
      );

      expect(withoutHydrationScript(server)).toBe(
        withoutHydrationScript(client),
      );
    });

    test(`${path} renders the loading overlay and the shell together`, async () => {
      const { html } = await render(path);
      // Both are present: CSS decides which one a visitor sees, so the shell's
      // text is always in the raw HTML.
      expect(html).toContain("loading-overlay");
      expect(html).toContain("app-shell--loading");
    });

    test(`${path} does not touch browser-only globals during render`, async () => {
      // `render` would throw on `localStorage`/`document` access; reaching this
      // assertion at all proves the tree is SSR-safe.
      await expect(render(path)).resolves.toBeDefined();
    });
  }

  test("scroll-reveal starts in the visible class, not opacity-0", async () => {
    const { html } = await render("/");
    expect(html).toContain('class="w-full reveal"');
    expect(html).not.toContain("opacity-0 translate-y-2");
  });

  test("the theme defaults to lights-out without storage", async () => {
    const { html } = await render("/");
    expect(html).toBeString();
    expect(html).not.toContain("theme-light");
  });
});

describe("route table", () => {
  test("covers every page in the site's page list", () => {
    const layout = routes[0];
    const childPaths = (layout.children ?? []).map((child) =>
      child.index ? "/" : `/${child.path}`,
    );
    for (const { path } of PAGES) expect(childPaths).toContain(path);
  });

  test("keeps a client-side catch-all for unknown paths", () => {
    expect(routes.some((route) => route.path === "*")).toBe(true);
  });

  test("renders the 404 view for an unmatched path", async () => {
    const { html } = await render("/definitely-not-a-page");
    expect(html).toContain("this page doesn&#x27;t exist");
  });
});

describe("the UI reads categories from the shared source", () => {
  /**
   * Structural guard, not a value comparison: because `ProjectsTweetThread`
   * imports `categoriesFor`, the filter pills, `/api/v1/projects?category=`,
   * and the Markdown alternates are the same data by construction. Asserting
   * the rendered counts against `categoriesFor` would be circular, so this
   * instead pins the property that makes them agree.
   */
  const source = readFileSync(
    "src/components/tweets/ProjectsTweetThread.tsx",
    "utf8",
  );

  test("the thread page imports the shared category resolver", () => {
    expect(source).toContain("categoriesFor");
    expect(source).toMatch(/from\s+"\.\.\/\.\.\/\.\.\/shared\/content"/);
  });

  test("the thread page does not keep its own category table", () => {
    // A second literal map here is exactly the drift this refactor removed.
    expect(source).not.toMatch(/const\s+categoryMap\s*[:=]/);
    expect(source).not.toContain('"Get Toasted":');
  });

  test("every pill renders with the count the shared data implies", async () => {
    const { html } = await render("/proof-of-work");

    const labels: [ProjectCategory, string][] = [
      ["All", "All"],
      ["Web3", "Solana &amp; Web3"],
      ["AI", "AI &amp; Agents"],
      ["FullStack", "Full Stack"],
    ];

    for (const [category, label] of labels) {
      const count =
        category === "All"
          ? projects.length
          : projects.filter((project) =>
              categoriesFor(project.name).includes(category),
            ).length;

      // React splits the interpolations, so match the exact emitted shape.
      expect(html, label).toContain(
        `${label}<!-- --> (<!-- -->${count}<!-- -->)`,
      );
    }
  });

  test("every project resolves to at least one category", () => {
    for (const project of projects) {
      expect(categoriesFor(project.name).length, project.name).toBeGreaterThan(
        0,
      );
    }
  });
});
