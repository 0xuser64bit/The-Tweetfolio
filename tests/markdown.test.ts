import { describe, expect, test } from "bun:test";
import {
  markdownForPath,
  renderHomeMarkdown,
  renderLlmsFullTxt,
  renderLlmsTxt,
  renderNotFoundMarkdown,
  renderProofOfWorkMarkdown,
} from "../shared/markdown";
import {
  contributions,
  experience,
  mergedContributionCount,
  profile,
  projects,
  skills,
} from "../shared/content";
import { AGENT_RESOURCES, ORIGIN, PAGES, absolute } from "../shared/site";

const headings = (markdown: string, level: number): string[] =>
  [...markdown.matchAll(new RegExp(`^#{${level}} (.+)$`, "gm"))].map(
    (match) => match[1],
  );

describe("every page's Markdown", () => {
  for (const { path } of PAGES) {
    const body = markdownForPath(path)!;

    test(`${path} exists and starts with a single H1`, () => {
      expect(body).toBeString();
      expect(headings(body, 1)).toHaveLength(1);
      expect(body).toStartWith("# ");
    });

    test(`${path} carries substantially more than 500 characters`, () => {
      expect(body.length).toBeGreaterThan(500);
    });

    test(`${path} ends with exactly one trailing newline`, () => {
      expect(body).toEndWith("\n");
      expect(body).not.toEndWith("\n\n");
    });

    test(`${path} has no unresolved template artefacts`, () => {
      expect(body).not.toContain("undefined");
      expect(body).not.toContain("[object Object]");
      expect(body).not.toMatch(/\n{3,}/);
    });
  }

  test("returns undefined for a path with no Markdown", () => {
    expect(markdownForPath("/nope")).toBeUndefined();
  });

  test("tolerates a trailing slash", () => {
    expect(markdownForPath("/proof-of-work/")).toBe(
      markdownForPath("/proof-of-work"),
    );
  });
});

describe("home Markdown", () => {
  const body = renderHomeMarkdown();

  test("leads with the name and the bio", () => {
    expect(body).toStartWith(`# ${profile.name}`);
    expect(body).toContain(profile.bio);
  });

  test("lists the contact and profile links", () => {
    for (const value of [
      profile.location,
      profile.website,
      profile.x,
      profile.github,
      profile.email,
      profile.joined,
    ]) {
      expect(body).toContain(value);
    }
  });

  test("summarises the sections a reader would expect", () => {
    expect(headings(body, 2)).toEqual([
      "Proof of Work",
      "Open Source",
      "Experience",
      "Tech Stack",
      "Education",
      "Outside of code",
      "Machine-readable endpoints",
    ]);
  });

  test("reports the real project and contribution counts", () => {
    expect(body).toContain(`${projects.length} shipped projects`);
    expect(body).toContain(`${mergedContributionCount} pull requests merged`);
  });

  test("links every contribution and every experience entry", () => {
    for (const item of contributions) expect(body).toContain(item.url);
    for (const item of experience) expect(body).toContain(item.organization);
  });

  test("lists every skill", () => {
    for (const group of skills) {
      expect(body).toContain(group.category);
      for (const item of group.items) expect(body).toContain(item);
    }
  });

  test("points at the full project thread and its Markdown alternate", () => {
    expect(body).toContain(absolute("/proof-of-work"));
    expect(body).toContain(absolute("/proof-of-work.md"));
  });

  test("advertises every machine-readable endpoint", () => {
    for (const resource of AGENT_RESOURCES) {
      expect(body).toContain(absolute(resource.path));
    }
  });
});

describe("proof-of-work Markdown", () => {
  const body = renderProofOfWorkMarkdown();

  test("documents every project with its links and stack", () => {
    expect(headings(body, 3)).toEqual(projects.map((project) => project.name));

    for (const project of projects) {
      expect(body, project.name).toContain(project.url);
      if (project.repository) expect(body).toContain(project.repository);
      if (project.liveUrl) expect(body).toContain(project.liveUrl);
      for (const tech of project.techStack) expect(body).toContain(tech);
    }
  });

  test("states the thread length", () => {
    expect(body).toContain(`${projects.length} posts in thread`);
  });

  test("omits link lines for projects with no links", () => {
    expect(body).not.toContain("**Links:** \n");
  });
});

describe("llms.txt", () => {
  const body = renderLlmsTxt();

  test("follows the llmstxt.org shape: H1, blockquote, then sections", () => {
    const lines = body.split("\n");
    expect(lines[0]).toBe(`# ${profile.name}`);
    expect(lines[2]).toStartWith("> ");
    expect(headings(body, 1)).toHaveLength(1);
    expect(headings(body, 2)).toEqual(["Pages", "API", "Optional"]);
  });

  test("lists every page as a Markdown link with a description", () => {
    for (const page of PAGES) {
      expect(body).toContain(`[${page.title}](${absolute(page.markdownPath)})`);
      expect(body).toContain(page.description);
    }
  });

  test("explains how to negotiate Markdown", () => {
    expect(body).toContain("Accept: text/markdown");
  });

  test("links the API and the OpenAPI document", () => {
    expect(body).toContain(absolute("/api/v1"));
    expect(body).toContain(absolute("/openapi.json"));
  });

  test("uses only absolute URLs, as the spec recommends", () => {
    const links = [...body.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) expect(link).toStartWith("https://");
  });
});

describe("llms-full.txt", () => {
  const body = renderLlmsFullTxt();

  test("embeds every page's Markdown", () => {
    for (const page of PAGES) {
      expect(body).toContain(`<!-- ${absolute(page.path)} -->`);
      const pageBody = markdownForPath(page.path)!;
      expect(body).toContain(pageBody.split("\n")[0]);
    }
  });

  test("is larger than any single page", () => {
    for (const page of PAGES) {
      expect(body.length).toBeGreaterThan(markdownForPath(page.path)!.length);
    }
  });
});

describe("404 Markdown", () => {
  test("names the missing path when one is known", () => {
    const body = renderNotFoundMarkdown("/missing/thing");
    expect(body).toStartWith("# 404 — Not Found");
    expect(body).toContain("`/missing/thing`");
  });

  test("stays useful without a path", () => {
    const body = renderNotFoundMarkdown();
    expect(body).toContain(ORIGIN);
    expect(body).not.toContain("undefined");
  });

  test("links every machine-readable index", () => {
    const body = renderNotFoundMarkdown("/nope");
    for (const resource of AGENT_RESOURCES) {
      expect(body).toContain(absolute(resource.path));
    }
  });
});
