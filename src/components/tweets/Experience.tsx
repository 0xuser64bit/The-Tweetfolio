import React from "react";
import { ExperienceData } from "../../config";
import Timeline from "./Timeline";

const Experience = () => {
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary mb-4">
        💼 Experience
      </h2>
      <ol className="relative border-l border-x-border">
        {ExperienceData?.map(({ timeline, company_name, description }) => (
          <Timeline
            key={company_name}
            date={timeline}
            title={company_name}
            description={description}
          />
        ))}
      </ol>
    </div>
  );
};

export default Experience;
