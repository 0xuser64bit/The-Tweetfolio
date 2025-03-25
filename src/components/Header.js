import React from "react";
import { FaX } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { RxGithubLogo } from "react-icons/rx";
import { BLOG_URL, GITHUB_USERNAME, HEADER_DISPLAY_NAME, X_USERNAME } from "../config";

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
              <a href={BLOG_URL} target="_blank" rel="noreferrer">
                <FiExternalLink className="text-xl" />
              </a>
            </button>
            <button className="me-2">
              <a href={`https://x.com/${X_USERNAME}`} target="_blank" rel="noreferrer">
                <FaX className="text-xl" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
