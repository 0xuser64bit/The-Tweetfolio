import React from "react";
import Timeline from "./Timeline";
import { EducationData } from "../../config";

const Education = () => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-bold mb-4">
          🎓 Education
        </h3>
        <ol className="relative border-s border-x-border">
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
    </div>
  );
};

export default Education;
