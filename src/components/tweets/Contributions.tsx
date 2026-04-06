import React from "react";
import { FaGithub } from "react-icons/fa";
import { ContributionData, GITHUB_USERNAME } from "../../config";
import { GoGitPullRequest, GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { FaCodeMerge } from "react-icons/fa6";

const extractRepo = (url: string) => {
  try {
    const parts = url.replace("https://github.com/", "").split("/");
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return "";
  }
};

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  merged: {
    icon: <FaCodeMerge className="text-[13px]" />,
    label: "Merged",
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
  open: {
    icon: <GoGitPullRequest className="text-[13px]" />,
    label: "Open",
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  issued: {
    icon: <GoIssueOpened className="text-[13px]" />,
    label: "Open",
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  solved: {
    icon: <GoIssueClosed className="text-[13px]" />,
    label: "Closed",
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
};

const Contributions = () => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">🧑‍💻 Open Source Contributions</h3>

      <div className="space-y-2.5">
        {ContributionData.map((item, index) => {
          const repo = extractRepo(item.link);
          const isIssue = ["issued", "solved"].includes(item.status);
          const status = statusConfig[item.status] || statusConfig.open;

          return (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-x-secondary rounded-xl p-3.5 hover:bg-x-tertiary transition-colors group border border-transparent hover:border-x-border"
            >
              {/* Top row: repo name + status badge */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-x-text-secondary text-[12px] sm:text-[13px] min-w-0">
                  <FaGithub className="flex-shrink-0 text-sm" />
                  <span className="truncate">{repo}</span>
                </div>
                <span className={`flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full ${status.color} ${status.bg} flex-shrink-0`}>
                  {status.icon}
                  {status.label}
                </span>
              </div>

              {/* Title */}
              <p className="text-[14px] text-x-text-primary font-medium leading-snug group-hover:text-x-accent transition-colors">
                {item.title}
              </p>

              {/* Type label */}
              <p className="text-[12px] text-x-text-secondary mt-1.5">
                {isIssue ? "Issue" : "Pull Request"} · #{item.link.split("/").pop()}
              </p>
            </a>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <a
          href={`https://get-git.user64bit.wtf/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-x-accent text-[14px] hover:underline"
        >
          View more on Get-Git →
        </a>
      </div>
    </div>
  );
};

export default Contributions;
