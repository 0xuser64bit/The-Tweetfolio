import React from "react";
import Header from "./components/Header";
import Profile from "./components/user/Profile";
import Tweet from "./components/tweets/Tweet";
import {
  Education,
  Skills,
  Experience,
  Projects,
  Achievements,
  Contributions,
  Hobbies,
} from "./components/tweets/__index__";
import { Link } from "react-router-dom";
import { ProjectsData } from "./config";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="md:w-3/5 h-screen mx-auto">
      <Header />
      <Profile />
      <Tweet TweetComponent={<Contributions />} />
      <Link to={"/projects"}>
        <Tweet
          TweetComponent={<Projects />}
          numberOfTweets={ProjectsData?.length}
        />
      </Link>
      <Tweet TweetComponent={<Experience />} />
      <Tweet TweetComponent={<Achievements />} />
      <Tweet TweetComponent={<Education />} />
      <Tweet TweetComponent={<Skills />} />
      <Tweet TweetComponent={<Hobbies />} />
      <Footer />
    </div>
  );
};

export default App;
