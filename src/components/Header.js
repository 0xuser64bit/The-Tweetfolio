import { RxGithubLogo } from "react-icons/rx";
import { GITHUB_USERNAME, HEADER_DISPLAY_NAME, X_USERNAME } from "../config";

const Header = () => {
  return (
    <>
      <div
        className={`text-white sticky top-0 p-4 font-bold rounded-md z-[100] bg-black bg-opacity-80 border-[#2b3c47] border-l border-r`}
      >
        <div className="flex justify-between">
          <h1>{HEADER_DISPLAY_NAME}</h1>
          <div className="">
            <button className="me-2">
              <a
                href={`https://github.com/${GITHUB_USERNAME}/The-Tweetfolio`}
                target="_blank"
                rel="noreferrer"
              >
                <RxGithubLogo className="text-xl" />
              </a>
            </button>
            <button className="me-2">
              <a href={`https://x.com/${X_USERNAME}`} target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="currentcolor" width="21" height="21" viewBox="0 0 50 50">
                  <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                </svg>
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
