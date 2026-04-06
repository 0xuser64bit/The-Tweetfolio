import React from "react";
import { SkillsData } from "../../config";

const categoryEmoji: Record<string, string> = {
  "Programming Languages": "🧠",
  "Tools": "🛠️",
  "OS": "💻",
  "Databases": "🗄️",
};

const Skills = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">🚀 Tech Stack</h3>
      <div className="space-y-4">
        {Object.entries(SkillsData).map(([category, items], index) => (
          <div key={index}>
            <p className="text-[13px] font-semibold text-x-text-secondary uppercase tracking-wide mb-2">
              {categoryEmoji[category] || "•"} {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className="bg-x-secondary text-x-text-primary text-[14px] px-3 py-1.5 rounded-full border border-x-border hover:border-x-accent hover:text-x-accent transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="mt-5 text-[14px] text-x-text-secondary italic border-l-2 border-x-accent pl-3">
        This is what I work with daily — but I pick up new tools fast and ship with whatever the project needs.
      </p>
    </div>
  );
};

export default Skills;
