import React from "react";
import Timeline from "./Timeline";
import { EducationData } from "../../config";

const Education = () => {
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary mb-4">
        🎓 Education
      </h2>
      <ol className="relative border-l border-x-border">
        {EducationData?.map(({ date, title, description }) => (
          <Timeline
            key={title}
            date={date}
            title={title}
            description={description}
          />
        ))}
      </ol>
    </div>
  );
};

export default Education;
