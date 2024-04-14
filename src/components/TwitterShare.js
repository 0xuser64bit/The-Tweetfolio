import React, { useState } from "react";

const ShareButton = () => {
    const [share, setShare] = useState(false);
    const [animating, setAnimating] = useState(false);

    const handleShare = () => {
        setShare(!share);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 500);
    };

    return (
        <button
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                share ? "text-blue-400" : "text-gray-500 hover:text-blue-400"
            }`}
            onClick={handleShare}
        >
            <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                    animating ? "transform scale-150 ease-in-out" : ""
                }`}
                fill="currentColor"
                strokeWidth={2}
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 16 16"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6.81v6.38c0 .493.448.9.992.9h7.016c.543 0 .992-.406.992-.9V6.81c0-.493-.448-.9-.992-.9H3.992c-.543 0-.992.406-.992.9M6 5v.91h3V5h2.008C12.108 5 13 5.818 13 6.81v6.38c0 1-.9 1.81-1.992 1.81H3.992C2.892 15 2 14.182 2 13.19V6.81C2 5.81 2.9 5 3.992 5zm1.997-3.552A.506.506 0 0 1 8 1.5v8a.5.5 0 0 1-1 0v-8a.51.51 0 0 1 0-.017L5.18 3.394a.52.52 0 0 1-.77 0a.617.617 0 0 1 0-.829L6.36.515a1.552 1.552 0 0 1 2.31 0l1.95 2.05a.617.617 0 0 1 0 .83a.52.52 0 0 1-.77 0z"
                />
            </svg>
        </button>
    );
};

export default ShareButton;
