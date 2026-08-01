import React from "react";
import Header from "./components/Header";
import Profile from "./components/user/Profile";
import ProfileTabs from "./components/user/ProfileTabs";
import Tweet from "./components/tweets/Tweet";
import {
  Education,
  Skills,
  Experience,
  Projects,
  Contributions,
  Hobbies,
} from "./components/tweets/__index__";
import PinnedTweet from "./components/tweets/PinnedTweet";
import { Link } from "react-router-dom";
import { ProjectsData } from "./config";

const App = () => {
  return (
    <>
      <Header />
      <Profile />
      <ProfileTabs />
      <div id="section-pinned">
        <Tweet TweetComponent={<PinnedTweet />} pinned date="Oct 2024" />
      </div>
      <div id="section-projects">
        <Link to="/proof-of-work" aria-label="Open Proof of Work thread">
          <Tweet
            interactive
            TweetComponent={<Projects />}
            numberOfTweets={ProjectsData?.length}
            date="Aug 2024"
          />
        </Link>
      </div>
      <div id="section-contributions">
        <Tweet TweetComponent={<Contributions />} date="Sep 2024" />
      </div>
      <div id="section-experience">
        <Tweet TweetComponent={<Experience />} date="Apr 2023" />
      </div>
      <div id="section-skills">
        <Tweet TweetComponent={<Skills />} date="2024" />
      </div>
      <div id="section-education">
        <Tweet TweetComponent={<Education />} date="Jul 2019" />
      </div>
      <div id="section-hobbies">
        <Tweet TweetComponent={<Hobbies />} date="Forever" />
      </div>
    </>
  );
};

export default App;
