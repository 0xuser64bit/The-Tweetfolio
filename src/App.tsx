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
import RightSidebar from "./components/sidebar/RightSidebar";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import BottomNav from "./components/sidebar/BottomNav";
import { Link } from "react-router-dom";
import { ProjectsData } from "./config";
import Footer from "./components/Footer";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div className={`max-w-[1280px] mx-auto flex justify-center ${isLoading ? 'hidden' : ''}`}>
        {/* Skip to main content */}
        <a
          href="#main-feed"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-x-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* Left sidebar */}
        <div className="hidden xl:flex w-[275px] flex-col items-end pr-6">
          <LeftSidebar />
        </div>

        {/* Main feed — 600px max like X, no side borders on mobile */}
        <main id="main-feed" className="flex-1 max-w-[600px] min-h-screen md:border-x md:border-x-border pb-14 md:pb-0">
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
          <div id="section-achievements">
            <Tweet TweetComponent={<Achievements />} date="2023" />
          </div>
          <Tweet TweetComponent={<Education />} date="Jul 2019" />
          <Tweet TweetComponent={<Skills />} date="2024" />
          <Tweet TweetComponent={<Hobbies />} date="Forever" />
          <Footer />
        </main>

        {/* Right sidebar — 350px like X */}
        <div className="hidden lg:block w-[350px] pl-6">
          <RightSidebar />
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </>
  );
};

export default App;
