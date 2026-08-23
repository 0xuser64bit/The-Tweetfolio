import portfolio from "../shared/portfolio.json";
import type { Portfolio } from "../shared/types";

const data = portfolio as Portfolio;

export const {
  HEADER_DISPLAY_NAME,
  X_USERNAME,
  GITHUB_USERNAME,
  DISPLAYNAME,
  GITHUB_QUOTE,
  ABOUT_YOU,
  JOINED_DATE,
  LOCATION,
  WEBSITE,
  GITHUB_FOLLOWERS,
  CONTACT_EMAIL,
  PINNED_TWEET,
  EducationData,
  ExperienceData,
  SkillsData,
  ProjectsData,
  ContributionData,
  HobbiesData,
} = data;
