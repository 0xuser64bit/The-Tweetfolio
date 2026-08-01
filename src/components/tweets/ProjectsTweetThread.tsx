import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProjectsData } from "../../config";
import ListProject from "./ListProject";
import Tweet from "./Tweet";

interface Props {
  title: string;
}

const ProjectsTweetThread: React.FC<Props> = ({ title }) => {
  return (
    <>
      {/* Thread header — X style */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-x-primary/80 backdrop-blur-md border-b border-x-border">
        <div className="flex items-center gap-6">
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
              {ProjectsData?.length ?? 0} posts
            </p>
          </div>
        </div>
      </div>

      {ProjectsData?.map((project, i) => (
        <Tweet
          key={project.projectName}
          isThreaded={i < (ProjectsData?.length || 0) - 1}
          TweetComponent={
            <ListProject
              project={project?.projectName || ""}
              purpose={(project as any)?.purpose || ""}
              githubLink={project?.githubLink || ""}
              liveProject={project?.liveProject || ""}
              listitems={project?.listItems || []}
              techstack={project?.techStack || ""}
              demoVideo={project?.demoVideo || ""}
            />
          }
        />
      ))}
    </>
  );
};

export default ProjectsTweetThread;
