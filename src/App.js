import React from "react";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Tweet from "./components/Tweet";

const App = () => {
    return (
        <div className="w-3/5 h-screen mx-auto border-[#2b3c47] border-l border-r">
            <Header />
            <Profile />
            <Tweet />
            <Tweet />
        </div>
    );
};

export default App;
