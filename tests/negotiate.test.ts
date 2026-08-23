import { describe, expect, test } from "bun:test";
import {
  HTML_TYPE,
  JSON_TYPE,
  MARKDOWN_TYPE,
  negotiate,
  notAcceptableBody,
  parseAccept,
  qualityFor,
  varyHeaders,
} from "../shared/negotiate";

const PAGE_PRODUCES = [HTML_TYPE, MARKDOWN_TYPE] as const;

describe("parseAccept", () => {
  test("returns an empty list for an absent header", () => {
    expect(parseAccept(null)).toEqual([]);
    expect(parseAccept(undefined)).toEqual([]);
  });

  test("defaults q to 1 and records specificity", () => {
    expect(parseAccept("text/markdown")).toEqual([
      { type: "text", subtype: "markdown", q: 1, specificity: 3 },
    ]);
    expect(parseAccept("text/*")[0].specificity).toBe(2);
    expect(parseAccept("*/*")[0].specificity).toBe(1);
  });

  test("sorts by q descending, then by specificity", () => {
    const entries = parseAccept("*/*;q=0.8, text/html;q=0.9, text/markdown");
    expect(entries.map((e) => `${e.type}/${e.subtype}`)).toEqual([
      "text/markdown",
      "text/html",
      "*/*",
    ]);
  });

  test("is case-insensitive and tolerates whitespace", () => {
    expect(parseAccept("  TEXT/Markdown ; Q=0.5 ")).toEqual([
      { type: "text", subtype: "markdown", q: 0.5, specificity: 3 },
    ]);
  });

  test("ignores non-q parameters such as RFC 7763's variant", () => {
    const [entry] = parseAccept("text/markdown;variant=GFM;q=0.4");
    expect(entry.q).toBe(0.4);
  });

  test("clamps out-of-range and malformed q values", () => {
    expect(parseAccept("text/html;q=5")[0].q).toBe(1);
    expect(parseAccept("text/html;q=-2")[0].q).toBe(0);
    expect(parseAccept("text/html;q=abc")[0].q).toBe(1);
  });

  test("skips malformed ranges", () => {
    expect(parseAccept("text/html, garbage, ,application/json")).toHaveLength(
      2,
    );
  });
});

describe("qualityFor", () => {
  test("prefers an exact match over a wildcard", () => {
    const entries = parseAccept("*/*;q=0.1, text/markdown;q=0.9");
    expect(qualityFor(entries, MARKDOWN_TYPE)).toBe(0.9);
    expect(qualityFor(entries, HTML_TYPE)).toBe(0.1);
  });

  test("matches subtype wildcards", () => {
    expect(qualityFor(parseAccept("text/*;q=0.7"), MARKDOWN_TYPE)).toBe(0.7);
  });

  test("returns 0 for an unmatched type", () => {
    expect(qualityFor(parseAccept("application/pdf"), HTML_TYPE)).toBe(0);
  });

  test("honours an explicit q=0 rejection over a wildcard", () => {
    const entries = parseAccept("*/*, text/markdown;q=0");
    expect(qualityFor(entries, MARKDOWN_TYPE)).toBe(0);
    expect(qualityFor(entries, HTML_TYPE)).toBe(1);
  });
});

/**
 * The published test vectors from
 * https://acceptmarkdown.com/guides/accept-parsing#test-vectors
 */
describe("negotiate — acceptmarkdown.com test vectors", () => {
  const vectors: [string | null, readonly string[], string | null][] = [
    ["text/markdown", PAGE_PRODUCES, MARKDOWN_TYPE],
    ["text/markdown, text/html;q=0.8", PAGE_PRODUCES, MARKDOWN_TYPE],
    ["text/html", PAGE_PRODUCES, HTML_TYPE],
    ["text/markdown;q=0, text/html", PAGE_PRODUCES, HTML_TYPE],
    ["text/markdown;q=0", [MARKDOWN_TYPE], null],
    [null, PAGE_PRODUCES, HTML_TYPE],
    ["*/*", PAGE_PRODUCES, HTML_TYPE],
  ];

  for (const [header, produces, expected] of vectors) {
    test(`Accept: ${header ?? "(absent)"} → ${expected ?? "406"}`, () => {
      expect(negotiate(header, produces).mediaType).toBe(expected);
    });
  }
});

describe("negotiate", () => {
  test("a real Chrome header still gets HTML", () => {
    const chrome =
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
    expect(negotiate(chrome, PAGE_PRODUCES).mediaType).toBe(HTML_TYPE);
  });

  test("an unsupported type yields 406 rather than a silent fallback", () => {
    expect(negotiate("application/pdf", PAGE_PRODUCES).mediaType).toBeNull();
  });

  test("a present-but-empty Accept is a constraint nothing satisfies", () => {
    expect(negotiate("", PAGE_PRODUCES).mediaType).toBeNull();
  });

  test("server preference order breaks exact ties", () => {
    expect(negotiate("text/markdown, text/html", PAGE_PRODUCES).mediaType).toBe(
      HTML_TYPE,
    );
    expect(
      negotiate("text/markdown, text/html", [MARKDOWN_TYPE, HTML_TYPE])
        .mediaType,
    ).toBe(MARKDOWN_TYPE);
  });

  test("q ordering beats server preference", () => {
    expect(
      negotiate("text/html;q=0.5, text/markdown;q=0.9", PAGE_PRODUCES)
        .mediaType,
    ).toBe(MARKDOWN_TYPE);
  });

  test("picks JSON when that is all the client accepts", () => {
    expect(
      negotiate("application/json", [HTML_TYPE, MARKDOWN_TYPE, JSON_TYPE])
        .mediaType,
    ).toBe(JSON_TYPE);
  });

  test("returns null when the server produces nothing", () => {
    expect(negotiate("*/*", []).mediaType).toBeNull();
  });
});

describe("varyHeaders", () => {
  test("includes Accept so CDNs key on it, plus Accept-Encoding", () => {
    expect(varyHeaders()).toEqual({ Vary: "Accept, Accept-Encoding" });
  });
});

describe("notAcceptableBody", () => {
  test("lists every available representation and echoes the request", () => {
    const body = notAcceptableBody(PAGE_PRODUCES, "application/pdf");
    expect(body).toContain(`- ${HTML_TYPE}`);
    expect(body).toContain(`- ${MARKDOWN_TYPE}`);
    expect(body).toContain("You requested: application/pdf");
  });

  test("describes an empty Accept header readably", () => {
    expect(notAcceptableBody(PAGE_PRODUCES, "")).toContain(
      "(empty Accept header)",
    );
  });
});
