import { RxGithubLogo } from "react-icons/rx";
import { HiOutlineSun, HiOutlineMoon, HiMoon } from "react-icons/hi2";
import {
  DISPLAYNAME,
  GITHUB_USERNAME,
  X_USERNAME,
  ProjectsData,
  ContributionData,
} from "../config";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const { theme, cycleTheme } = useTheme();

  const themeMeta = {
    "lights-out": { icon: <HiMoon className="text-xl" />, next: "dim" },
    dim: { icon: <HiOutlineMoon className="text-xl" />, next: "light" },
    light: { icon: <HiOutlineSun className="text-xl" />, next: "lights-out" },
  } as const;

  const ThemeIcon = themeMeta[theme].icon;

  return (
    <div className="text-x-text-primary sticky top-0 px-4 py-3 font-bold z-30 bg-x-primary/80 backdrop-blur-md border-b border-x-border">
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Tiny X mark on mobile in place of the (now hidden) left sidebar logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-x-text-primary md:hidden shrink-0"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <div className="min-w-0">
            <p className="text-[17px] md:text-xl font-extrabold leading-tight truncate">
              {DISPLAYNAME}
            </p>
            <p className="text-[13px] font-normal text-x-text-secondary leading-tight">
              {ProjectsData.length + ContributionData.length} posts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={cycleTheme}
            title={`Theme: ${theme}`}
            aria-label={`Switch to ${themeMeta[theme].next} theme (current: ${theme})`}
            className="p-2 rounded-full hover:bg-x-hover transition-colors text-x-text-primary"
          >
            {ThemeIcon}
          </button>
          <a
            href={`https://github.com/${GITHUB_USERNAME}/The-Tweetfolio`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-x-hover transition-colors text-x-text-primary"
            aria-label="View source on GitHub"
          >
            <RxGithubLogo className="text-xl" />
          </a>
          <a
            href={`https://x.com/${X_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full hover:bg-x-hover transition-colors text-x-text-primary"
            aria-label="Follow on X"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
