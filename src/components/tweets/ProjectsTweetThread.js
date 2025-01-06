import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProjectsData } from "../../config";
import ListProject from "./ListProject";
import Tweet from "./Tweet";

const ProjectsTweetThread = ({ title }) => {
  return (
    <div className="md:w-3/5 h-screen mx-auto">
      <div>
        <div
          className={`text-white sticky top-0 p-4 font-bold rounded-md z-[100] bg-black bg-opacity-80 border-[#2b3c47] border-l border-r`}
        >
          <div className="flex justify-between items-center">
            <Link to="/" className="hover:bg-gray-400/20 p-2 rounded-full">
              <BiArrowBack className="cursor-pointer" />
            </Link>
            <h1 className="capitalize text-center">{title}</h1>
            <div className="invisible"></div>
          </div>
        </div>
        {ProjectsData?.map((project, i) => (
          <>
            <Tweet
              TweetComponent={
                <ListProject
                  project={project?.projectName}
                  purpose={project?.purpose}
                  githubLink={project?.githubLink}
                  liveProject={project?.liveProject}
                  listitems={project?.listItems}
                  techstack={project?.techStack}
                  demoVideo={project?.demoVideo}
                />
              }
            />
            {ProjectsData?.length !== i + 1 && (
              <div className="h-10 ms-10 bg-gray-500 w-[1px]"></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTweetThread;
