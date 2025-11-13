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
      <div className="p-4 border border-[#2b3c47] md:hover:bg-[#35333360] transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[#ffffff05] before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out">
        <div className="flex flex-col space-y-3">
          {/* Header with Avatar and Names */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 size-10 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
              <div className="relative overflow-hidden rounded-full">
                <img
                  alt="Avatar"
                  src={PROFILE_IMAGE}
                  className="w-full h-full object-cover border transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://via.placeholder.com/40";
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white transform transition-all duration-300 ease-in-out group-hover:translate-x-1">
                <span className="font-bold hover:text-blue-400 transition-colors duration-300">{DISPLAYNAME}</span>
                <span className="ml-2 font-light text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  @{X_USERNAME}
                </span>
              </p>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="text-white w-full transform transition-all duration-300 ease-in-out group-hover:translate-x-1">
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
          <div className="flex justify-between items-center pt-2 max-w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <div className="transform transition-transform duration-300 hover:scale-110">
              <CommentButton thread={numberOfTweets} />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <RetweetButton />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <LikeButton />
            </div>
            <div className="transform transition-transform duration-300 hover:scale-110">
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
