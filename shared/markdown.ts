/**
 * Markdown renderers for the site's content.
 *
 * The same output is written to static `.md` files at build time (served via
 * `Accept: text/markdown` negotiation and linked from `llms.txt`), so this
 * module must stay free of environment-specific APIs.
 */

import {
  contributions,
  education,
  experience,
  hobbies,
  mergedContributionCount,
  profile,
  projects,
  skills,
  type ProjectResource,
} from "./content";
import {
  AGENT_RESOURCES,
  API_BASE,
  LLMS_FULL_PATH,
  ORIGIN,
  PAGES,
  SITE_NAME,
  absolute,
} from "./site";

const join = (blocks: string[]): string =>
  blocks.filter(Boolean).join("\n\n").trimEnd() + "\n";

const bullet = (label: string, value: string | null): string | null =>
  value ? `- **${label}:** ${value}` : null;

const projectSection = (project: ProjectResource, level = 3): string => {
  const heading = "#".repeat(level);
  const links = [
    project.repository ? `[Source](${project.repository})` : null,
    project.liveUrl ? `[Live](${project.liveUrl})` : null,
    project.demoVideo ? `[Demo video](${project.demoVideo})` : null,
  ].filter(Boolean);

  return join([
    `${heading} ${project.name}`,
    project.description.join(" "),
    [
      bullet("Categories", project.categories.join(", ")),
      bullet(
        "Tech stack",
        project.techStack.length ? project.techStack.join(", ") : null,
      ),
      links.length ? `- **Links:** ${links.join(" · ")}` : null,
      bullet("API", project.url),
    ]
      .filter(Boolean)
      .join("\n"),
  ]).trimEnd();
};

/** Markdown for `/` — the portfolio home feed. */
export const renderHomeMarkdown = (): string =>
  join([
    `# ${profile.name} — Developer Portfolio`,
    `${profile.headline}. ${profile.bio}`,
    profile.availability,
    [
      bullet("Location", profile.location),
      bullet("Website", profile.website),
      bullet("X", profile.x),
      bullet("GitHub", profile.github),
      bullet("Email", profile.email),
      bullet("Joined", profile.joined),
    ]
      .filter(Boolean)
      .join("\n"),

    "## Proof of Work",
    `${projects.length} shipped projects. Full thread: ${absolute("/proof-of-work")} (Markdown: ${absolute("/proof-of-work.md")}).`,
    projects
      .slice(0, 3)
      .map((project) => `- **${project.name}** — ${project.summary}`)
      .join("\n"),

    "## Open Source",
    `${mergedContributionCount} pull requests merged across the ecosystem.`,
    contributions
      .map(
        (item) =>
          `- [${item.title}](${item.url}) — ${item.repository}${
            item.reference ? ` ${item.reference}` : ""
          } (${item.status})`,
      )
      .join("\n"),

    "## Experience",
    experience
      .map((item) =>
        [
          `### ${item.organization}${item.current ? " (current)" : ""}`,
          item.timeline,
          item.description,
        ].join("\n\n"),
      )
      .join("\n\n"),

    "## Tech Stack",
    skills
      .map((group) => `- **${group.category}:** ${group.items.join(", ")}`)
      .join("\n"),

    "## Education",
    education
      .map((item) =>
        [`### ${item.title}`, item.date, item.description]
          .filter(Boolean)
          .join("\n\n"),
      )
      .join("\n\n"),

    "## Outside of code",
    hobbies.map((hobby) => `- ${hobby}`).join("\n"),

    "## Machine-readable endpoints",
    AGENT_RESOURCES.map(
      (resource) =>
        `- [${resource.title}](${absolute(resource.path)}) — ${resource.description}`,
    ).join("\n"),
  ]);

/** Markdown for `/proof-of-work` — every project, in feed order. */
export const renderProofOfWorkMarkdown = (): string =>
  join([
    `# Proof of Work — ${profile.name}`,
    `Every project ${profile.name} has shipped, in the order it appears on ${absolute("/proof-of-work")}. ${projects.length} posts in thread.`,
    "## Projects",
    projects.map((project) => projectSection(project)).join("\n\n"),
    "## Machine-readable endpoints",
    `- [JSON API](${absolute(`${API_BASE}/projects`)}) — the same list as JSON.`,
    `- [OpenAPI](${absolute("/openapi.json")}) — describes every endpoint.`,
  ]);

const MARKDOWN_BY_PATH: Record<string, () => string> = {
  "/": renderHomeMarkdown,
  "/proof-of-work": renderProofOfWorkMarkdown,
};

/** Markdown for a canonical page path, or `undefined` if the page has none. */
export const markdownForPath = (path: string): string | undefined => {
  const normalized =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  return MARKDOWN_BY_PATH[normalized]?.();
};

/** `llms.txt` — the curated index defined by https://llmstxt.org. */
export const renderLlmsTxt = (): string =>
  join([
    `# ${profile.name}`,
    `> ${profile.bio} Portfolio presented as an X/Twitter feed. ${SITE_NAME} is the open-source project behind it.`,
    "Every page below is available as Markdown at the same URL with a `.md` suffix, or by sending `Accept: text/markdown` to the HTML URL.",

    "## Pages",
    PAGES.map(
      (page) =>
        `- [${page.title}](${absolute(page.markdownPath)}): ${page.description}`,
    ).join("\n"),

    "## API",
    AGENT_RESOURCES.filter((resource) => resource.path.startsWith("/api"))
      .concat(
        AGENT_RESOURCES.filter((resource) => resource.path === "/openapi.json"),
      )
      .map(
        (resource) =>
          `- [${resource.title}](${absolute(resource.path)}): ${resource.description}`,
      )
      .join("\n"),

    "## Optional",
    [
      `- [llms-full.txt](${absolute(LLMS_FULL_PATH)}): Every page concatenated as Markdown.`,
      `- [sitemap.xml](${absolute("/sitemap.xml")}): All canonical HTML URLs.`,
      `- [Source code](${profile.github}/The-Tweetfolio): The site's own repository.`,
    ].join("\n"),
  ]);

/** `llms-full.txt` — every page's Markdown in one document. */
export const renderLlmsFullTxt = (): string =>
  join([
    `# ${profile.name} — Full Site Content`,
    `Concatenated Markdown for every page on ${ORIGIN}. Generated at build time from the same data that renders the HTML.`,
    PAGES.map((page) => {
      const body = markdownForPath(page.path);
      return body
        ? `---\n\n<!-- ${absolute(page.path)} -->\n\n${body.trim()}`
        : "";
    })
      .filter(Boolean)
      .join("\n\n"),
  ]);

/** Markdown body served with agent-facing 404 responses. */
export const renderNotFoundMarkdown = (path?: string): string =>
  join([
    "# 404 — Not Found",
    path
      ? `\`${path}\` does not exist on ${ORIGIN}.`
      : `That path does not exist on ${ORIGIN}.`,
    "## Where to go instead",
    AGENT_RESOURCES.map(
      (resource) =>
        `- [${resource.title}](${absolute(resource.path)}) — ${resource.description}`,
    ).join("\n"),
    `Human-readable entry point: [${ORIGIN}](${ORIGIN}/)`,
  ]);
