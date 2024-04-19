import React from "react";
import { AchievementsData } from "./config";

const Achievements = () => {
    return (
        <div>
            <h3 className="text-2xl font-bold text-center pb-4">
                Achievements
            </h3>
            <ul>
                {AchievementsData?.map((achivement) => [
                    <li className="pb-1">⭐ {achivement}</li>,
                ])}
            </ul>
        </div>
    );
};

export default Achievements;
