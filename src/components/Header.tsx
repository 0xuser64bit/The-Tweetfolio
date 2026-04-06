import { RxGithubLogo } from "react-icons/rx";
import { HiSun, HiMoon } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";
import { GITHUB_USERNAME, HEADER_DISPLAY_NAME, X_USERNAME } from "../config";
import PROFILE_IMAGE from "../assets/profile.jpg";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const { theme, cycleTheme } = useTheme();

  const ThemeIcon = () => {
    switch (theme) {
      case "light":
        return <HiSun className="text-xl" />;
      case "dim":
        return <HiMoon className="text-xl" />;
      case "lights-out":
        return <HiSparkles className="text-xl" />;
    }
  };

  return (
    <>
      <div
        className="text-x-text-primary sticky top-0 px-4 py-2 md:py-4 font-bold z-[100] bg-x-primary/80 backdrop-blur-md border-x-border border-b md:border-l md:border-r"
      >
        <div className="flex justify-between items-center">
          {/* Mobile: small avatar | Desktop: display name */}
          <div className="flex items-center gap-3">
            <img
              src={PROFILE_IMAGE}
              alt="Profile"
              className="w-8 h-8 rounded-full md:hidden"
            />
            <h1 className="hidden md:block">{HEADER_DISPLAY_NAME}</h1>
            <h1 className="md:hidden text-lg">{HEADER_DISPLAY_NAME}</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={cycleTheme}
              title={`Theme: ${theme}`}
              aria-label={`Switch theme, currently ${theme}`}
              className="p-2 rounded-full hover:bg-x-tertiary transition-colors text-x-text-primary"
            >
              <ThemeIcon />
            </button>
            <a
              href={`https://github.com/${GITHUB_USERNAME}/The-Tweetfolio`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-x-tertiary transition-colors text-x-text-primary"
              aria-label="View source on GitHub"
            >
              <RxGithubLogo className="text-xl" />
            </a>
            <a
              href={`https://x.com/${X_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full hover:bg-x-tertiary transition-colors text-x-text-primary"
              aria-label="Follow on X"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="currentcolor" width="20" height="20" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
