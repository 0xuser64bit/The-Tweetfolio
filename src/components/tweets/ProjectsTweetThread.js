import React from "react";
import Tweet from "../Tweet";
import ListProject from "../ListProject";
import { ProjectsData } from "./config";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProjectsTweetThread = ({ title }) => {
    return (
        <div className="md:w-3/5 h-screen mx-auto">
            <div>
                <div
                    className={`text-white sticky top-0 p-4 font-bold rounded-md z-[100] bg-black bg-opacity-80 border-[#2b3c47] border-l border-r`}
                >
                    <div className="flex justify-center text-xl ">
                        <Link to="/">
                            <IoHomeOutline className="cursor-pointer" />
                        </Link>
                    </div>
                    <h1 className="capitalize">{title}</h1>
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
                                />
                            }
                        />
                        {ProjectsData?.length !== i + 1 ? (
                            <div className="h-10 ms-10 bg-gray-500 w-[1px]"></div>
                        ) : (
                            <div className="text-red-300">End</div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
};

export default ProjectsTweetThread;
