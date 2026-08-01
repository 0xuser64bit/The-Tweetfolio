import React, { useEffect, useRef, useState } from "react";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import { DISPLAYNAME, X_USERNAME } from "../../config";
import useInView from "../../hooks/useInView";
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
  /** Renders the vertical thread connector line below the avatar. */
  isThreaded?: boolean;
  /** When true, the tweet behaves as an interactive surface (cursor + hover background). */
  interactive?: boolean;
}

const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
    <path d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z" />
  </svg>
);

const MoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current" aria-hidden="true">
    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
  </svg>
);

const Tweet: React.FC<Props> = ({
  TweetComponent,
  numberOfTweets,
  pinned,
  date,
  isThreaded,
  interactive,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView(0.05);

  useEffect(() => {
    if (!showMenu) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMenu(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showMenu]);

  const counts = React.useMemo(() => {
    const seedString = `${date || ""}-${pinned ? "pinned" : ""}-${numberOfTweets || 0}`;
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = (hash << 5) - hash + seedString.charCodeAt(i);
      hash |= 0;
    }
    const seed = Math.abs(hash);

    const views = ((seed * 157 + 3421) % 18500) + 1820;
    const likes = Math.floor(views * (0.04 + ((seed % 12) / 100))) + 18;
    const retweets = Math.floor(likes * (0.18 + ((seed % 8) / 100))) + 4;
    const replies = numberOfTweets || Math.floor(retweets * 0.5) + 3;

    return { views, likes, retweets, replies };
  }, [date, pinned, numberOfTweets]);

  return (
    <article
      ref={ref}
      className={`w-full motion-safe:transition-all motion-safe:duration-500 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div
        className={`px-4 pt-3 pb-2 border-b border-x-border transition-colors ${
          interactive ? "hover:bg-x-hover cursor-pointer" : ""
        }`}
      >
        {/* Pinned label (sits inside the content column visually) */}
        {pinned && (
          <div className="flex items-center gap-2 mb-1 ml-13 text-x-text-secondary text-[13px] font-bold">
            <PinIcon />
            Pinned
          </div>
        )}

        <div className="flex gap-3">
          {/* Avatar column */}
          <div className="flex flex-col items-center shrink-0 w-10">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                alt={`${DISPLAYNAME}'s avatar`}
                src={PROFILE_IMAGE}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            {isThreaded && (
              <div className="flex-1 w-0.5 bg-x-border mt-2 rounded-full" aria-hidden="true" />
            )}
          </div>

          {/* Content column */}
          <div className="flex-1 min-w-0 pb-2">
            {/* Header row */}
            <div className="flex justify-between items-start gap-2 mb-0.5">
              <div className="flex items-baseline flex-wrap min-w-0 text-[15px] leading-tight">
                <span className="font-bold text-x-text-primary hover:underline truncate">
                  {DISPLAYNAME}
                </span>
                <span className="ml-1 text-x-text-secondary truncate">
                  @{X_USERNAME}
                </span>
                {date && (
                  <>
                    <span className="mx-1 text-x-text-secondary" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-x-text-secondary hover:underline">
                      {date}
                    </span>
                  </>
                )}
              </div>
              <div className="relative shrink-0" ref={menuRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowMenu((s) => !s);
                  }}
                  aria-label="More options"
                  aria-expanded={showMenu}
                  className="p-2 -m-2 rounded-full hover:bg-x-accent/10 text-x-text-secondary hover:text-x-accent transition-colors"
                >
                  <MoreIcon />
                </button>
                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowMenu(false);
                      }}
                    />
                    <div className="absolute right-0 top-9 z-20 bg-x-primary border border-x-border rounded-xl shadow-lg py-1 min-w-50">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(window.location.href);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 text-[15px] text-x-text-primary hover:bg-x-hover transition-colors"
                      >
                        Copy link to tweet
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Tweet content */}
            <div className="text-x-text-primary w-full wrap-break-word">
              {TweetComponent ? TweetComponent : <ComponentDidnotLoad />}
            </div>

            {/* Engagement row — capped width so actions don't span the full column */}
            <div className="flex justify-between items-center max-w-md mt-3 -ml-1.5">
              <CommentButton initialCount={counts.replies} />
              <RetweetButton initialCount={counts.retweets} />
              <LikeButton initialCount={counts.likes} />
              <ViewsButton initialCount={counts.views} />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
