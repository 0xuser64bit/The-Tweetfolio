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
      <div className="sticky top-0 z-30 bg-x-primary/80 backdrop-blur-md border-b border-x-border px-4 py-3">
        <div className="flex items-center gap-6 mb-2.5">
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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5 pb-0.5">
          {tabs.map((tab) => {
            const count = getFilteredProjects(tab.id).length;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors border ${
                  isActive
                    ? "bg-x-text-primary text-x-primary border-x-text-primary"
                    : "bg-transparent text-x-text-secondary border-x-border hover:bg-x-hover"
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

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
