import React from "react";
import "./MySkills.css";
import {
  PYTHON_SVG,
  C_SVG,
  JAVASCRIPT_SVG,
  HTML5_SVG,
  LINUX_SVG,
  DJANGO_SVG,
  CPP_SVG,
  REACT_SVG,
  CSS3_SVG,
  BASH_SVG,
  DOCKER_SVG,
  MYSQL_SVG,
  MONGODB_SVG,
  GITHUB_SVG,
  GIT_SVG,
} from "./icons";
const MySkills = () => {
  return (
    <>
      <h3 className="mySkills">Skills</h3>
      <div className="grid-skills">
        <div className="items">
          <PYTHON_SVG />
          <h5>Python</h5>
        </div>

        <div className="items">
          <C_SVG />
          <h5>C</h5>
        </div>

        <div className="items">
          <JAVASCRIPT_SVG />
          <h5>Javascript</h5>
        </div>

        <div className="items">
          <HTML5_SVG />
          <h5>HTML5</h5>
        </div>

        <div className="items">
          <LINUX_SVG />
          <h5>Linux</h5>
        </div>

        <div className="items">
          <DJANGO_SVG />
          <h5>Django</h5>
        </div>

        <div className="items">
          <CPP_SVG />
          <h5>C++</h5>
        </div>

        <div className="items">
          <REACT_SVG />
          <h5>React</h5>
        </div>

        <div className="items">
          <CSS3_SVG />
          <h5>CSS3</h5>
        </div>

        <div className="items">
          <BASH_SVG />
          <h5>Bash</h5>
        </div>

        <div className="items">
          <DOCKER_SVG />
          <h5>Docker</h5>
        </div>

        <div className="items">
          <MYSQL_SVG />
          <h5>MySQL</h5>
        </div>

        <div className="items">
          <MONGODB_SVG />
          <h5>MongoDB</h5>
        </div>

        <div className="items">
          <GITHUB_SVG />
          <h5>Github</h5>
        </div>

        <div className="items">
          <GIT_SVG />
          <h5>git</h5>
        </div>
      </div>
    </>
  );
};

export default MySkills;
