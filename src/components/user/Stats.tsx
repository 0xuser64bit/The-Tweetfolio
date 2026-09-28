import React from "react";
import {
  ProjectsData,
  ContributionData,
  GITHUB_FOLLOWERS,
} from "../../config";

/**
 * Stats — a compact social-proof row. Like an X profile's following/followers,
 * but reframed for a builder: what's been shipped, what's been merged, who's
 * watching. Monospace numerals keep the technical-editorial voice.
 */
const Stats = () => {
  const stats = [
    { label: "ships", value: ProjectsData?.length ?? 0 },
    { label: "PRs merged", value: ContributionData?.length ?? 0 },
    { label: "followers", value: GITHUB_FOLLOWERS },
  ];

  return (
    <div className="flex items-center gap-5 mt-3">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-baseline gap-1.5">
          <span className="meta-mono text-x-text-primary font-semibold text-[15px]">
            {stat.value}
          </span>
          <span className="text-[13px] text-x-text-secondary">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
