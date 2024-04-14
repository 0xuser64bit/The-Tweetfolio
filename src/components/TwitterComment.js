import React, { useState } from "react";

const CommentButton = () => {
    const [comment, setComment] = useState(false);
    const [animating, setAnimating] = useState(false);

    const handleComment = () => {
        setComment(!comment);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 500);
    };

    return (
        <button
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                comment ? "text-blue-400" : "text-gray-500"
            }`}
            onClick={handleComment}
        >
            <svg
                className={`h-6 w-6 transition-transform duration-300 ${
                    animating ? "transform scale-150 ease-in-out" : ""
                }`}
                fill={comment ? "red" : "none"}
                strokeWidth={2}
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 50 50"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 42h-2l1.2-1.6c.8-1.1 1.3-2.5 1.6-4.2C10.8 33.9 8 29.6 8 24c0-8.6 6.5-14 17-14s17 5.4 17 14c0 8.8-6.4 14-17 14h-.7c-1.6 1.9-4.4 4-9.3 4zm10-30c-9.4 0-15 4.5-15 12c0 6.4 3.9 9.4 7.2 10.7l.7.3l-.1.8c-.2 1.6-.5 3-1.1 4.2c3.3-.4 5.2-2.1 6.3-3.5l.3-.4H25c13.5 0 15-8.4 15-12C40 16.5 34.4 12 25 12z"
                />
            </svg>
        </button>
    );
};

export default CommentButton;
