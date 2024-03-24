import React, { useEffect } from "react";
import Profile from "./Profile";

const Redirect = () => {
    useEffect(() => {
        window.location.href = "https://theterminaltourist.vercel.app/";
    });
    return <Profile />;
};

export default Redirect;
