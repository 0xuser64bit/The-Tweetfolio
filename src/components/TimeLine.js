import React, { Fragment } from "react";
import { Timeline, Event } from "react-timeline-scribble";
import "./TimeLine.css";

const TimeLine = () => {
  return (
    <>
      <h3>Education Part</h3>
      <Fragment>
        <Timeline key="1">
          <Event
            interval="2019 – 2023"
            title="Government Engineering College"
            subtitle="Patan-Gujarat"
          >
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam,
          </Event>
        </Timeline>
        <Timeline key="2">
          <Event
            interval="2017 – 2019"
            title="Sardar Patel Vidhyalaya"
            subtitle="Visnagar-Gujarat"
          >
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam,
          </Event>
        </Timeline>
      </Fragment>
    </>
  );
};

export default TimeLine;
