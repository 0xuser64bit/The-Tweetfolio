import React from "react";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineLink } from "react-icons/hi";
import {
  PROFILE_TAGS,
  DISPLAYNAME,
  X_USERNAME,
  GITHUB_USERNAME,
  GITHUB_QUOTE,
  ABOUT_YOU,
  JOINED_DATE,
  LOCATION,
  WEBSITE,
  GITHUB_FOLLOWERS,
  SkillsData,
} from "../../config";

const UserInfo = () => {
  const followingCount = Object.values(SkillsData).flat().length;

  return (
    <div className="text-x-text-primary border-x-border border-b">
      <div className="px-4 pb-4 pt-3">
        {/* Display name + handle */}
        <div>
          <h3 className="text-xl font-bold">{DISPLAYNAME}</h3>
          <h3 className="text-x-text-secondary text-[15px]">
            <a
              href={`https://x.com/${X_USERNAME}`}
              target="_blank"
              rel="noreferrer"
            >
              @{X_USERNAME}
            </a>
          </h3>
        </div>

        {/* Bio */}
        <div className="mt-3">
          <p className="text-[15px]">
            {GITHUB_QUOTE}{" "}
            <span className="text-x-text-secondary">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                @{GITHUB_USERNAME}
              </a>
            </span>
          </p>
          <p className="text-[15px] mt-1">{ABOUT_YOU}</p>
        </div>

        {/* Profile metadata row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-x-text-secondary text-[15px]">
          {LOCATION && (
            <span className="flex items-center gap-1">
              <HiOutlineLocationMarker className="text-base" />
              {LOCATION}
            </span>
          )}
          {WEBSITE && (
            <span className="flex items-center gap-1">
              <HiOutlineLink className="text-base" />
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
              <HiOutlineCalendar className="text-base" />
              Joined {JOINED_DATE}
            </span>
          )}
        </div>

        {/* Following / Followers */}
        <div className="flex gap-4 mt-3 text-[15px]">
          <span>
            <span className="font-bold text-x-text-primary">{followingCount}</span>{" "}
            <span className="text-x-text-secondary">Following</span>
          </span>
          <span>
            <span className="font-bold text-x-text-primary">{GITHUB_FOLLOWERS}</span>{" "}
            <span className="text-x-text-secondary">Followers</span>
          </span>
        </div>

        {/* Profile tags */}
        <div className="mt-3">
          <p className="text-[15px]">
            {PROFILE_TAGS.map((tag) => (
              <span
                className="hover:text-x-text-secondary cursor-pointer pe-2"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
