import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

interface ListProjectProps {
  project: string;
  purpose?: string;
  githubLink: string;
  liveProject: string;
  listitems?: string[];
  techstack?: string;
  demoVideo?: string;
}

const ListProject: React.FC<ListProjectProps> = ({
  project,
  purpose,
  githubLink,
  liveProject,
  listitems,
  techstack,
  demoVideo,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const techs = techstack
    ? techstack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div>
      <p className="text-[17px] font-extrabold text-x-text-primary mb-1.5 leading-tight">
        {project}
      </p>

      {purpose && (
        <p className="text-[15px] leading-5 text-x-text-primary mb-3">{purpose}</p>
      )}

      {listitems && listitems.length > 0 && (
        <p className="text-[15px] leading-5 text-x-text-primary mb-3">
          {listitems.join(" ")}
        </p>
      )}

      {techs.length > 0 && (
        <p className="text-[15px] mb-3 leading-5">
          {techs.map((tech) => (
            <span key={tech} className="text-x-accent mr-2 inline-block">
              #{tech.replace(/\s+/g, "")}
            </span>
          ))}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {githubLink && githubLink !== "#" && (
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 border border-x-border rounded-full px-3.5 py-1.5 text-[13px] font-medium text-x-text-primary hover:bg-x-hover transition-colors"
          >
            <FaGithub className="text-[14px]" aria-hidden="true" />
            Source
          </a>
        )}
        {liveProject && liveProject !== "#" && (
          <a
            href={liveProject}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 border border-x-border rounded-full px-3.5 py-1.5 text-[13px] font-medium text-x-text-primary hover:bg-x-hover transition-colors"
          >
            <FiExternalLink className="text-[14px]" aria-hidden="true" />
            Live
          </a>
        )}
      </div>

      {demoVideo && (
        <div className="aspect-video rounded-2xl overflow-hidden border border-x-border bg-black">
          <video
            src={demoVideo}
            controls
            preload="metadata"
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ListProject;
