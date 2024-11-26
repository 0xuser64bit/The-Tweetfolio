import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { LiaLinkSolid } from "react-icons/lia";

const ListProject = ({
  project,
  purpose,
  githubLink,
  liveProject,
  listitems,
  techstack,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <h3 className="text-2xl pb-4 flex justify-center items-center gap-x-3">
        <a href={githubLink} target="_blank" rel="noreferrer">
          <FaGithub />
        </a>
        {project}
        <a href={liveProject} target="_blank" rel="noreferrer">
          <LiaLinkSolid />
        </a>
      </h3>
      {purpose && (
        <div className="pb-4">
          <h4 className="font-bold">Purpose:</h4>
          <p className="ps-8">{purpose}</p>
        </div>
      )}
      {listitems && (
        <div className="pb-4">
          <h4 className="font-bold">Key Highlights:</h4>
          <ul className="list-disc ps-8">
            {listitems?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {techstack && (
        <div className="">
          <h4 className="font-bold">Tech Stack:</h4>
          <h4 className="ps-8 font-light text-gray-400">{techstack}</h4>
        </div>
      )}
    </div>
  );
};

export default ListProject;
