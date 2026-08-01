import React, { useState } from "react";
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

const statusIcon: Record<StatusKey, { icon: React.ReactNode; color: string }> =
  {
    merged: {
      icon: <FaCodeMerge className="text-[14px]" aria-hidden="true" />,
      color: "text-purple-400",
    },
    open: {
      icon: <GoGitPullRequest className="text-[14px]" aria-hidden="true" />,
      color: "text-green-400",
    },
    issued: {
      icon: <GoIssueOpened className="text-[14px]" aria-hidden="true" />,
      color: "text-green-400",
    },
    solved: {
      icon: <GoIssueClosed className="text-[14px]" aria-hidden="true" />,
      color: "text-purple-400",
    },
  };

const INITIAL_SHOW = 5;

const Contributions = () => {
  const [expanded, setExpanded] = useState(false);

  const mergedCount = ContributionData.filter(
    (c) => c.status === "merged" || c.status === "solved",
  ).length;

  const visibleItems = expanded
    ? ContributionData
    : ContributionData.slice(0, INITIAL_SHOW);
  const hiddenCount = ContributionData.length - INITIAL_SHOW;

  return (
    <div className="w-full">
      <h2 className="text-[20px] font-extrabold text-x-text-primary">
        🧑‍💻 Open Source
      </h2>
      <p className="text-[15px] leading-5 text-x-text-secondary mt-1">
        {mergedCount} PRs merged across the ecosystem. Docs improved, bugs
        squashed, features shipped.
      </p>

      {/* Clean compact list — feels like a git log inside a tweet */}
      <ul className="mt-3">
        {visibleItems.map((item, i) => {
          const repo = extractRepo(item.link);
          const number = extractNumber(item.link);
          const status =
            statusIcon[item.status as StatusKey] ?? statusIcon.open;

          return (
            <li
              key={`${item.link}-${i}`}
              className="border-b border-x-border last:border-0"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-start gap-2.5 py-2.5 hover:bg-x-hover transition-colors -mx-1 px-1 rounded-lg"
              >
                <span className={`mt-0.5 shrink-0 ${status.color}`}>
                  {status.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] text-x-text-primary leading-snug">
                    {item.title}
                  </p>
                  <p className="text-[13px] text-x-text-secondary mt-0.5">
                    {repo}
                    {number && (
                      <span className="text-x-text-secondary"> #{number}</span>
                    )}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Expand/collapse */}
      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="text-x-accent text-[14px] mt-1 hover:underline"
        >
          {expanded ? "Show less" : `+${hiddenCount} more contributions`}
        </button>
      )}

      <div className="mt-2">
        <a
          href={`https://get-git.user64bit.wtf/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex text-x-accent text-[14px] hover:underline"
        >
          View more on Get-Git →
        </a>
      </div>
    </div>
  );
};

export default Contributions;
