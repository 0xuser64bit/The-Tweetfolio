import React from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Tweet from "./components/Tweet";
import {
    Education,
    Skills,
    Experience,
    Projects,
    Achievements,
    Contributions,
    Hobbies,
} from "./components/tweets/__index__";
const App = () => {
    return (
        <div className="w-3/5 h-screen mx-auto border-[#2b3c47] border-l border-r">
            <Header />
            <Profile />
            <Tweet TweetComponent={<Education />} />
            <Tweet TweetComponent={<Skills />} />
            <Tweet TweetComponent={<Experience />} />
            <Tweet TweetComponent={<Projects />} />
            <Tweet TweetComponent={<Achievements />} />
            <Tweet TweetComponent={<Contributions />} />
            {/* <Tweet TweetComponent={<Hobbies />} /> */}
            <Tweet />
        </div>
    );
};

export default App;
