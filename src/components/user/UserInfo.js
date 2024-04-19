import React from "react";
import {
    PROFILE_TAGS,
    DISPLAYNAME,
    X_USERNAME,
    GITHUB_USERNAME,
    GITHUB_QUOTE,
    ABOUT_YOU,
} from "./config";

const UserInfo = () => {
    return (
        <div className="text-white mt-20 border-[#2b3c47] border-b">
            <div className="mx-4 pb-4">
                <div>
                    <h3 className="text-2xl font-bold">{DISPLAYNAME}</h3>
                    <h3 className="font-light text-gray-400 text-sm">
                        <a href="https://twitter.com/user64bit" target="_blank">
                            @{X_USERNAME}
                        </a>
                    </h3>
                </div>
                <div>
                    <p className="pt-2">
                        {PROFILE_TAGS.map((tag) => (
                            <span className="hover:text-gray-400 cursor-pointer pe-2">
                                {tag}
                            </span>
                        ))}
                    </p>
                </div>
                <div className="mt-1 py-1">
                    <p>
                        {GITHUB_QUOTE}{" "}
                        <span className="cursor-pointer text-gray-400 font-light hover:text-opacity-60">
                            <a
                                href={`https://github.com/${GITHUB_USERNAME}`}
                                target="_blank"
                            >
                                @{GITHUB_USERNAME}
                            </a>
                        </span>
                    </p>
                    <p className="pt-1 text-wrap">{ABOUT_YOU}</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
