import React from "react";
import COVER_IMAGE from "../../assets/AnimeCover.gif";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import UserInfo from "./UserInfo";
import TwitterCoverModal from "./TwitterCoverModal";
import TwitterProfileModal from "./TwitterProfileModal";

const Profile = () => {
  return (
    <div>
      {/* Cover Image — 3:1 aspect ratio */}
      <TwitterCoverModal image={COVER_IMAGE} />

      {/* Avatar row */}
      <div className="flex justify-between items-start px-4">
        <TwitterProfileModal image={PROFILE_IMAGE} />
      </div>

      <UserInfo />
    </div>
  );
};

export default Profile;
