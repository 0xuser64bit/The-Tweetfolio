import React from "react";
import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Currently from "../src/components/user/Currently";
import Stats from "../src/components/user/Stats";
import ListProject from "../src/components/tweets/ListProject";
import {
  ContributionData,
  ABOUT_YOU,
  CURRENT_PROJECT,
  DISPLAYNAME,
  ProjectsData,
} from "../src/config";
import { profile } from "../shared/content";
import ImageDialog from "../src/components/user/ImageDialog";

describe("portfolio identity and proof", () => {
  test("keeps the indie-hacker bio", () => {
    expect(ABOUT_YOU).toBe(
      "Indie hacker shipping Solana + AI products. 20+ experiments, several live. Ex-Odoo, Superteam member.",
    );
    expect(profile.headline).toContain("Indie hacker");
  });

  test("positions Solana as central to Pawket", () => {
    const pawket = ProjectsData.find(
      ({ projectName }) => projectName === "Pawket",
    )!;
    expect(CURRENT_PROJECT.description).toContain("Solana-powered");
    expect(
      [CURRENT_PROJECT.description, ...(pawket.listItems ?? [])].join(" "),
    ).not.toMatch(/optional|play before crypto/i);
  });

  test("the current project resolves to exactly one real project", () => {
    expect(CURRENT_PROJECT.name).toBe("Pawket");
    expect(
      ProjectsData.filter(
        ({ projectName }) => projectName === CURRENT_PROJECT.name,
      ),
    ).toHaveLength(1);
  });

  test("photo viewers use a native modal with a keyboard-accessible close button", () => {
    const html = renderToStaticMarkup(
      <ImageDialog src="/profile.jpg" alt="Jack's photo" onClose={() => {}} />,
    );
    expect(html).toContain("<dialog");
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-label="Close photo"');
    expect(html).toContain("Jack&#x27;s photo");
  });

  test("uses Jack consistently in the UI and public profile", () => {
    expect(DISPLAYNAME).toBe("Jack");
    expect(profile.name).toBe(DISPLAYNAME);
  });

  test("describes Pawket rather than a React component library", () => {
    const html = renderToStaticMarkup(<Currently />);
    expect(html).toContain("Pawket");
    expect(html).toContain("companion game");
    expect(html).toContain("https://pawket.world");
    expect(html).not.toContain("interface craft for React");
  });

  test("counts only merged contributions as merged PRs", () => {
    const html = renderToStaticMarkup(<Stats />);
    const merged = ContributionData.filter(
      ({ status }) => status === "merged",
    ).length;
    expect(html).toMatch(new RegExp(`>${merged}</span><span[^>]*>PRs merged`));
  });
});

describe("project demo videos", () => {
  const renderDemo = (url: string) =>
    renderToStaticMarkup(
      <ListProject
        project="Demo"
        githubLink="#"
        liveProject="#"
        demoVideo={url}
      />,
    );

  test.each([
    ["1m30s", 90],
    ["1h2m3s", 3723],
    ["90", 90],
  ])("converts YouTube timestamp %s into seconds", (timestamp, seconds) => {
    expect(renderDemo(`https://youtu.be/LAD791HNC-g?t=${timestamp}`)).toContain(
      `https://www.youtube-nocookie.com/embed/LAD791HNC-g?start=${seconds}`,
    );
  });

  test("ignores invalid timestamps rather than emitting an empty start", () => {
    expect(renderDemo("https://youtu.be/LAD791HNC-g?t=bad")).not.toContain(
      "?start=",
    );
  });

  test("does not embed malformed YouTube video IDs", () => {
    expect(renderDemo("https://youtu.be/not-a-valid-video-id")).not.toContain(
      "<iframe",
    );
  });
});
