import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProjectsData } from "../../config";
import ListProject from "./ListProject";
import Tweet from "./Tweet";

interface Props {
  title: string;
}

type FilterCategory = "All" | "Web3" | "AI" | "Full Stack & Tools";

const filterCategoryMap: Record<FilterCategory, (tech: string) => boolean> = {
  All: () => true,
  Web3: (tech) =>
    /solana|rust|anchor|web3|evm|birdeye|jito/i.test(tech),
  AI: (tech) =>
    /gemini|openai|agent|ai|gpt/i.test(tech),
  "Full Stack & Tools": (tech) =>
    /react|nextjs|vite|phaser|chrome|extension|rust|tools|node|convex|express|turborepo/i.test(tech),
};

const ProjectsTweetThread: React.FC<Props> = ({ title }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = (ProjectsData ?? []).filter((p) => {
    if (activeFilter === "All") return true;
    const tech = `${p.techStack || ""} ${p.projectName || ""} ${(p.listItems || []).join(" ")}`;
    return filterCategoryMap[activeFilter](tech);
  });

  return (
    <>
      {/* Sticky Thread Header */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-x-primary/80 backdrop-blur-md border-b border-x-border">
        <div className="flex items-center gap-6 mb-2">
          <Link
            to="/"
            aria-label="Back to home"
            className="p-2 -m-2 rounded-full hover:bg-x-hover transition-colors text-x-text-primary"
          >
            <BiArrowBack className="text-xl" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold leading-tight text-x-text-primary">
              {title}
            </h1>
            <p className="text-[13px] text-x-text-secondary leading-tight">
              {ProjectsData?.length ?? 0} posts in thread
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-0.5">
          {(["All", "Web3", "AI", "Full Stack & Tools"] as FilterCategory[]).map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors border ${
                  isActive
                    ? "bg-x-text-primary text-x-primary border-x-text-primary"
                    : "bg-transparent text-x-text-secondary border-x-border hover:bg-x-hover"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Opening Intro Tweet */}
      <Tweet
        isThreaded={filteredProjects.length > 0}
        date="Aug 2024"
        TweetComponent={
          <div className="space-y-2">
            <h2 className="text-[18px] font-extrabold text-x-text-primary">
              Proof of Work 🧵
            </h2>
            <p className="text-[15px] leading-relaxed text-x-text-primary">
              Welcome to my engineering thread. Below is a curated breakdown of {ProjectsData?.length ?? 0} systems, AI agents, MEV detection engines, and full-stack applications I&apos;ve built and shipped.
            </p>
            <p className="text-[14px] text-x-text-secondary">
              Explore the live demos, inspect the source repositories, or filter by category above 👇
            </p>
          </div>
        }
      />

      {/* Project Thread Tweets */}
      {filteredProjects.map((project, i) => (
        <Tweet
          key={project.projectName}
          isThreaded={i < filteredProjects.length - 1}
          TweetComponent={
            <ListProject
              project={project?.projectName || ""}
              purpose={(project as any)?.purpose || ""}
              githubLink={project?.githubLink || ""}
              liveProject={project?.liveProject || ""}
              listitems={project?.listItems || []}
              techstack={project?.techStack || ""}
              demoVideo={project?.demoVideo || ""}
              index={i}
              total={filteredProjects.length}
            />
          }
        />
      ))}
    </>
  );
};

export default ProjectsTweetThread;
