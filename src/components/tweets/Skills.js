import React from "react";
import { SkillsData } from "./config";

const Skills = () => {
    return (
        <div className="rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-6 text-center hover:opacity-80 ease-in-out">
                Arcane Mastery
            </h2>
            <div className="flex justify-between">
                {Object.entries(SkillsData).map(([category, items], index) => (
                    <div key={index}>
                        <h3 className="text-lg font-medium mb-2 text-blue-500">
                            {category}
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-white">
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
