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

const UserInfo = () => {
  return (
    <div className="border-b border-x-border">
      <div className="px-4 pb-3 pt-3">
        {/* Display name + handle. The visible text stays "Arth" as designed;
            the sr-only span completes the name so the page's single H1 is
            self-describing for screen readers and text extractors alike. */}
        <h1 className="flex items-center gap-1 text-[20px] md:text-[23px] font-extrabold leading-tight text-x-text-primary">
          <span className="truncate">{DISPLAYNAME}</span>
          <span className="sr-only">
            {" "}
            Prajapati — Full-stack developer portfolio
          </span>
          <GoldVerifiedBadge className="w-[1.05em] h-[1.05em] shrink-0" />
        </h1>
        <p className="text-[15px] leading-tight text-x-text-secondary mt-0.5">
          <a
            href={`https://x.com/${X_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            @{X_USERNAME}
          </a>
        </p>

        {/* Bio */}
        <div className="mt-3 text-[15px] leading-5 text-x-text-primary">
          <p>
            {GITHUB_QUOTE}{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-x-accent hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
          <p className="mt-1">{ABOUT_YOU}</p>
        </div>

        {/* Profile metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-x-text-secondary text-[15px]">
          {LOCATION && (
            <span className="flex items-center gap-1">
              <HiOutlineLocationMarker
                className="text-base shrink-0"
                aria-hidden="true"
              />
              {LOCATION}
            </span>
          )}
          {WEBSITE && (
            <span className="flex items-center gap-1">
              <HiOutlineLink
                className="text-base shrink-0"
                aria-hidden="true"
              />
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
            <span className="flex items-center gap-1">
              <HiOutlineCalendar
                className="text-base shrink-0"
                aria-hidden="true"
              />
              Joined {JOINED_DATE}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
