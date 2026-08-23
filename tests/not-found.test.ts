import { describe, expect, test } from "bun:test";
import { handleNotFound, requestedPath } from "../server/not-found";
import { PATH_PARAM } from "../shared/api";
import { renderNotFoundHtml } from "../shared/not-found-page";
import { AGENT_RESOURCES, ORIGIN, absolute } from "../shared/site";

const notFound = (
  path: string,
  headers: Record<string, string> = {},
): Response => {
  const url = new URL("/api/not-found", ORIGIN);
  url.searchParams.set(PATH_PARAM, path.replace(/^\/+/, ""));
  return handleNotFound(new Request(url, { headers }));
};

describe("requestedPath", () => {
  test("reads the original path forwarded by vercel.json", () => {
    const url = new URL(`/api/not-found?${PATH_PARAM}=some/deep/path`, ORIGIN);
    expect(requestedPath(new Request(url))).toBe("/some/deep/path");
  });

  test("falls back to the actual pathname when nothing was forwarded", () => {
    expect(requestedPath(new Request(`${ORIGIN}/api/not-found`))).toBe(
      "/api/not-found",
    );
  });

  test("normalises an empty forwarded path", () => {
    const url = new URL(`/api/not-found?${PATH_PARAM}=`, ORIGIN);
    expect(requestedPath(new Request(url))).toBe("/");
  });
});

describe("status", () => {
  test("is always 404, for every Accept header", () => {
    for (const accept of [
      "text/html",
      "text/markdown",
      "application/json",
      "*/*",
      "application/pdf",
      "image/png",
      "",
    ]) {
      expect(notFound("/nope", { accept }).status, accept).toBe(404);
    }
    expect(notFound("/nope").status).toBe(404);
  });

  test("is never cached, since the body is negotiated", () => {
    expect(notFound("/nope").headers.get("Cache-Control")).toBe("no-store");
  });

  test("always sets Vary: Accept", () => {
    for (const accept of ["text/html", "text/markdown", "application/json"]) {
      expect(notFound("/nope", { accept }).headers.get("Vary")).toBe(
        "Accept, Accept-Encoding",
      );
    }
  });
});

describe("default representation", () => {
  // curl sends `Accept: */*` and no `Sec-Fetch-Mode`, so an agent probing a
  // dead path gets the Markdown body the audit asks for.
  test("is Markdown for a wildcard Accept (curl, most agents)", async () => {
    const response = notFound("/nope", { accept: "*/*" });
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(await response.text()).toStartWith("# 404");
  });

  test("is Markdown when no Accept header is sent at all", () => {
    expect(notFound("/nope").headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  test("is HTML for a browser navigation", () => {
    const response = notFound("/nope", {
      accept: "text/html,application/xhtml+xml,*/*;q=0.8",
      "sec-fetch-mode": "navigate",
    });
    expect(response.headers.get("Content-Type")).toBe(
      "text/html; charset=utf-8",
    );
  });
});

describe("Markdown body", () => {
  test("points agents at the sitemap, llms.txt, and the OpenAPI document", async () => {
    const text = await notFound("/some/missing/path", {
      accept: "text/markdown",
    }).text();

    expect(text).toStartWith("# 404 — Not Found");
    expect(text).toContain("/some/missing/path");
    expect(text).toContain(absolute("/sitemap.xml"));
    expect(text).toContain(absolute("/llms.txt"));
    expect(text).toContain(absolute("/openapi.json"));
    expect(text).toContain(absolute("/api/v1"));
  });

  test("stays short enough to be cheap for an agent to read", async () => {
    const text = await notFound("/nope", { accept: "text/markdown" }).text();
    expect(text.length).toBeLessThan(1200);
  });
});

describe("JSON body", () => {
  test("uses the shared error envelope and lists the agent resources", async () => {
    const response = notFound("/nope", { accept: "application/json" });
    expect(response.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );

    const payload = (await response.json()) as any;
    expect(payload.error.code).toBe("not_found");
    expect(payload.error.status).toBe(404);
    expect(payload.error.message).toContain("/nope");
    expect(payload.error.hint).toContain("/sitemap.xml");
    expect(payload.error.documentation).toBe(absolute("/openapi.json"));
    expect(payload.resources.map((r: any) => r.path)).toEqual(
      AGENT_RESOURCES.map((r) => r.path),
    );
  });
});

describe("HTML body", () => {
  test("is the same document written to build/404.html", async () => {
    const response = notFound("/nope", { accept: "text/html" });
    expect(await response.text()).toBe(renderNotFoundHtml());
  });

  test("is noindex, keeps the site's design, and links the agent resources", () => {
    const html = renderNotFoundHtml();
    expect(html).toContain('content="noindex, follow"');
    expect(html).toContain("Hmm…this page doesn't exist.");
    expect(html).toContain('href="/"');
    for (const resource of AGENT_RESOURCES) {
      expect(html).toContain(`href="${resource.path}"`);
    }
  });

  test("is self-contained: no build-hashed stylesheet or script", () => {
    const html = renderNotFoundHtml();
    expect(html).not.toContain("/assets/");
    expect(html).not.toContain("<script");
  });
});

describe("unsatisfiable Accept", () => {
  /**
   * A missing resource has no representation to negotiate, so 404 outranks 406.
   * It also means the audit's probe prints 404 for every client, including an
   * image crawler asking for a missing asset.
   */
  test("still gets 404, with the available representations listed", async () => {
    for (const accept of ["application/pdf", "image/png", "text/csv"]) {
      const response = notFound("/nope", { accept });
      expect(response.status, accept).toBe(404);
      expect(response.headers.get("Content-Type")).toBe(
        "text/plain; charset=utf-8",
      );

      const text = await response.text();
      expect(text).toStartWith("404 Not Found: /nope");
      expect(text).toContain("text/markdown");
      expect(text).toContain("text/html");
      expect(text).toContain("application/json");
      expect(text).toContain(`You requested: ${accept}`);
    }
  });

  test("a present-but-empty Accept also gets 404", () => {
    expect(notFound("/nope", { accept: "" }).status).toBe(404);
  });
});

describe("HEAD", () => {
  test("keeps the status and headers but drops the body", async () => {
    const url = new URL(`/api/not-found?${PATH_PARAM}=nope`, ORIGIN);
    const response = handleNotFound(new Request(url, { method: "HEAD" }));
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(await response.text()).toBe("");
  });
});
