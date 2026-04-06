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
    <div className="w-full max-w-[600px] mx-auto min-h-screen pb-16 md:pb-0">
      <div>
        {/* Thread header — X style */}
        <div className="text-x-text-primary sticky top-0 p-4 font-bold z-[100] bg-x-primary/80 backdrop-blur-md border-x-border border-l border-r border-b">
          <div className="flex items-center gap-3 sm:gap-6">
            <Link to="/" className="hover:bg-x-tertiary p-2 rounded-full transition-colors">
              <BiArrowBack className="cursor-pointer text-xl" />
            </Link>
            <h1 className="text-xl font-bold">{title}</h1>
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
      </div>
    </div>
  );
};

export default ProjectsTweetThread;
