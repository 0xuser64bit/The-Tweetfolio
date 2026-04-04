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

interface Props {
  TweetComponent: React.ReactNode;
  numberOfTweets?: number;
}

const Tweet: React.FC<Props> = ({ TweetComponent, numberOfTweets }) => {
  return (
    <div className="w-full group">
      <div className="p-4 border border-x-border hover:bg-x-tertiary transition-colors duration-200 cursor-pointer">
        <div className="flex flex-col space-y-3">
          {/* Header with Avatar and Names */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 size-10">
              <div className="relative overflow-hidden rounded-full">
                <img
                  alt="Avatar"
                  src={PROFILE_IMAGE}
                  className="w-full h-full object-cover border border-x-border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/40";
                  }}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-x-text-primary">
                <span className="font-bold hover:underline">{DISPLAYNAME}</span>
                <span className="ml-2 font-normal text-x-text-secondary text-sm">
                  @{X_USERNAME}
                </span>
              </p>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="text-x-text-primary w-full">
            <div className="break-words">
              {TweetComponent ? (
                <div className="animate-fadeIn">
                  {TweetComponent}
                </div>
              ) : (
                <ComponentDidnotLoad />
              )}
            </div>
          </div>

          {/* Engagement Buttons */}
          <div className="flex justify-between items-center pt-2 max-w-full">
            <CommentButton thread={numberOfTweets} />
            <RetweetButton />
            <LikeButton />
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
