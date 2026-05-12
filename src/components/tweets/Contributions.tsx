import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaCodeMerge } from "react-icons/fa6";
import { GoGitPullRequest, GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { ContributionData, GITHUB_USERNAME } from "../../config";

const extractRepo = (url: string) => {
  try {
    const parts = url.replace("https://github.com/", "").split("/");
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return "";
  }
};

const extractNumber = (url: string) => {
  const tail = url.split("/").pop() || "";
  return tail.match(/^\d+$/) ? tail : "";
};

type StatusKey = "merged" | "open" | "issued" | "solved";

const statusConfig: Record<
  StatusKey,
  { icon: React.ReactNode; label: string; color: string; bg: string }
> = {
  merged: {
    icon: <FaCodeMerge className="text-[12px]" aria-hidden="true" />,
    label: "Merged",
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
  open: {
    icon: <GoGitPullRequest className="text-[12px]" aria-hidden="true" />,
    label: "Open",
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  issued: {
    icon: <GoIssueOpened className="text-[12px]" aria-hidden="true" />,
    label: "Issue",
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  solved: {
    icon: <GoIssueClosed className="text-[12px]" aria-hidden="true" />,
    label: "Closed",
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
};

const Contributions = () => {
  return (
    <div className="w-full">
      <h2 className="text-[20px] font-extrabold text-x-text-primary mb-3">
        🧑‍💻 Open Source
      </h2>

      <ul className="flex flex-col gap-2">
        {ContributionData.map((item, i) => {
          const repo = extractRepo(item.link);
          const number = extractNumber(item.link);
          const isIssue = item.status === "issued" || item.status === "solved";
          const status =
            statusConfig[item.status as StatusKey] ?? statusConfig.open;

          return (
            <li key={`${item.link}-${i}`}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block bg-x-secondary rounded-2xl p-3 hover:bg-x-tertiary transition-colors border border-transparent hover:border-x-border"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <FaGithub
                      className="text-[14px] text-x-text-secondary flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[14px] font-bold text-x-text-primary truncate">
                      {repo}
                    </span>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${status.color} ${status.bg}`}
                  >
                    {status.icon}
                    {status.label}
                  </span>
                </div>
                <p className="text-[14px] text-x-text-secondary leading-5">
                  {item.title}
                </p>
                {number && (
                  <p className="text-[12px] text-x-text-secondary mt-1">
                    {isIssue ? "Issue" : "Pull Request"} · #{number}
                  </p>
                )}
              </a>
            </li>
          );
        })}
      </ul>

      <a
        href={`https://get-git.user64bit.wtf/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex mt-3 text-x-accent text-[14px] hover:underline"
      >
        View more on Get-Git →
      </a>
    </div>
  );
};

export default Contributions;
