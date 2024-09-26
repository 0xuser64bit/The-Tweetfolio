import React from "react";
import { HobbiesData } from "../../config";

const Hobbies = () => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center pb-4">Hobbies</h3>
      <ul>
        {HobbiesData?.map((hobby) => [
          <li className="pb-1" key={hobby}>
            ⭐ {hobby}
          </li>,
        ])}
      </ul>
    </div>
  );
};

export default Hobbies;
