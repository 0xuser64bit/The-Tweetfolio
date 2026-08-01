import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProjectsData } from "../../config";
import ListProject from "./ListProject";
import Tweet from "./Tweet";

interface Props {
  title: string;
}

type CategoryTab = "All" | "Web3" | "AI" | "FullStack";

const categoryMap: Record<string, CategoryTab[]> = {
  Praxis: ["Web3", "AI"],
  "Get Toasted": ["Web3", "FullStack"],
  ChibiTown: ["FullStack"],
  RugPulse: ["Web3"],
  DAOnation: ["Web3"],
  PollChain: ["Web3"],
  "Ask Genie": ["AI"],
  "Dev DNA": ["FullStack"],
  "Get-Git": ["FullStack"],
  "DD-Agent": ["AI"],
  "Echo-GPT": ["AI"],
  suchi: ["FullStack"],
  "The TweetFolio": ["FullStack"],
  Notebook: ["FullStack"],
  Canteen: ["FullStack"],
};

const tabs: { id: CategoryTab; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Web3", label: "Solana & Web3" },
  { id: "AI", label: "AI & Agents" },
  { id: "FullStack", label: "Full Stack" },
];

const ProjectsTweetThread: React.FC<Props> = ({ title }) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects = ProjectsData ?? [];

  const getFilteredProjects = (tab: CategoryTab) => {
    if (tab === "All") return allProjects;
    return allProjects.filter((p) => {
      const cats = categoryMap[p.projectName] || ["FullStack"];
      return cats.includes(tab);
    });
  };

  const currentProjects = getFilteredProjects(activeTab);

  return (
    <>
      {/* Sticky Thread Header */}
      <div className="sticky top-0 z-30 bg-x-primary/90 backdrop-blur-md border-b border-x-border">
        <div className="flex items-center gap-6 px-4 py-3">
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
              {allProjects.length} posts in thread
            </p>
          </div>
        </div>

        {/* X-Style Navigation Tabs Bar */}
        <div className="flex border-t border-x-border" role="navigation" aria-label="Project categories">
          {tabs.map((tab) => {
            const count = getFilteredProjects(tab.id).length;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 hover:bg-x-hover transition-colors px-2 py-3 text-center relative"
              >
                <span className="relative inline-flex items-center gap-1.5 justify-center">
                  <span
                    className={`text-[14px] whitespace-nowrap ${
                      isActive
                        ? "font-extrabold text-x-text-primary"
                        : "font-medium text-x-text-secondary"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? "bg-x-accent text-white font-bold"
                        : "bg-x-secondary text-x-text-secondary"
                    }`}
                  >
                    {count}
                  </span>

                  {/* Sliding Underline Indicator */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-0 right-0 h-1 rounded-full bg-x-accent"
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Opening Intro Tweet */}
      <Tweet
        isThreaded={currentProjects.length > 0}
        date="Aug 2024"
        TweetComponent={
          <div className="space-y-2">
            <h2 className="text-[18px] font-extrabold text-x-text-primary">
              Proof of Work 🧵
            </h2>
            <p className="text-[15px] leading-relaxed text-x-text-primary">
              Welcome to my primary engineering log. Here is a curated breakdown of {allProjects.length} systems, Solana AI agents, MEV detection pipelines, and full-stack applications I&apos;ve architected and shipped.
            </p>
            <p className="text-[14px] text-x-text-secondary font-medium">
              Use the tabs above to filter by ecosystem or scroll down to explore the complete thread 👇
            </p>
          </div>
        }
      />

      {/* Project Thread Posts */}
      {currentProjects.map((project, i) => (
        <Tweet
          key={project.projectName}
          isThreaded={i < currentProjects.length - 1}
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
              total={currentProjects.length}
            />
          }
        />
      ))}
    </>
  );
};

export default ProjectsTweetThread;
