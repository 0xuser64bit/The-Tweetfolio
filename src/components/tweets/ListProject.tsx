import React from "react";
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
  index?: number;
  total?: number;
}

/** Returns a youtube-nocookie embed URL if `url` is a YouTube link, else null. */
const getYouTubeEmbedUrl = (url: string): string | null => {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    let id: string | null = null;

    if (host === "youtu.be") {
      id = u.pathname.slice(1);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        id = u.searchParams.get("v");
      } else if (u.pathname.startsWith("/embed/")) {
        id = u.pathname.slice("/embed/".length);
      } else if (u.pathname.startsWith("/shorts/")) {
        id = u.pathname.slice("/shorts/".length);
      }
    }

    if (!id) return null;
    id = id.split("/")[0].split("?")[0];
    const start = u.searchParams.get("t") || u.searchParams.get("start");
    const qs = start ? `?start=${encodeURIComponent(start.replace(/\D/g, ""))}` : "";
    return `https://www.youtube-nocookie.com/embed/${id}${qs}`;
  } catch {
    return null;
  }
};

const getHostname = (url: string): string => {
  try {
    if (!url || url === "#") return "";
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const ListProject: React.FC<ListProjectProps> = ({
  project,
  purpose,
  githubLink,
  liveProject,
  listitems,
  techstack,
  demoVideo,
  index,
  total,
}) => {
  const techs = techstack
    ? techstack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const mainLink = liveProject && liveProject !== "#" ? liveProject : githubLink;
  const hostname = getHostname(mainLink);

  return (
    <div className="space-y-2.5">
      {/* Project Title & Thread Index */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[17px] font-bold text-x-text-primary leading-tight">
          {project}
        </h3>
        {typeof index === "number" && typeof total === "number" && (
          <span className="text-[13px] font-medium text-x-text-secondary">
            {index + 1}/{total}
          </span>
        )}
      </div>

      {purpose && (
        <p className="text-[15px] leading-relaxed text-x-text-primary">{purpose}</p>
      )}

      {/* Description / Bullet points */}
      {listitems && listitems.length > 0 && (
        <div className="space-y-2 text-[15px] leading-relaxed text-x-text-primary">
          {listitems.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      )}

      {/* Tech Stack Hashtags */}
      {techs.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[14px]">
          {techs.map((tech) => (
            <span key={tech} className="text-x-accent hover:underline cursor-pointer">
              #{tech.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      )}

      {/* Video Embed Frame */}
      {demoVideo && (
        <div className="mt-3 aspect-video rounded-2xl overflow-hidden border border-x-border bg-black">
          {(() => {
            const youtubeUrl = getYouTubeEmbedUrl(demoVideo);
            return youtubeUrl ? (
              <iframe
                src={youtubeUrl}
                title={`${project} demo`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0"
              />
            ) : (
              <video
                src={demoVideo}
                controls
                preload="metadata"
                playsInline
                className="w-full h-full object-cover"
              />
            );
          })()}
        </div>
      )}

      {/* Twitter-style Link Card Preview Attachment */}
      {mainLink && mainLink !== "#" && (
        <a
          href={mainLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-3 block rounded-2xl border border-x-border p-3 hover:bg-x-hover transition-colors group"
        >
          <p className="text-[13px] text-x-text-secondary truncate">{hostname}</p>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            <p className="text-[15px] font-bold text-x-text-primary group-hover:underline truncate">
              {project}
            </p>
            <FiExternalLink className="text-[14px] text-x-text-secondary shrink-0" aria-hidden="true" />
          </div>
        </a>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        {githubLink && githubLink !== "#" && (
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 border border-x-border rounded-full px-3.5 py-1.5 text-[13px] font-bold text-x-text-primary hover:bg-x-hover transition-colors"
          >
            <FaGithub className="text-[14px]" aria-hidden="true" />
            Source Code
          </a>
        )}
        {liveProject && liveProject !== "#" && (
          <a
            href={liveProject}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 border border-x-border rounded-full px-3.5 py-1.5 text-[13px] font-bold text-x-text-primary hover:bg-x-hover transition-colors"
          >
            <FiExternalLink className="text-[14px]" aria-hidden="true" />
            Live Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ListProject;
