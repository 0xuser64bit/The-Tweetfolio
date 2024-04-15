import React from "react";
import Timeline from "../Timeline";
import { EducationData } from "./config";

const Education = () => {
    return (
        <div>
            <div>
                <h3 className="text-center text-2xl font-bold hover:opacity-80 ease-in-out">
                    Education
                </h3>
                <ol className="relative border-s border-gray-200 dark:border-gray-700 mt-4">
                    {EducationData?.map(({ date, title, description }) => (
                        <Timeline
                            key={title}
                            date={date}
                            title={title}
                            description={description}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Education;
