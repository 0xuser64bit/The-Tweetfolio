import React from "react";
import { FaGithub } from "react-icons/fa";
import { PINNED_TWEET, GITHUB_USERNAME } from "../../config";

const PinnedTweet = () => {
  return (
    <div>
      <p className="text-[15px] leading-5 text-x-text-primary">
        {PINNED_TWEET.content}
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <a
          href={PINNED_TWEET.cta_link}
          onClick={(e) => e.stopPropagation()}
          className="bg-x-text-primary text-x-primary rounded-full px-4 py-1.5 font-bold text-[14px] hover:opacity-90 transition-opacity"
        >
          {PINNED_TWEET.cta_text}
        </a>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1.5 border border-x-border text-x-text-primary rounded-full px-4 py-1.5 font-bold text-[14px] hover:bg-x-hover transition-colors"
        >
          <FaGithub className="text-[15px]" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default PinnedTweet;
