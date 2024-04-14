import React from "react";
import { DISPLAYNAME, X_USERNAME, GITHUB_USERNAME } from "./utils/config";

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
                        <span className="hover:text-gray-400 cursor-pointer">
                            @Code 👨‍💻{" "}
                        </span>
                        <span className="hover:text-gray-400 cursor-pointer">
                            @Anime 😌{" "}
                        </span>
                        <span className="hover:text-gray-400 cursor-pointer">
                            @Gym 💪{" "}
                        </span>
                        <span className="hover:text-gray-400 cursor-pointer">
                            @Always on 🤓{" "}
                        </span>
                        <span className="hover:text-gray-400 cursor-pointer">
                            @gamer 🎲{" "}
                        </span>
                        <span className="hover:text-gray-400 cursor-pointer">
                            @Open-Sourcerer🧙‍♂️
                        </span>
                    </p>
                </div>
                <div className="mt-1 py-1">
                    <p>
                        Debugging{" "}
                        <span className="cursor-pointer text-gray-400 font-light hover:text-opacity-60">
                            <a
                                href="https://github.com/us3r64bit"
                                target="_blank"
                            >
                                @{GITHUB_USERNAME}
                            </a>
                        </span>
                    </p>
                    <p className="pt-1 text-wrap">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolore minima dolores ea nisi voluptate, iste soluta
                        architecto ipsam saepe odio sint obcaecati omnis facilis
                        eius blanditiis temporibus quisquam repudiandae animi
                        repellat reprehenderit eos unde adipisci earum! Sunt
                        facilis similique dolore?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
