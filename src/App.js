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
import { Link } from "react-router-dom";
import { ProjectsData } from "./components/tweets/config";
import Footer from "./components/Footer";
const App = () => {
    return (
        <div className="md:w-3/5 h-screen mx-auto">
            <Header />
            <Profile />
            <Tweet TweetComponent={<Education />} />
            <Tweet TweetComponent={<Skills />} />
            <Tweet TweetComponent={<Experience />} />
            <Link to={"/projects"}>
                <Tweet
                    TweetComponent={<Projects />}
                    numberOfTweets={ProjectsData?.length}
                />
            </Link>
            <Tweet TweetComponent={<Contributions />} />
            <Tweet TweetComponent={<Achievements />} />
            <Footer />
            {/* <Tweet TweetComponent={<Hobbies />} /> */}
        </div>
    );
};

export default App;
