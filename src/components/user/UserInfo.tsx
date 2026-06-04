import React from "react";
import { HiOutlineLocationMarker, HiOutlineLink, HiOutlineCalendar } from "react-icons/hi";
import {
  DISPLAYNAME,
  X_USERNAME,
  GITHUB_USERNAME,
  GITHUB_QUOTE,
  ABOUT_YOU,
  LOCATION,
  WEBSITE,
  GITHUB_FOLLOWERS,
  JOINED_DATE,
  SkillsData,
} from "../../config";

const UserInfo = () => {
  const skillsCount = Object.values(SkillsData).flat().length;

  return (
    <div className="border-b border-x-border">
      <div className="px-4 pb-3 pt-3">
        {/* Display name + handle */}
        <h1 className="text-[20px] md:text-[23px] font-extrabold leading-tight text-x-text-primary">
          {DISPLAYNAME}
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
              <HiOutlineLocationMarker className="text-base shrink-0" aria-hidden="true" />
              {LOCATION}
            </span>
          )}
          {WEBSITE && (
            <span className="flex items-center gap-1">
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
            <span className="flex items-center gap-1">
              <HiOutlineCalendar className="text-base shrink-0" aria-hidden="true" />
              Joined {JOINED_DATE}
            </span>
          )}
        </div>

        {/* Skills / followers count */}
        <div className="flex gap-5 mt-3 text-[15px]">
          <span>
            <span className="font-bold text-x-text-primary">{skillsCount}</span>{" "}
            <span className="text-x-text-secondary">Skills</span>
          </span>
          <span>
            <span className="font-bold text-x-text-primary">{GITHUB_FOLLOWERS}</span>{" "}
            <span className="text-x-text-secondary">GitHub followers</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
