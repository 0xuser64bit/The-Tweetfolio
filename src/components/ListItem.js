import React from "react";

const ListItem = () => {
    return (
        <div>
            <h3 className="text-2xl">Project Name</h3>
            <ul className="list-disc ps-8">
                <li> Something 1</li>
                <li> Something 1</li>
                <li> Something 1</li>
            </ul>
            <h4 className="ps-8 font-light text-gray-400">Tech stack</h4>
        </div>
    );
};

export default ListItem;
