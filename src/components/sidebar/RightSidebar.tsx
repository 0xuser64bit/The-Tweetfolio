import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { GITHUB_USERNAME, X_USERNAME, CONTACT_EMAIL } from "../../config";

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);


const connectLinks = [
  {
    name: "GitHub",
    handle: `@${GITHUB_USERNAME}`,
    icon: <FaGithub className="text-[22px]" />,
    iconBg: "bg-[#24292e]",
    iconColor: "text-white",
    url: `https://github.com/${GITHUB_USERNAME}`,
  },
  {
    name: "X / Twitter",
    handle: `@${X_USERNAME}`,
    icon: <XIcon />,
    iconBg: "bg-black",
    iconColor: "text-white",
    url: `https://x.com/${X_USERNAME}`,
  },
  {
    name: "Email",
    handle: CONTACT_EMAIL,
    icon: <SiGmail className="text-[20px]" />,
    iconBg: "bg-white",
    iconColor: "text-[#EA4335]",
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
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${link.iconBg} ${link.iconColor}`}>
              {link.icon}
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
