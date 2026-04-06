import React from "react";
import { SkillsData } from "../../config";

const Skills = () => {
  return (
    <div className="rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Skills
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
        {Object.entries(SkillsData).map(([category, items], index) => (
          <div key={index}>
            <h3 className="text-[14px] font-semibold mb-2 text-x-accent uppercase tracking-wide">
              {category}
            </h3>
            <ul className="space-y-1">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-[14px] text-x-text-primary flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-x-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
