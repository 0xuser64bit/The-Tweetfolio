import React from "react";
import { formatCount } from "./TwitterLike";

interface ViewsButtonProps {
  initialCount?: number;
}

const ViewsButton: React.FC<ViewsButtonProps> = ({ initialCount = 1420 }) => {
  return (
    <span
      className="group/views flex items-center gap-1.5 p-2 -m-2 rounded-full text-x-text-secondary cursor-pointer hover:bg-x-accent/10 transition-colors"
      role="button"
      aria-label={`${formatCount(initialCount)} views`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4.5 h-4.5 fill-x-text-secondary group-hover/views:fill-x-accent transition-colors"
        aria-hidden="true"
      >
        <path d="M8.75 21V3h2v18h-2zM18.75 21V8.5h2V21h-2zM13.75 21v-9h2v9h-2zM3.75 21v-4h2v4h-2z" />
      </svg>
      {initialCount > 0 && (
        <span className="text-[13px] text-x-text-secondary group-hover/views:text-x-accent transition-colors">
          {formatCount(initialCount)}
        </span>
      )}
    </span>
  );
};

export default ViewsButton;
