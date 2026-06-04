import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import {
  GITHUB_USERNAME,
  X_USERNAME,
  CONTACT_EMAIL,
  ProjectsData,
} from "../../config";

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const connectLinks = [
  {
    name: "GitHub",
    handle: `@${GITHUB_USERNAME}`,
    icon: <FaGithub className="text-[20px]" aria-hidden="true" />,
    iconBg: "bg-[#161b22]",
    iconColor: "text-white",
    url: `https://github.com/${GITHUB_USERNAME}`,
    external: true,
  },
  {
    name: "X / Twitter",
    handle: `@${X_USERNAME}`,
    icon: <XIcon />,
    iconBg: "bg-black",
    iconColor: "text-white",
    url: `https://x.com/${X_USERNAME}`,
    external: true,
  },
  {
    name: "Email",
    handle: CONTACT_EMAIL,
    icon: <SiGmail className="text-[16px]" aria-hidden="true" />,
    iconBg: "bg-white",
    iconColor: "text-[#EA4335]",
    url: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
];

const RightSidebar = () => {
  const latest = ProjectsData?.[0];

  return (
    <div className="sticky top-2 flex flex-col gap-3 pt-2 max-h-screen overflow-y-auto no-scrollbar pb-4">
      {/* Status card — "Now" */}
      <section
        aria-label="Current status"
        className="bg-x-secondary rounded-2xl p-4"
      >
        <header className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full bg-x-retweet"
            aria-hidden="true"
          />
          <h2 className="text-[15px] font-bold text-x-text-primary">
            Available for work
          </h2>
        </header>
        {latest && (
          <p className="text-[13px] text-x-text-secondary leading-5">
            Currently shipping{" "}
            <span className="text-x-text-primary font-medium">
              {latest.projectName}
            </span>{" "}
            — open to freelance & collab.
          </p>
        )}
      </section>

      {/* Connect card */}
      <section
        aria-label="Connect with me"
        className="bg-x-secondary rounded-2xl overflow-hidden"
      >
        <h2 className="text-[20px] font-extrabold text-x-text-primary px-4 pt-3 pb-2">
          Connect
        </h2>
        <ul>
          {connectLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex items-center gap-3 px-4 py-3 hover:bg-x-hover transition-colors"
              >
                <span
                  className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${link.iconBg} ${link.iconColor}`}
                >
                  {link.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[15px] font-bold text-x-text-primary truncate">
                    {link.name}
                  </span>
                  <span className="block text-[13px] text-x-text-secondary truncate">
                    {link.handle}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer links */}
      <footer className="px-4 text-[13px] text-x-text-secondary leading-5">
        <p>
          © {new Date().getFullYear()} Arth Prajapati ·{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}/The-Tweetfolio`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Source
          </a>
        </p>
      </footer>
    </div>
  );
};

export default RightSidebar;
