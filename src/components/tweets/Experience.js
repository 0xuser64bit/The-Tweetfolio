import React from "react";
import { ExperienceData } from "./config";
import Timeline from "../Timeline";

const Experience = () => {
    return (
        <div>
            <ol class="relative border-s border-gray-200 dark:border-gray-700 mt-4">
                {ExperienceData?.map(
                    ({ timeline, company_name, description }) => (
                        <Timeline
                            date={timeline}
                            title={company_name}
                            description={description}
                        />
                    )
                )}
            </ol>
        </div>
    );
};

export default Experience;
