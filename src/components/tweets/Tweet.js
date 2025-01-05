import React from "react";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import { DISPLAYNAME, X_USERNAME } from "../../config";
import {
  LikeButton,
  CommentButton,
  ShareButton,
  RetweetButton,
} from "../engage/__index__";
import ComponentDidnotLoad from "../utils/ComponentDidnotLoad";

const Tweet = ({ TweetComponent, numberOfTweets }) => {
  return (
    <div className="w-full">
      <div className="p-4 border border-[#2b3c47] md:hover:bg-[#35333360] transition-all cursor-pointer">
        <div className="flex flex-col space-y-3">
          {/* Header with Avatar and Names */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                alt="Avatar"
                src={PROFILE_IMAGE}
                className="w-full h-full rounded-full object-cover border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white">
                <span className="font-bold">{DISPLAYNAME}</span>
                <span className="ml-2 font-light text-gray-400 text-sm">
                  @{X_USERNAME}
                </span>
              </p>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="text-white w-full">
            <div className="break-words">
              {TweetComponent ? TweetComponent : <ComponentDidnotLoad />}
            </div>
          </div>

          {/* Engagement Buttons */}
          <div className="flex justify-between items-center pt-2 max-w-full">
            <div className="">
              <CommentButton thread={numberOfTweets} />
            </div>
            <div className="">
              <RetweetButton />
            </div>
            <div className="">
              <LikeButton />
            </div>
            <div className="">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
