import React from "react";
import { FaGithub } from "react-icons/fa";
import { ContributionData, GITHUB_USERNAME } from "../../config";
import { GoGitPullRequest } from "react-icons/go"; // open PR
import { FaCodeMerge } from "react-icons/fa6"; // merge PR
import { GoIssueOpened } from "react-icons/go"; // open Issue
import { GoIssueClosed } from "react-icons/go"; // solved issue
import { MdReportProblem } from "react-icons/md";

const Contributions = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "merged":
        return <FaCodeMerge className="text-purple-600 text-xl" />;
      case "open":
        return <GoGitPullRequest className="text-green-600 text-xl" />;
      case "issued":
        return <GoIssueOpened className="text-green-600 text-xl" />;
      case "solved":
        return <GoIssueClosed className="text-purple-600 text-xl" />;
      default:
        return <MdReportProblem className="text-red-400 text-xl" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-center pb-4">
        Open Source Contributions
      </h3>

      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-[#2b3c47]">
          <thead>
            <tr className="bg-[#2b3c4730] text-white">
              <th className="p-4 border-b border-gray-600">#</th>
              <th className="p-4 border-b border-gray-600">Title</th>
              <th className="p-4 border-b border-gray-600 text-center">Type</th>
              <th className="p-4 border-b border-gray-600">Status</th>
              <th className="p-4 border-b border-gray-600">Link</th>
            </tr>
          </thead>
          <tbody>
            {ContributionData.map((item, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-gray-600">{index + 1}</td>
                <td className="p-4 border-b border-gray-600">{item.title}</td>
                <td className="p-4 border-b border-gray-600 uppercase text-center">
                  {["issued", "solved"].includes(item.status) ? "Issue" : "PR"}
                </td>
                <td className="p-4 border-b border-gray-600 ps-10">
                  {getStatusIcon(item.status)}
                </td>
                <td className="p-4 border-b border-gray-600 ps-10">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-white text-2xl" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center text-sm text-gray-400 mt-2">
          More on{" "}
          <a
            href={`https://get-git.user64bit.wtf/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-500/60 hover:underline"
          >
            Get Git
          </a>
        </div>
      </div>

      {/* Mobile Cards (shown only on mobile) */}
      <div className="md:hidden space-y-4">
      <div className="text-center text-sm text-gray-400 my-2">
          More on{" "}
          <a
            href={`https://get-git.user64bit.wtf/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-500/60 hover:underline"
          >
            Get Git
          </a>
        </div>
        {ContributionData.map((item, index) => (
          <div key={index} className="bg-[#2b3c4730] p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">#{index + 1}</span>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-white text-2xl" />
              </a>
            </div>
            <h4 className="font-medium text-white">{item.title}</h4>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300 uppercase">
                {["issued", "solved"].includes(item.status) ? "Issue" : "PR"}
              </span>
              <span>{getStatusIcon(item.status)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributions;
