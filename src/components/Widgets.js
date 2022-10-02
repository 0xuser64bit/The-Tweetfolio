import React , {useState} from "react";
import "./Widgets.css";
import Popup from 'reactjs-popup';
import chandler from './Images/chandler2.jpg';


import {
  TwitterTimelineEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const onClose = () => {
      setOpen(prev => !prev)
    }
  const Popup2 = (props) => {
     
    return (
      <Popup open={open} closeOnDocumentClick >
        <div className="modal">

          <button className="close" onClick={closeModal}>  &times;</button>
          <br/>
          <br/>
          <img src={props.image}/>
          <div dangerouslySetInnerHTML={{ __html: props.Text }} />
          

        </div>
      </Popup>
    )
  }
    return (
    <>
      <div className="widgets">
        <div className="widgets__input" onClick={onClose}>
          <SearchIcon className="widgets__searchIcon"  />
          <Popup2 image={chandler} Text="The site is still under construction...Stay Tuned for further updates ✌" />
          <input placeholder="Search Twitter" type="text" />
        </div>

        <div className="widgets__widgetContainer">
          <h2>What's happening</h2>


          <TwitterTimelineEmbed 
            sourceType="profile"
            screenName="aparth11"
            options={{ height: 400 }}
          />

          
        </div>
      </div>
    </>
  );
}

export default Widgets;
// Footer