import React from "react";
import Timeline from "../Timeline";
import { EducationData } from "./config";

const Education = () => {
    return (
        <div>
            <ol class="relative border-s border-gray-200 dark:border-gray-700 mt-4">
                {EducationData?.map(({ date, title, description }) => (
                    <Timeline
                        date={date}
                        title={title}
                        description={description}
                    />
                ))}
            </ol>
        </div>
    );
};

export default Education;
