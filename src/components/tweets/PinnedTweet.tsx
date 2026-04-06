import React from "react";
import { PINNED_TWEET } from "../../config";

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
      </div>
    </div>
  );
};

export default PinnedTweet;
