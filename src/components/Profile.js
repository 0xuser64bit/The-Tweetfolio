import React from "react";
import COVER_IMAGE from "../assets/cover.jpeg";
import PROFILE_IMAGE from "../assets/profile.jpeg";
import UserInfo from "./UserInfo";
import TwitterCoverModal from "./TwitterCoverModal";
import TwitterProfileModal from "./TwitterProfileModal";
const Profile = () => {
    return (
        <div>
            <div>
                <TwitterCoverModal image={COVER_IMAGE} />
            </div>
            <div>
                <TwitterProfileModal image={PROFILE_IMAGE} />
            </div>
            <div className="">
                <UserInfo />
            </div>
            <div></div>
        </div>
    );
};

export default Profile;
