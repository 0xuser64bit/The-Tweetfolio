import React from "react";
import PROFILE_IMAGE from "../assets/profile.jpeg";
import { DISPLAYNAME, X_USERNAME } from "./utils/config";
import {
    LikeButton,
    CommentButton,
    ShareButton,
    RetweetButton,
} from "./engage/__index__";
import ComponentDidnotLoad from "./ComponentDidnotLoad";

const Tweet = ({ TweetComponent, numberOfTweets }) => {
    return (
        <div>
            <div className="py-2 px-4 flex gap-x-4  border border-[#2b3c47] hover:bg-[#353333] hover:transition-all cursor-pointer">
                {/* Avatar */}
                <div className="">
                    <img
                        src={PROFILE_IMAGE}
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                </div>
                {/* Body */}
                <div className="text-white w-full px-2">
                    {/* Display Name and User Name */}
                    <div>
                        <p>
                            <span className="me-2 font-bold">
                                {DISPLAYNAME}
                            </span>
                            <span className="font-light text-gray-400 text-sm cursor-pointer">
                                @{X_USERNAME}
                            </span>
                        </p>
                    </div>
                    <div className="py-2">
                        {TweetComponent ? (
                            TweetComponent
                        ) : (
                            <ComponentDidnotLoad />
                        )}
                    </div>
                    {/* Engage */}
                    <div className=" pt-2 flex justify-between">
                        <span className="">
                            <CommentButton thread={numberOfTweets} />
                        </span>
                        <span className="">
                            <RetweetButton />
                        </span>
                        <span className="">
                            <LikeButton />
                        </span>
                        <span className="">
                            <ShareButton />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
