import React from "react";

interface Props {
  date: string;
  title: string;
  description: string;
}

const Timeline: React.FC<Props> = ({ date, title, description }) => {
  return (
    <li className="relative ml-4 pb-6 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-x-text-secondary"
      />
      <time className="block text-[13px] text-x-text-secondary leading-tight">
        {date || "—"}
      </time>
      <h3 className="text-[15px] font-bold text-x-text-primary mt-0.5">
        {title || "Untitled"}
      </h3>
      <p className="text-[14px] text-x-text-secondary leading-5 mt-1">
        {description || ""}
      </p>
    </li>
  );
};

export default Timeline;
