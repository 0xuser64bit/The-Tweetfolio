import React, { useMemo } from "react";

const TwitterViews = () => {
  const viewCount = useMemo(() => {
    return Math.floor(Math.random() * 9000) + 1000;
  }, []);

  const formatCount = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="flex items-center gap-1 group/views">
      <div className="p-2 rounded-full group-hover/views:bg-x-accent/10 transition-colors">
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] fill-x-text-secondary group-hover/views:fill-x-accent transition-colors"
        >
          <path d="M8.75 21V3h2v18h-2zM18.75 21V8.5h2V21h-2zM13.75 21v-9h2v9h-2zM3.75 21v-4h2v4h-2z" />
        </svg>
      </div>
      <span className="text-[13px] text-x-text-secondary group-hover/views:text-x-accent transition-colors">
        {formatCount(viewCount)}
      </span>
    </div>
  );
};

export default TwitterViews;
