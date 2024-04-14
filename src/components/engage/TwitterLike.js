import React, { useState } from "react";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [animating, setAnimating] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 500);
    };

    return (
        <button
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                liked ? "" : "text-gray-500 opacity-60"
            }`}
            onClick={handleLike}
        >
            <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                    animating ? "transform scale-150 ease-in-out" : ""
                }`}
                fill={liked ? "red" : "none"}
                strokeWidth={2}
                stroke={liked ? "" : "currentColor"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
};

export default LikeButton;
