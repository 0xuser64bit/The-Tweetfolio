/**
 * RFC 9110 §12.5.1 `Accept` header parsing and proactive content negotiation.
 *
 * Implemented from the spec rather than substring-matched: real browser
 * `Accept` headers end in a catch-all range, so an `includes("markdown")` check
 * would happily send Markdown to Chrome.
 * See https://acceptmarkdown.com/guides/accept-parsing for the test vectors
 * mirrored in `tests/negotiate.test.ts`.
 */

export const HTML_TYPE = "text/html";
export const MARKDOWN_TYPE = "text/markdown";
export const JSON_TYPE = "application/json";

export const CHARSET = "; charset=utf-8";

export interface AcceptEntry {
  type: string;
  subtype: string;
  /** Quality factor, 0–1. Defaults to 1 when `q` is absent. */
  q: number;
  /** 3 = `type/subtype`, 2 = a subtype wildcard, 1 = catch-all. Breaks q ties. */
  specificity: number;
}

const clampQ = (raw: string | undefined): number => {
  if (raw === undefined) return 1;
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
};

/** Parse an `Accept` header into entries sorted by q, then by specificity. */
export const parseAccept = (
  header: string | null | undefined,
): AcceptEntry[] => {
  if (header === null || header === undefined) return [];

  const entries: AcceptEntry[] = [];

  for (const part of header.split(",")) {
    const segments = part.split(";");
    const range = (segments.shift() ?? "").trim().toLowerCase();
    if (!range) continue;

    const [type, subtype] = range.split("/");
    if (!type || !subtype) continue;

    let q: string | undefined;
    for (const segment of segments) {
      const [name, ...rest] = segment.split("=");
      if (name.trim().toLowerCase() === "q") q = rest.join("=").trim();
    }

    entries.push({
      type,
      subtype,
      q: clampQ(q),
      specificity: type === "*" ? 1 : subtype === "*" ? 2 : 3,
    });
  }

  return entries.sort((a, b) => b.q - a.q || b.specificity - a.specificity);
};

/** Quality the client assigned to `mediaType`, or 0 when it is unacceptable. */
export const qualityFor = (
  entries: AcceptEntry[],
  mediaType: string,
): number => {
  const [type, subtype] = mediaType.toLowerCase().split("/");

  let best: AcceptEntry | undefined;
  for (const entry of entries) {
    const matches =
      (entry.type === type && entry.subtype === subtype) ||
      (entry.type === type && entry.subtype === "*") ||
      (entry.type === "*" && entry.subtype === "*");
    if (!matches) continue;
    // Entries are pre-sorted, so the first match is the most specific
    // highest-q match. `q=0` still wins here: it is an explicit rejection.
    if (
      !best ||
      entry.specificity > best.specificity ||
      (entry.specificity === best.specificity && entry.q > best.q)
    ) {
      best = entry;
    }
  }

  return best?.q ?? 0;
};

export interface NegotiationResult {
  /** Chosen media type, or `null` when the request must be answered with 406. */
  mediaType: string | null;
}

/**
 * Choose a representation.
 *
 * `produces` is ordered by server preference; its first entry is the default
 * served when the client expresses no constraint (absent header or catch-all).
 * A whitespace-only header is a constraint that nothing satisfies, so it is
 * *not* treated as absent.
 */
export const negotiate = (
  header: string | null | undefined,
  produces: readonly string[],
): NegotiationResult => {
  if (produces.length === 0) return { mediaType: null };
  if (header === null || header === undefined) {
    return { mediaType: produces[0] };
  }

  const entries = parseAccept(header);
  if (entries.length === 0) {
    // A present-but-empty `Accept` is a constraint that nothing satisfies,
    // unlike an absent one. RFC 9110 §12.5.1.
    return { mediaType: null };
  }

  let chosen: string | null = null;
  let chosenQuality = 0;

  for (const candidate of produces) {
    const quality = qualityFor(entries, candidate);
    if (quality > chosenQuality) {
      chosen = candidate;
      chosenQuality = quality;
    }
  }

  return { mediaType: chosenQuality > 0 ? chosen : null };
};

/** Response headers every negotiated response must carry. */
export const varyHeaders = (): Record<string, string> => ({
  Vary: "Accept, Accept-Encoding",
});

/**
 * Plain-text body for a 406, listing what the resource can produce.
 * RFC 9110 §15.5.7 recommends enumerating the available representations.
 */
export const notAcceptableBody = (
  produces: readonly string[],
  requested: string | null | undefined,
): string =>
  [
    "This resource is available in:",
    ...produces.map((type) => `- ${type}`),
    "",
    `You requested: ${requested?.trim() || "(empty Accept header)"}`,
    "",
    "Retry with one of the media types listed above.",
  ].join("\n") + "\n";
