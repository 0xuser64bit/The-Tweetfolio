export interface Education {
  date: string;
  title: string;
  description: string;
}

export interface Experience {
  timeline: string;
  company_name: string;
  description: string;
}

export interface Project {
  projectName: string;
  listItems?: string[];
  githubLink: string;
  liveProject: string;
  techStack?: string;
  demoVideo?: string;
}

export type ContributionStatus = "merged" | "open" | "issued" | "solved";

export interface Contribution {
  title: string;
  link: string;
  status: ContributionStatus;
}

export interface PinnedTweet {
  content: string;
  cta_text: string;
  cta_link: string;
}

export interface Portfolio {
  HEADER_DISPLAY_NAME: string;
  X_USERNAME: string;
  GITHUB_USERNAME: string;
  DISPLAYNAME: string;
  GITHUB_QUOTE: string;
  ABOUT_YOU: string;
  JOINED_DATE: string;
  LOCATION: string;
  WEBSITE: string;
  GITHUB_FOLLOWERS: number;
  CONTACT_EMAIL: string;
  PINNED_TWEET: PinnedTweet;
  EducationData: Education[];
  ExperienceData: Experience[];
  SkillsData: Record<string, string[]>;
  ProjectsData: Project[];
  ContributionData: Contribution[];
  HobbiesData: string[];
}
