import React from "react";
import { PINNED_TWEET } from "../../config";
import { FiExternalLink } from "react-icons/fi";

const PinnedTweet = () => {
  return (
    <div>
      <p className="text-[15px] leading-relaxed">{PINNED_TWEET.content}</p>
      <div className="flex gap-3 mt-4">
        <a
          href={PINNED_TWEET.cta_link}
          className="bg-x-accent text-white rounded-full px-5 py-2 font-bold text-sm hover:bg-x-accent/90 transition-colors"
        >
          {PINNED_TWEET.cta_text}
        </a>
        <a
          href={PINNED_TWEET.resume_link}
          target="_blank"
          rel="noreferrer"
          className="border border-x-border text-x-text-primary rounded-full px-5 py-2 font-bold text-sm hover:bg-x-tertiary transition-colors inline-flex items-center gap-1"
        >
          Resume <FiExternalLink className="text-xs" />
        </a>
      </div>
    </div>
  );
};

export default PinnedTweet;
