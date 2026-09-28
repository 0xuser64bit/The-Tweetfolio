import React from "react";
import {
  HiOutlineLocationMarker,
  HiOutlineLink,
  HiOutlineCalendar,
} from "react-icons/hi";
import {
  DISPLAYNAME,
  X_USERNAME,
  GITHUB_USERNAME,
  GITHUB_QUOTE,
  ABOUT_YOU,
  LOCATION,
  WEBSITE,
  JOINED_DATE,
} from "../../config";
import GoldVerifiedBadge from "./GoldVerifiedBadge";
import Currently from "./Currently";
import Stats from "./Stats";

const UserInfo = () => {
  return (
    <div className="border-b border-x-border">
      <div className="px-4 pb-4 pt-3">
        {/* Display name + handle. The visible text stays "Arth" as designed;
            the sr-only span completes the name so the page's single H1 is
            self-describing for screen readers and text extractors alike. */}
        <h1 className="flex items-center gap-1.5 text-[22px] md:text-[24px] font-extrabold leading-tight text-x-text-primary">
          <span className="truncate">{DISPLAYNAME}</span>
          <span className="sr-only">
            {" "}
            Prajapati — Full-stack developer portfolio
          </span>
          <GoldVerifiedBadge className="w-[1.1em] h-[1.1em] shrink-0" />
        </h1>
        <a
          href={`https://x.com/${X_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="meta-mono text-x-text-secondary hover:text-x-accent transition-colors mt-0.5 inline-block"
        >
          @{X_USERNAME}
        </a>

        {/* Bio — editorial voice, two short paragraphs */}
        <div className="mt-3 text-[15px] leading-6 text-x-text-primary space-y-2">
          <p>
            <span className="font-semibold">{GITHUB_QUOTE}</span>{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-x-accent hover:underline font-medium"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
          <p className="text-x-text-secondary">{ABOUT_YOU}</p>
        </div>

        {/* Live status */}
        <Currently />

        {/* Profile metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-x-text-secondary text-[14px]">
          {LOCATION && (
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker
                className="text-base shrink-0"
                aria-hidden="true"
              />
              {LOCATION}
            </span>
          )}
          {WEBSITE && (
            <span className="flex items-center gap-1.5">
              <HiOutlineLink className="text-base shrink-0" aria-hidden="true" />
              <a
                href={`https://${WEBSITE}`}
                target="_blank"
                rel="noreferrer"
                className="text-x-accent hover:underline"
              >
                {WEBSITE}
              </a>
            </span>
          )}
          {JOINED_DATE && (
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar
                className="text-base shrink-0"
                aria-hidden="true"
              />
              Joined {JOINED_DATE}
            </span>
          )}
        </div>

        {/* Social proof */}
        <Stats />
      </div>
    </div>
  );
};

export default UserInfo;
