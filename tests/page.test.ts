import { describe, expect, test } from "bun:test";
import { handlePageRequest, resolvePath } from "../api/page";
import { PATH_PARAM } from "../shared/api";
import { markdownForPath } from "../shared/markdown";
import { ORIGIN, PAGES } from "../shared/site";

const HTML_FIXTURE = "<!DOCTYPE html><html><body><h1>Arth</h1></body></html>";

const stubHtml = async () =>
  new Response(HTML_FIXTURE, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });

const page = (
  path: string,
  headers: Record<string, string> = {},
  init: RequestInit = {},
  fetchHtml = stubHtml,
) => {
  const url = new URL("/api/page", ORIGIN);
  url.searchParams.set(PATH_PARAM, path);
  return handlePageRequest(new Request(url, { ...init, headers }), fetchHtml);
};

describe("resolvePath", () => {
  test("reads the page path forwarded by vercel.json", () => {
    const url = new URL(`/api/page?${PATH_PARAM}=/proof-of-work`, ORIGIN);
    expect(resolvePath(new Request(url))).toBe("/proof-of-work");
  });

  test("treats an empty forwarded path as the home page", () => {
    const url = new URL(`/api/page?${PATH_PARAM}=`, ORIGIN);
    expect(resolvePath(new Request(url))).toBe("/");
  });

  test("falls back to the real pathname", () => {
    expect(resolvePath(new Request(`${ORIGIN}/api/page`))).toBe("/api/page");
  });
});

describe("Accept: text/markdown", () => {
  for (const { path } of PAGES) {
    test(`${path} returns Markdown with the right Content-Type`, async () => {
      const response = await page(path, { accept: "text/markdown" });

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(await response.text()).toBe(markdownForPath(path)!);
    });

    test(`${path} sets Vary: Accept so CDNs key on the header`, async () => {
      const response = await page(path, { accept: "text/markdown" });
      expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    });

    test(`${path} names the selected variant with Content-Location`, async () => {
      const response = await page(path, { accept: "text/markdown" });
      const expected = PAGES.find((entry) => entry.path === path)!.markdownPath;
      expect(response.headers.get("Content-Location")).toBe(expected);
    });
  }

  test("is cacheable at the edge", async () => {
    const response = await page("/", { accept: "text/markdown" });
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=3600");
  });

  test("honours RFC 7763's variant parameter", async () => {
    const response = await page("/", {
      accept: "text/markdown;variant=GFM",
    });
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });
});

describe("q-value handling", () => {
  test("Markdown wins when ranked above HTML", async () => {
    const response = await page("/", {
      accept: "text/html;q=0.8, text/markdown;q=1.0",
    });
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  test("HTML wins when ranked above Markdown", async () => {
    const response = await page("/", {
      accept: "text/markdown;q=0.2, text/html;q=0.9",
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(await response.text()).toBe(HTML_FIXTURE);
  });

  test("an explicit q=0 on Markdown yields HTML, not a 406", async () => {
    const response = await page("/", {
      accept: "text/markdown;q=0, text/html",
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/html; charset=utf-8",
    );
  });

  test("the HTML variant also carries Vary: Accept", async () => {
    const response = await page("/", {
      accept: "text/markdown;q=0.2, text/html;q=0.9",
    });
    expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
  });
});

describe("unsatisfiable Accept", () => {
  test("gets a 406 listing the available representations", async () => {
    const response = await page("/", { accept: "application/pdf" });

    expect(response.status).toBe(406);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(response.headers.get("Vary")).toBe("Accept, Accept-Encoding");
    expect(response.headers.get("Cache-Control")).toBe("no-store");

    const text = await response.text();
    expect(text).toContain("text/html");
    expect(text).toContain("text/markdown");
    expect(text).toContain("You requested: application/pdf");
  });

  test("406s for a JSON-only request to an HTML page", async () => {
    expect((await page("/", { accept: "application/json" })).status).toBe(406);
  });
});

describe("resilience", () => {
  test("falls back to Markdown when the HTML subrequest fails", async () => {
    const response = await page(
      "/",
      { accept: "text/markdown;q=0.2, text/html;q=0.9" },
      {},
      async () => {
        throw new Error("upstream unavailable");
      },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  test("falls back to Markdown when the HTML subrequest 404s", async () => {
    const response = await page(
      "/",
      { accept: "text/markdown;q=0.2, text/html;q=0.9" },
      {},
      async () => new Response("nope", { status: 404 }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  test("404s for a path that is not a known page", async () => {
    const response = await page("/not-a-page", { accept: "text/markdown" });
    expect(response.status).toBe(404);
  });
});

describe("HEAD", () => {
  test("keeps the Markdown headers but drops the body", async () => {
    const response = await page(
      "/",
      { accept: "text/markdown" },
      { method: "HEAD" },
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(await response.text()).toBe("");
  });

  test("drops the body for the HTML variant too", async () => {
    const response = await page(
      "/",
      { accept: "text/markdown;q=0.2, text/html;q=0.9" },
      { method: "HEAD" },
    );
    expect(await response.text()).toBe("");
  });
});
