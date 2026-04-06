import React, { useState, useMemo } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const likeCount = useMemo(() => {
    return Math.floor(Math.random() * 200) + 10;
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <div className="flex items-center gap-1 group/like">
      <button
        className="p-1.5 sm:p-2 rounded-full group-hover/like:bg-x-like/10 transition-colors"
        onClick={handleLike}
        aria-label={liked ? "Unlike this tweet" : "Like this tweet"}
        aria-pressed={liked}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-[18px] h-[18px] transition-all duration-300 ${
            animating ? "scale-125" : "scale-100"
          } ${
            liked ? "fill-x-like" : "fill-x-text-secondary group-hover/like:fill-x-like"
          }`}
        >
          {liked ? (
            <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.45-4.55-.782-6.14.677-1.6 2.118-2.68 3.998-2.97 1.482-.22 3.062.2 4.168 1.13 1.108-.93 2.688-1.35 4.168-1.13 1.88.29 3.322 1.37 3.998 2.97.668 1.59.578 3.64-.782 6.14z" />
          ) : (
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.45-4.55-.782-6.14.677-1.6 2.118-2.68 3.998-2.97 1.018-.15 2.104.07 3.064.64.283.17.546.37.786.6.24-.23.503-.43.786-.6.96-.57 2.046-.79 3.064-.64 1.88.29 3.322 1.37 3.998 2.97.668 1.59.578 3.64-.782 6.14z" />
          )}
        </svg>
      </button>
      <span
        className={`text-[13px] transition-colors ${
          liked ? "text-x-like" : "text-x-text-secondary group-hover/like:text-x-like"
        }`}
      >
        {liked ? likeCount + 1 : likeCount}
      </span>
    </div>
  );
};

export default LikeButton;
