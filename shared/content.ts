/**
 * Normalized, environment-agnostic view of `portfolio.json`.
 *
 * The React app, the build-time prerenderer, and the Vercel Functions under
 * `/api` all read from here so the HTML, the Markdown alternates, and the JSON
 * API can never drift apart.
 */

import portfolio from "./portfolio.json";
import type { Contribution, Education, Experience, Portfolio } from "./types";
import { API_BASE, ORIGIN } from "./site";

const data = portfolio as Portfolio;

export type ProjectCategory = "All" | "Web3" | "AI" | "FullStack";

/**
 * Category assignments for the Proof of Work filter pills. Keys are
 * `projectName` values from portfolio.json.
 */
export const CATEGORY_MAP: Record<string, ProjectCategory[]> = {
  Praxis: ["Web3", "AI"],
  "Get Toasted": ["Web3", "FullStack"],
  ChibiTown: ["FullStack"],
  RugPulse: ["Web3"],
  DAOnation: ["Web3"],
  PollChain: ["Web3"],
  "Ask Genie": ["AI"],
  "Dev DNA": ["FullStack"],
  "Get-Git": ["FullStack"],
  "DD-Agent": ["AI"],
  "Echo-GPT": ["AI"],
  suchi: ["FullStack"],
  "The TweetFolio": ["FullStack"],
  Notebook: ["FullStack"],
  Canteen: ["FullStack"],
};

/** Default category for a project missing an explicit assignment. */
export const DEFAULT_CATEGORIES: ProjectCategory[] = ["FullStack"];

export const categoriesFor = (projectName: string): ProjectCategory[] =>
  CATEGORY_MAP[projectName] ?? DEFAULT_CATEGORIES;

/** Lowercase, hyphenated, URL-safe identifier derived from a display name. */
export const slugify = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export interface ProfileResource {
  name: string;
  handle: string;
  x: string;
  github: string;
  headline: string;
  bio: string;
  location: string;
  website: string;
  joined: string;
  email: string;
  availability: string;
  hobbies: string[];
}

export interface ProjectResource {
  slug: string;
  name: string;
  categories: ProjectCategory[];
  summary: string;
  description: string[];
  techStack: string[];
  repository: string | null;
  liveUrl: string | null;
  demoVideo: string | null;
  url: string;
}

export interface ExperienceResource {
  slug: string;
  organization: string;
  timeline: string;
  current: boolean;
  description: string;
}

export interface EducationResource {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface ContributionResource {
  slug: string;
  title: string;
  repository: string;
  reference: string | null;
  status: Contribution["status"];
  url: string;
}

export interface SkillGroupResource {
  slug: string;
  category: string;
  items: string[];
}

const optionalLink = (value: string | undefined): string | null =>
  value && value !== "#" ? value : null;

const splitSentences = (text: string): string[] =>
  text
    .split(/(?<=\.)\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

/** First sentence of a project's description, used for short previews. */
const firstSentence = (text: string): string => splitSentences(text)[0] ?? text;

export const profile: ProfileResource = {
  name: "Arth Prajapati",
  handle: data.X_USERNAME,
  x: `https://x.com/${data.X_USERNAME}`,
  github: `https://github.com/${data.GITHUB_USERNAME}`,
  headline: `${data.GITHUB_QUOTE} @${data.GITHUB_USERNAME}`,
  bio: data.ABOUT_YOU,
  location: data.LOCATION,
  website: `https://${data.WEBSITE}`,
  joined: data.JOINED_DATE,
  email: data.CONTACT_EMAIL,
  availability: data.PINNED_TWEET.content,
  hobbies: data.HobbiesData,
};

export const projects: ProjectResource[] = data.ProjectsData.map((project) => {
  const description = (project.listItems ?? []).flatMap(splitSentences);
  const slug = slugify(project.projectName);

  return {
    slug,
    name: project.projectName,
    categories: categoriesFor(project.projectName),
    summary: firstSentence((project.listItems ?? [])[0] ?? ""),
    description,
    techStack: (project.techStack ?? "")
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean),
    repository: optionalLink(project.githubLink),
    liveUrl: optionalLink(project.liveProject),
    demoVideo: optionalLink(project.demoVideo),
    url: `${ORIGIN}${API_BASE}/projects/${slug}`,
  };
});

export const projectBySlug = (slug: string): ProjectResource | undefined =>
  projects.find((project) => project.slug === slug);

export const experience: ExperienceResource[] = data.ExperienceData.map(
  (item: Experience) => ({
    slug: slugify(item.company_name),
    organization: item.company_name,
    timeline: item.timeline,
    current: item.timeline.toLowerCase().includes("present"),
    description: item.description,
  }),
);

export const education: EducationResource[] = data.EducationData.map(
  (item: Education) => ({
    slug: slugify(item.title),
    title: item.title,
    date: item.date,
    description: item.description,
  }),
);

const repoFromUrl = (url: string): string => {
  const parts = url.replace("https://github.com/", "").split("/");
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : url;
};

const referenceFromUrl = (url: string): string | null => {
  const tail = url.split("/").pop() ?? "";
  return /^\d+$/.test(tail) ? `#${tail}` : null;
};

export const contributions: ContributionResource[] = data.ContributionData.map(
  (item: Contribution) => ({
    slug: slugify(item.title),
    title: item.title,
    repository: repoFromUrl(item.link),
    reference: referenceFromUrl(item.link),
    status: item.status,
    url: item.link,
  }),
);

export const skills: SkillGroupResource[] = Object.entries(data.SkillsData).map(
  ([category, items]) => ({
    slug: slugify(category),
    category,
    items,
  }),
);

export const hobbies: string[] = data.HobbiesData;

export const mergedContributionCount = contributions.filter(
  (item) => item.status === "merged" || item.status === "solved",
).length;
