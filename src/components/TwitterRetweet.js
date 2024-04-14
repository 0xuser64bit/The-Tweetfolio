import React, { useState } from "react";

const RetweetButton = () => {
    const [retweeted, setRetweeted] = useState(false);
    const [animating, setAnimating] = useState(false);

    const handleRetweet = () => {
        setRetweeted(!retweeted);
        setAnimating(true);
        setTimeout(() => {
            setAnimating(false);
        }, 500);
    };

    return (
        <button
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-500 ${
                retweeted ? "text-green-400" : "text-gray-500"
            }`}
            onClick={handleRetweet}
        >
            <svg
                className={`h-6 w-6 transition-transform duration-500 rotate-90 ${
                    animating ? "transform rotate-0" : ""
                }`}
                fill={retweeted ? "currentColor" : "none"}
                stroke="currentColor"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.927 18.192l1.735 1.735q.146.146.152.344q.007.198-.152.364q-.166.165-.357.168q-.192.003-.357-.163l-2.383-2.382q-.13-.131-.183-.268q-.053-.136-.053-.298q0-.161.053-.298q.053-.136.183-.267l2.383-2.383q.146-.146.347-.153q.201-.006.367.159q.16.165.162.354q.003.188-.162.354l-1.735 1.734h10.765q.27 0 .443-.173t.173-.442v-2.885q0-.213.143-.356q.143-.144.357-.144q.213 0 .356.144t.144.356v2.885q0 .671-.472 1.143q-.473.472-1.144.472H5.927ZM18.073 6.808H7.308q-.27 0-.443.173t-.173.442v2.885q0 .213-.143.356q-.143.144-.357.144q-.213 0-.356-.144t-.144-.356V7.423q0-.671.472-1.143q.473-.472 1.144-.472h10.765l-1.735-1.735q-.146-.146-.152-.344q-.007-.198.152-.364q.166-.165.357-.168q.192-.003.357.163l2.383 2.382q.13.131.183.268q.053.136.053.298q0 .161-.053.298q-.053.136-.183.267l-2.383 2.383q-.146.146-.347.153q-.201.006-.367-.159q-.16-.165-.162-.354q-.003-.188.162-.354l1.735-1.734Z"
                />
            </svg>
        </button>
    );
};

export default RetweetButton;
