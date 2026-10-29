import React from "react";
import { ProjectsData } from "../../config";
import { Link } from "react-router-dom";
import { slugify } from "../../../shared/content";

const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const Projects = () => {
  const preview = (ProjectsData ?? []).slice(0, 3);
  const remaining = Math.max(0, (ProjectsData?.length ?? 0) - preview.length);

  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary">
        Proof of Work 🧵
      </h2>
      <p className="text-[15px] leading-5 text-x-text-secondary mt-1">
        The build log: experiments, live products, and lessons from shipping
        across Solana + AI. Public code, not just screenshots.
      </p>

      {/* Twitter-native URL preview cards */}
      <div className="mt-3 rounded-2xl border border-x-border overflow-hidden divide-y divide-x-border">
        {preview.map((p, i) => {
          const domain =
            p.liveProject && p.liveProject !== "#"
              ? getDomain(p.liveProject)
              : getDomain(p.githubLink);
          const desc =
            p.listItems && p.listItems.length > 0
              ? p.listItems[0].length > 110
                ? p.listItems[0].slice(0, 110).replace(/\s+\S*$/, "") + "…"
                : p.listItems[0]
              : null;

          return (
            <Link
              key={p.projectName}
              to={`/proof-of-work#project-${slugify(p.projectName)}`}
              className="block px-3 py-2.5 hover:bg-x-hover transition-colors"
            >
              <p className="text-[13px] text-x-text-secondary leading-tight">
                {domain || "github.com"}
              </p>
              <p className="text-[15px] font-semibold text-x-text-primary leading-tight mt-0.5">
                {p.projectName}
              </p>
              {desc && (
                <p className="text-[13px] text-x-text-secondary leading-snug mt-0.5">
                  {desc}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      <div className="mt-3 text-center">
        <Link
          to="/proof-of-work"
          className="text-x-accent text-[15px] font-medium hover:underline inline-block"
        >
          Show this thread{remaining > 0 ? ` (+${remaining} more)` : ""} →
        </Link>
      </div>
    </div>
  );
};

export default Projects;
