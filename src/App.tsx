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
  Contributions,
  Hobbies,
} from "./components/tweets/__index__";
import PinnedTweet from "./components/tweets/PinnedTweet";
import RightSidebar from "./components/sidebar/RightSidebar";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import BottomNav from "./components/sidebar/BottomNav";
import { Link } from "react-router-dom";
import { ProjectsData } from "./config";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      <div
        className={`mx-auto grid justify-center grid-cols-1 md:grid-cols-[88px_minmax(0,600px)] lg:grid-cols-[88px_minmax(0,600px)_350px] xl:grid-cols-[275px_minmax(0,600px)_350px] xl:gap-x-0 ${isLoading ? "hidden" : ""}`}
      >
        {/* Skip to main content */}
        <a
          href="#main-feed"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-x-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>

        {/* Left sidebar — icon-only at md/lg, full at xl */}
        <aside className="hidden md:flex justify-end xl:pr-6">
          <LeftSidebar />
        </aside>

        {/* Main feed — 600px max like X */}
        <main
          id="main-feed"
          className="w-full max-w-150 min-h-screen md:border-x md:border-x-border pb-16 md:pb-0"
        >
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
        </main>

        {/* Right sidebar — 350px like X */}
        <aside className="hidden lg:block pl-6">
          <RightSidebar />
        </aside>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </>
  );
};

export default App;
