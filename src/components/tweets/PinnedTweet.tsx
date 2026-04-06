import React from "react";
import { PINNED_TWEET, CONTACT_EMAIL } from "../../config";
import { openGmailCompose } from "../../utils/openGmail";

const PinnedTweet = () => {

  return (
    <div>
      <p className="text-[15px] leading-relaxed">{PINNED_TWEET.content}</p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openGmailCompose(CONTACT_EMAIL);
          }}
          className="bg-x-accent text-white rounded-full px-5 py-2 font-bold text-sm hover:bg-x-accent/90 transition-colors cursor-pointer"
        >
          {PINNED_TWEET.cta_text}
        </button>
      </div>
    </div>
  );
};

export default PinnedTweet;
