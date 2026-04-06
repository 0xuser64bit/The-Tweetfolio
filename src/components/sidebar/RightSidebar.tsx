import React from "react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import { GITHUB_USERNAME, X_USERNAME, CONTACT_EMAIL } from "../../config";

const connectLinks = [
  {
    name: "GitHub",
    handle: `@${GITHUB_USERNAME}`,
    icon: <FaGithub className="text-xl" />,
    url: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    name: "X / Twitter",
    handle: `@${X_USERNAME}`,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 50 50">
        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
      </svg>
    ),
    url: `https://x.com/${X_USERNAME}`,
  },
  {
    name: "Email",
    handle: CONTACT_EMAIL,
    icon: <HiOutlineMail className="text-xl" />,
    url: `mailto:${CONTACT_EMAIL}`,
  },
];

const RightSidebar = () => {
  return (
    <div className="sticky top-4 flex flex-col gap-4">
      {/* Who to follow — Connect */}
      <div className="bg-x-secondary rounded-2xl py-3">
        <h2 className="text-xl font-bold text-x-text-primary px-4 pb-2">Who to follow</h2>
        {connectLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-x-tertiary transition-colors"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img src={PROFILE_IMAGE} alt={link.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-x-text-primary truncate">{link.name}</p>
              <p className="text-[13px] text-x-text-secondary truncate">{link.handle}</p>
            </div>
            <span className="border border-x-border text-x-text-primary rounded-full px-4 py-1.5 text-sm font-bold hover:bg-x-tertiary transition-colors whitespace-nowrap">
              Follow
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;
