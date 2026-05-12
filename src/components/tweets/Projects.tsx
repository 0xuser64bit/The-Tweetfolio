import React from "react";
import { ProjectsData } from "../../config";

const Projects = () => {
  const preview = (ProjectsData ?? []).slice(0, 3);
  const remaining = Math.max(0, (ProjectsData?.length ?? 0) - preview.length);

  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary">
        Proof of Work 🧵
      </h2>
      <p className="text-[15px] leading-5 text-x-text-secondary mt-1">
        Selected projects I&apos;ve shipped. Tap to read the full thread.
      </p>

      <ul className="mt-3 divide-y divide-x-border border-y border-x-border">
        {preview.map((p) => {
          const firstTech =
            p.techStack?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];
          return (
            <li key={p.projectName} className="py-2.5">
              <p className="text-[15px] font-bold text-x-text-primary leading-tight">
                {p.projectName}
              </p>
              {firstTech.length > 0 && (
                <p className="text-[13px] text-x-text-secondary mt-0.5 truncate">
                  {firstTech.slice(0, 4).join(" · ")}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <p className="text-x-accent text-[15px] mt-3">
        Show this thread{remaining > 0 ? ` (+${remaining} more)` : ""} →
      </p>
    </div>
  );
};

export default Projects;
