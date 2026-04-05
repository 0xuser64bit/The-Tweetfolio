import React, { useState } from "react";
import Header from "./components/Header";
import Profile from "./components/user/Profile";
import ProfileTabs from "./components/user/ProfileTabs";
import Tweet from "./components/tweets/Tweet";
import LoadingScreen from "./components/LoadingScreen";
import {
  Education,
  Skills,
  Experience,
  Projects,
  Achievements,
  Contributions,
  Hobbies,
} from "./components/tweets/__index__";
import PinnedTweet from "./components/tweets/PinnedTweet";
import { Link } from "react-router-dom";
import { ProjectsData } from "./config";
import Footer from "./components/Footer";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`md:w-3/5 h-screen mx-auto ${isLoading ? 'hidden' : ''}`}>
        <Header />
        <Profile />
        <ProfileTabs />
        <div id="section-pinned">
          <Tweet TweetComponent={<PinnedTweet />} pinned date="Oct 2024" />
        </div>
        <div id="section-contributions">
          <Tweet TweetComponent={<Contributions />} date="Sep 2024" />
        </div>
        <div id="section-projects">
          <Link to={"/proof-of-work"}>
            <Tweet
              TweetComponent={<Projects />}
              numberOfTweets={ProjectsData?.length}
              date="Aug 2024"
            />
          </Link>
        </div>
        <div id="section-experience">
          <Tweet TweetComponent={<Experience />} date="Apr 2023" />
        </div>
        <Tweet TweetComponent={<Achievements />} date="2023" />
        <Tweet TweetComponent={<Education />} date="Jul 2019" />
        <Tweet TweetComponent={<Skills />} date="2024" />
        <Tweet TweetComponent={<Hobbies />} date="Forever" />
        <Footer />
      </div>
    </>
  );
};

export default App;
