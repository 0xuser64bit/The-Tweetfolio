import React from 'react'
import './ResponsiveNavbar.css';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import ListAltIcon from "@material-ui/icons/ListAlt";
const ResponsiveNavbar = () => {
  return (
    <>
    <div class="navbar" id="myNavbar">
        <a href="#"><HomeIcon/></a>
        <a href="#"><PersonIcon/></a>
        <a href="#"><ListAltIcon/></a>
        <a href="#"><CallIcon/></a>
    </div>
    
    </>
  )
}

export default ResponsiveNavbar