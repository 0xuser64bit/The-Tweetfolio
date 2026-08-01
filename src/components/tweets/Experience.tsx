import React from "react";
import { ExperienceData } from "../../config";

const Experience = () => {
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary">
        💼 Experience
      </h2>
      <p className="text-[15px] leading-5 text-x-text-secondary mt-1">
        Quick thread on my journey so far:
      </p>

      <div className="mt-3">
        {ExperienceData?.map(({ timeline, company_name, description }, i) => {
          const isCurrent = timeline.toLowerCase().includes("present");

          return (
            <div
              key={company_name}
              className={`pb-3 ${i < (ExperienceData?.length ?? 0) - 1 ? "mb-3 border-b border-x-border" : ""}`}
            >
              <p className="text-[15px] leading-tight">
                <span className="font-bold text-x-accent">{company_name}</span>
                {isCurrent && (
                  <span className="text-[12px] text-emerald-400 font-medium ml-1.5">
                    ● now
                  </span>
                )}
              </p>
              <p className="text-[13px] text-x-text-secondary mt-0.5">
                {timeline}
              </p>
              <p className="text-[15px] text-x-text-primary leading-5 mt-1.5">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
