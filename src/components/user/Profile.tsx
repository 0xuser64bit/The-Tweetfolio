import React from "react";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import Cover from "./Cover";
import UserInfo from "./UserInfo";
import TwitterProfileModal from "./TwitterProfileModal";

const Profile = () => {
  return (
    <div className="animate-rise">
      {/* Signature signal-wave cover */}
      <Cover />

      {/* Avatar row */}
      <div className="flex justify-between items-start px-4">
        <TwitterProfileModal image={PROFILE_IMAGE} />
      </div>

      <UserInfo />
    </div>
  );
};

export default Profile;
