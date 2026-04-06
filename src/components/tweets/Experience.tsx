import React from "react";
import { ExperienceData } from "../../config";
import Timeline from "./Timeline";

const Experience = () => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold mb-4">
          💼 Experience
        </h3>
        <ol className="relative border-s border-x-border">
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
    </div>
  );
};

export default Experience;
