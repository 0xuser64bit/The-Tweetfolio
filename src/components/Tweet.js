import React from "react";
import PROFILE_IMAGE from "../assets/profile.jpeg";
import { DISPLAYNAME, X_USERNAME } from "./utils/config";
import {
    LikeButton,
    CommentButton,
    ShareButton,
    RetweetButton,
} from "./engage/__index__";

const Tweet = ({ TweetComponent }) => {
    return (
        <div>
            <div className="py-2 px-4 flex gap-x-4 border-b border-[#2b3c47] hover:bg-[#353333] hover:transition-all cursor-pointer">
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
                            <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
                                <p className="text-4xl font-bold mb-4">
                                    Uh-oh, it looks like our little website
                                    gremlins have gone on a rampage!
                                </p>
                                <p className="text-lg mb-4">
                                    Don't worry, though, they're probably just
                                    taking their afternoon nap. Give it a minute
                                    and I'm sure everything will be up and
                                    running again.
                                </p>
                                <p className="text-lg mb-4">
                                    In the meantime, why don't you go grab a
                                    snack and stretch those legs? The tech gods
                                    will surely have mercy on us eventually.
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Engage */}
                    <div className=" pt-2 flex justify-between">
                        <span className="">
                            <CommentButton />
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
