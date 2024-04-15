import React from "react";
import { ExperienceData } from "./config";
import Timeline from "../Timeline";

const Experience = () => {
    return (
        <div>
            <div>
                <h3 className="text-center text-2xl font-bold hover:opacity-80 ease-in-out">
                    Experience
                </h3>
                <ol className="relative border-s border-gray-200 dark:border-gray-700 mt-4">
                    {ExperienceData?.map(
                        ({ timeline, company_name, description }) => (
                            <Timeline
                                key={company_name}
                                date={timeline}
                                title={company_name}
                                description={description}
                            />
                        )
                    )}
                </ol>
            </div>
        </div>
    );
};

export default Experience;
