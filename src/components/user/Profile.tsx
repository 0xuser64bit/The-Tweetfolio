import React from "react";
import COVER_IMAGE from "../../assets/cover.jpg";
import PROFILE_IMAGE from "../../assets/profile.jpg";
import UserInfo from "./UserInfo";
import TwitterCoverModal from "./TwitterCoverModal";
import TwitterProfileModal from "./TwitterProfileModal";
import { CONTACT_EMAIL } from "../../config";

const Profile = () => {
  return (
    <div className="border-x-border border-l border-r">
      {/* Cover Image — 3:1 aspect ratio */}
      <div>
        <TwitterCoverModal image={COVER_IMAGE} />
      </div>

      {/* Avatar + Action Button row */}
      <div className="flex justify-between items-start px-4">
        <TwitterProfileModal image={PROFILE_IMAGE} />
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-3 border border-x-border text-x-text-primary rounded-full px-4 py-1.5 font-bold text-sm hover:bg-x-tertiary transition-colors"
        >
          Contact me
        </a>
      </div>

      <div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Profile;
