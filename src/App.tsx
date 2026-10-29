import React from "react";
import Header from "./components/Header";
import Profile from "./components/user/Profile";
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
import { ProjectsData } from "./config";

const App = () => {
  return (
    <>
      <Header />
      <Profile />
      <div id="section-pinned">
        <Tweet id="post-intro" TweetComponent={<PinnedTweet />} pinned />
      </div>
      <div id="section-projects">
        <Tweet
          id="post-projects"
          TweetComponent={<Projects />}
          numberOfTweets={ProjectsData?.length}
        />
      </div>
      <div id="section-contributions">
        <Tweet id="post-contributions" TweetComponent={<Contributions />} />
      </div>
      <div id="section-experience">
        <Tweet id="post-experience" TweetComponent={<Experience />} />
      </div>
      <div id="section-skills">
        <Tweet id="post-skills" TweetComponent={<Skills />} />
      </div>
      <div id="section-education">
        <Tweet id="post-education" TweetComponent={<Education />} />
      </div>
      <div id="section-hobbies">
        <Tweet id="post-hobbies" TweetComponent={<Hobbies />} />
      </div>
    </>
  );
};

export default App;
