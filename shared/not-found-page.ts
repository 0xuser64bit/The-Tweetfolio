/**
 * Self-contained HTML for the 404 response.
 *
 * Rendered as a string rather than through React so both consumers can use it:
 * `api/not-found.ts` (which cannot import from the Vite build output) and
 * `scripts/prerender.ts` (which writes it to `build/404.html`). A single source
 * means the two can never drift — `tests/not-found.test.ts` asserts they match.
 *
 * Styles are inlined with the same tokens as `src/index.css`, so the page keeps
 * the site's look without depending on a content-hashed stylesheet.
 */

import { AGENT_RESOURCES, ORIGIN, absolute } from "./site";

const X_MARK_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";

export const NOT_FOUND_TITLE = "404 — Not Found";

export const NOT_FOUND_DESCRIPTION = `That page does not exist on ${ORIGIN}. Machine-readable indexes: /llms.txt, /sitemap.xml, /openapi.json.`;

/** Full HTML document for a 404. */
export const renderNotFoundHtml = (): string => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="robots" content="noindex, follow" />
    <meta name="description" content="${NOT_FOUND_DESCRIPTION}" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="alternate" type="text/plain" href="${absolute("/llms.txt")}" title="llms.txt" />
    <link rel="service-desc" type="application/json" href="${absolute("/openapi.json")}" title="OpenAPI" />
    <title>${NOT_FOUND_TITLE}</title>
    <style>
        :root {
            --bg: #000000;
            --text: #e7e9ea;
            --muted: #8b98a5;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1.5rem;
            background: var(--bg);
            color: var(--text);
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-weight: 400;
            -webkit-font-smoothing: antialiased;
        }

        main {
            width: 100%;
            max-width: 26.25rem;
            text-align: center;
        }

        svg {
            width: 2.5rem;
            height: 2.5rem;
            margin: 0 auto 1rem;
            display: block;
            fill: var(--text);
        }

        h1 {
            margin: 0 0 0.25rem;
            font-size: 20px;
            font-weight: 800;
            line-height: 1.2;
        }

        p {
            margin: 0 0 1.25rem;
            font-size: 15px;
            color: var(--muted);
        }

        a.home {
            display: inline-block;
            padding: 0.5rem 1.25rem;
            border-radius: 9999px;
            background: var(--text);
            color: var(--bg);
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
        }

        a.home:hover {
            opacity: 0.9;
        }

        nav {
            margin-top: 2rem;
            font-size: 13px;
            color: var(--muted);
        }

        nav ul {
            list-style: none;
            margin: 0.5rem 0 0;
            padding: 0;
        }

        nav li+li {
            margin-top: 0.25rem;
        }

        nav a {
            color: #1d9bf0;
        }

        a:focus-visible {
            outline: 2px solid #1d9bf0;
            outline-offset: 2px;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <main>
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="${X_MARK_PATH}" />
        </svg>
        <h1>Hmm…this page doesn't exist.</h1>
        <p>Try heading back to the feed.</p>
        <a class="home" href="/">Back to home</a>
        <nav aria-label="Machine-readable indexes">
            Looking for structured data?
            <ul>
${AGENT_RESOURCES.map(
  (resource) =>
    `                <li><a href="${resource.path}">${resource.title}</a> — ${resource.description}</li>`,
).join("\n")}
            </ul>
        </nav>
    </main>
</body>

</html>
`;
