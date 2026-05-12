import React from "react";
import { SkillsData } from "../../config";

const categoryEmoji: Record<string, string> = {
  "Programming Languages": "🧠",
  Tools: "🛠️",
  OS: "💻",
  Databases: "🗄️",
};

const Skills = () => {
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary mb-4">
        🚀 Tech Stack
      </h2>
      <div className="space-y-4">
        {Object.entries(SkillsData).map(([category, items]) => (
          <div key={category}>
            <p className="text-[13px] font-bold text-x-text-secondary mb-2">
              {categoryEmoji[category] || "•"} {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="bg-x-secondary text-x-text-primary text-[13px] font-medium px-3 py-1 rounded-full border border-x-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[14px] text-x-text-secondary border-l-2 border-x-border pl-3">
        This is what I work with daily — but I pick up new tools fast and ship
        with whatever the project needs.
      </p>
    </div>
  );
};

export default Skills;
