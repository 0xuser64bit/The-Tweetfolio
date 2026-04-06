import React from "react";
import COVER_IMAGE from "../../assets/cover.jpg";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import UserInfo from "./UserInfo";
import TwitterCoverModal from "./TwitterCoverModal";
import TwitterProfileModal from "./TwitterProfileModal";

const Profile = () => {
  return (
    <div className="border-x-border border-l border-r">
      {/* Cover Image — 3:1 aspect ratio */}
      <div>
        <TwitterCoverModal image={COVER_IMAGE} />
      </div>

      {/* Avatar row */}
      <div className="flex justify-between items-start px-4">
        <TwitterProfileModal image={PROFILE_IMAGE} />
      </div>

      <div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Profile;
