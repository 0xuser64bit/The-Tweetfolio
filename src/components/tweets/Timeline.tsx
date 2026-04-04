import React from "react";

interface Props {
  date: string;
  title: string;
  description: string;
}

const Timeline: React.FC<Props> = ({ date, title, description }) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 bg-x-border rounded-full mt-1.5 -start-1.5 border border-x-primary"></div>
      <time className="mb-1 text-sm font-normal leading-none text-x-text-secondary">
        {date ? date : "No Date"}
      </time>
      <h3 className="text-lg font-semibold text-x-text-primary">
        {title ? title : "No Title"}
      </h3>
      <p className="mb-4 text-base font-normal text-x-text-secondary">
        {description ? description : "No Description"}
      </p>
    </li>
  );
};

export default Timeline;
