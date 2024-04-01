import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import CodeIcon from "@material-ui/icons/Code";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Link } from "react-router-dom";
import Popups from "./Popups";

function Sidebar() {
  return (
    <div className="sidebar disabled">
      <CodeIcon className="sidebar__twitterIcon" />
      <div className="sidebarBtn" onClick={null}>
        <SidebarOption Icon={HomeIcon} text="Home" />
      </div>
      <Link to="profile">
        <div className="sidebarBtn">
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        </div>
      </Link>
      <Link to="posts">
        <div className="sidebarBtn">
          <SidebarOption Icon={ListAltIcon} text="Posts" />
        </div>
      </Link>
      <div className="sidebarBtn disabled" onClick={null}>
        <SidebarOption Icon={CallIcon} text="Connects" />
      </div>

      <Popups />
    </div>
  );
}

export default Sidebar;
