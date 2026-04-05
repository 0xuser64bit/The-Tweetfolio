import React, { useState } from "react";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import { DISPLAYNAME, X_USERNAME } from "../../config";
import {
  LikeButton,
  CommentButton,
  ShareButton,
  RetweetButton,
  ViewsButton,
} from "../engage/__index__";
import ComponentDidnotLoad from "../utils/ComponentDidnotLoad";

interface Props {
  TweetComponent: React.ReactNode;
  numberOfTweets?: number;
  pinned?: boolean;
  date?: string;
}

const Tweet: React.FC<Props> = ({ TweetComponent, numberOfTweets, pinned, date }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full">
      <div className="p-4 border border-x-border hover:bg-x-tertiary transition-colors duration-200 cursor-pointer">
        {/* Pinned label */}
        {pinned && (
          <div className="flex items-center gap-2 ml-10 mb-1 text-x-text-secondary text-[13px] font-bold">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
              <path d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z" />
            </svg>
            Pinned
          </div>
        )}

        <div className="flex flex-col space-y-3">
          {/* Header with Avatar and Names */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 size-10">
              <div className="overflow-hidden rounded-full">
                <img
                  alt="Avatar"
                  src={PROFILE_IMAGE}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/40";
                  }}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex justify-between items-start">
              <p className="text-x-text-primary">
                <span className="font-bold hover:underline">{DISPLAYNAME}</span>
                <span className="ml-2 font-normal text-x-text-secondary text-[15px]">
                  @{X_USERNAME}
                </span>
                {date && (
                  <>
                    <span className="text-x-text-secondary text-[15px]"> · </span>
                    <span className="text-x-text-secondary text-[15px] hover:underline">{date}</span>
                  </>
                )}
              </p>
              {/* More button */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className="p-2 -m-2 rounded-full hover:bg-x-accent/10 text-x-text-secondary hover:text-x-accent transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                </button>
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 top-8 z-20 bg-x-primary border border-x-border rounded-xl shadow-lg py-1 min-w-[200px]">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(window.location.href);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-[15px] text-x-text-primary hover:bg-x-tertiary transition-colors"
                      >
                        Copy link to tweet
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="text-x-text-primary w-full">
            <div className="break-words">
              {TweetComponent ? (
                <div>{TweetComponent}</div>
              ) : (
                <ComponentDidnotLoad />
              )}
            </div>
          </div>

          {/* Engagement Buttons — X order: Views, Reply, Retweet, Like, Share */}
          <div className="flex justify-between items-center pt-2 max-w-full">
            <ViewsButton />
            <CommentButton thread={numberOfTweets} />
            <RetweetButton />
            <LikeButton />
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
