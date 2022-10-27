import React from 'react'
import './ResponsiveNavbar.css';
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CallIcon from '@material-ui/icons/Call';
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom"

const ResponsiveNavbar = () => {
  return (
    <>
    <div className="navbar" id="myNavbar">
      <Link to='home'>
          <div className="sidebarBtn">
            <a href="#"><HomeIcon/></a>
          </div>
        </Link>
        <Link to='profile'>
          <div className="sidebarBtn">
            <a href="#"><PermIdentityIcon/></a>
          </div>
        </Link>
        <Link to='posts'>
          <div className="sidebarBtn">
            <a href="#"><ListAltIcon/></a>
          </div>
        </Link>
        <Link to='connects'>
          <div className="sidebarBtn">
            <a href="#"><CallIcon/></a>
          </div>
        </Link>
    </div>
    
    </>
  )
}

export default ResponsiveNavbar