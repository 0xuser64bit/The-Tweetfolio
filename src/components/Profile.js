import React from "react";
import BannerImage from "./Images/Code.png";
import "./Profile.css";
import ModalImage from "react-modal-image";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import TimeLine from "./TimeLine";
import avatar from "./Images/profile.jpg";
import Post from "./Post";
import Iframely from "./Iframely";
import MySkills from "./MySkills";
import List from "./List";
import {
  APPWRITE_PR_230,
  CODINASION_PR_654,
  CODING_INTERVIEW_UNIVERSITY_PR_1150,
  DEAUTH_PR_4,
  GITHUB_ID_URL,
  INSTAGRAM_ID_URL,
  LINKEDIN_ID_URL,
  OPEN_SAUCED_PR_1453,
  TWITTER_ID_URL,
} from "../config";

const Profile = () => {
  const displayName = "Arth 🇮🇳";
  const userName = "aparth11";

  return (
    <>
      <div className="main_container">
        <div className="my-profile" key="1">
          <div className="name_tag">
            <h2>{displayName}</h2>
          </div>
          <div className="banner_image">
            <ModalImage small={BannerImage} large={BannerImage} />
          </div>
          <div className="profile_image">
            <ModalImage small={avatar} large={avatar} />
          </div>

          <div className="descryption">
            <div className="userName">
              <h2>{displayName}</h2>
              <h4>
                <a href={TWITTER_ID_URL} target={"_blank"} rel="noreferrer">
                  @user64bit
                </a>
              </h4>
            </div>
            <div className="bio">
              <p>
                @Code 👨‍💻 @Anime 😌 @Gym 💪 @Early Bird 🐦 @gamer 🎲
                @Open-Sourcerer🧙‍♂️
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                minima dolores ea nisi voluptate, iste soluta architecto ipsam
                saepe odio sint obcaecati omnis facilis eius blanditiis
                temporibus quisquam repudiandae animi repellat reprehenderit eos
                unde adipisci earum! Sunt facilis similique dolore?
              </p>
            </div>
            <div className="connections">
              <a href={TWITTER_ID_URL} rel="noreferrer" target={"_blank"}>
                <TwitterIcon className="connections-icon twitter" />
              </a>
              <a href={GITHUB_ID_URL} rel="noreferrer" target={"_blank"}>
                <GitHubIcon className="connections-icon github" />
              </a>
              <a href={LINKEDIN_ID_URL} rel="noreferrer" target={"_blank"}>
                <LinkedInIcon className="connections-icon linkedin" />
              </a>
              <a href={INSTAGRAM_ID_URL} rel="noreferrer" target={"_blank"}>
                <InstagramIcon className="connections-icon instagram" />
              </a>
            </div>
          </div>

          <div className="my_journey">
            <div className="education">
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text={<MySkills />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text={<List />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text={<TimeLine />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text="About Project: Script to Perform Deauthntication Attack..."
                text_link={<Iframely url={DEAUTH_PR_4} size="" />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text="About Project: Open Sauced provides structured onboarding for new contributors to open source. This structure provides a way to track your next contributions by leveraging a unique dashboard built on top of the GitHub GraphQL API."
                text_link={<Iframely url={OPEN_SAUCED_PR_1453} size="" />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text="About Project: An open source codebase for sharing programming solutions."
                text_link={<Iframely url={CODINASION_PR_654} size="" />}
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text="About Project: This is  multi-month study plan for becoming a software engineer for a large company.(It has more than 231K+ stars)"
                text_link={
                  <Iframely url={CODING_INTERVIEW_UNIVERSITY_PR_1150} size="" />
                }
                avatar={avatar}
              ></Post>
              <Post
                displayName={displayName}
                username={userName}
                verified="true"
                text="About Project: Secure Backend Server for Web, Mobile & Flutter Developers rocket AKA the 100% open-source Firebase alternative."
                text_link={<Iframely url={APPWRITE_PR_230} size="" />}
                avatar={avatar}
              ></Post>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
