import React, { useState } from "react";

const HEART_SOLID =
  "M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z";
const HEART_OUTLINE =
  "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z";

export const formatCount = (num: number): string => {
  if (num < 1000) return num.toString();
  if (num < 1000000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
};

interface LikeButtonProps {
  initialCount?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialCount = 42 }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  };

  const count = liked ? initialCount + 1 : initialCount;

  return (
    <button
      type="button"
      onClick={handleLike}
      aria-label={liked ? "Unlike this tweet" : "Like this tweet"}
      aria-pressed={liked}
      className="group/like flex items-center gap-1.5 p-2 -m-2 rounded-full hover:bg-x-like/10 transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-4.5 h-4.5 motion-safe:transition-transform motion-safe:duration-200 ${
          liked ? "scale-110" : ""
        }`}
        aria-hidden="true"
      >
        {liked ? (
          <path className="fill-x-like" d={HEART_SOLID} />
        ) : (
          <path
            d={HEART_OUTLINE}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-x-text-secondary group-hover/like:stroke-x-like"
          />
        )}
      </svg>
      {count > 0 && (
        <span
          className={`text-[13px] transition-colors ${
            liked
              ? "text-x-like font-semibold"
              : "text-x-text-secondary group-hover/like:text-x-like"
          }`}
        >
          {formatCount(count)}
        </span>
      )}
    </button>
  );
};

export default LikeButton;
