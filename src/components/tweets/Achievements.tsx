import React from "react";
import { AchievementsData } from "../../config";

const Achievements = () => {
  return (
    <div>
      <h3 className="text-xl font-bold pb-4">🏆 Achievements</h3>
      <ul className="space-y-2">
        {AchievementsData?.map((achievement) => (
          <li className="flex items-start gap-2 text-[15px]" key={achievement}>
            <span className="mt-0.5 flex-shrink-0">⭐</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
