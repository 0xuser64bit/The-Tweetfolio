import React from "react";
import { FaGithub } from "react-icons/fa";
import { ContributionData } from "./config";
import { GoGitPullRequest } from "react-icons/go"; // open PR
import { FaCodeMerge } from "react-icons/fa6"; // merge PR
import { GoIssueOpened } from "react-icons/go"; // open Issue
import { GoIssueClosed } from "react-icons/go"; // solved issue
import { MdReportProblem } from "react-icons/md";


const Contributions = () => {
    return (
        <div>
            <div>
                <h3 className="text-2xl font-bold text-center pb-4">
                    Open Source Contributions
                </h3>
                <ul>
                    {ContributionData?.map((contribution) => (
                        <li key={contribution?.title} className="pb-2">
                            <div className="flex gap-x-2 items-center">
                                {contribution?.status === "merged" ? (
                                    <FaCodeMerge className="text-purple-600" />
                                ) : (contribution?.status === "open") ? (
                                    <GoGitPullRequest className="text-green-600" />
                                )
                                  : (contribution?.status === "issued") ? (
                                    <GoIssueOpened className="text-green-600" />
                                )
                                  : (contribution?.status === "solved") ? (
                                    <GoIssueClosed className="text-purple-600" />
                                ) :
                                (
                                    <MdReportProblem className="text-red-400" />
                                )}
                                {contribution?.title}
                                <a
                                    href={contribution?.link}
                                    target="_blank"
                                    className="hover:opacity-80"
                                    rel="noreferrer"
                                >
                                    <FaGithub />
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Contributions;
