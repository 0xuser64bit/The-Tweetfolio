import React, { forwardRef, useState } from "react";
import "./Post.css";
import Popup from 'reactjs-popup';
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";



const Post = forwardRef(
  ({ displayName, username, verified, text, text_link, image, avatar }, ref) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const onClose = () => {
      setOpen(prev => !prev)
    }
    const Popup1 = (props) => {
     
      return (
        <Popup open={open} closeOnDocumentClick >
          <div className="modal">

            <button className="close" onClick={closeModal}>  &times;</button>
            <div dangerouslySetInnerHTML={{ __html: props.Text }} />

          </div>
        </Popup>
      )
    }
    const [show, setShow] = useState(false);
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <span className="text">{text}</span>
              <span>{text_link}</span>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <ChatBubbleOutlineIcon onClick={onClose} className="post-btns" fontSize="small" />
            <Popup1 Text="   Thanks for Encouragement" />
            <RepeatIcon onClick={onClose} className="post-btns" fontSize="small" />
            <Popup1 Text="   Thanks for Encouragement" />
            <FavoriteBorderIcon onClick={onClose} className="post-btns" fontSize="small" />
            <Popup1 Text="   Thanks for Encouragement" />
            <PublishIcon onClick={onClose} className="post-btns" fontSize="small" />
            <Popup1 Text="Thanks for Encouragement" />



          </div>
        </div>
      </div>
    );
  }
);

export default Post;
