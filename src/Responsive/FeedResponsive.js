import React from 'react'
import ResponsiveNavbar from './ResponsiveNavbar'
// import Avatar from '../components/Images/profile.jpg';
// import Post from '../components/Post';
import Error from './Error';

const FeedResponsive = () => {
  return (
    <>
    <ResponsiveNavbar/>
    {/* <Post
        key='1'
        displayName="Arth 🇮🇳 "
        username='aparth11'
        verified='true'
        text='This site is still under Construction :)'
        image={Meme}
        avatar={Avatar} /> */}
        <Error/>
    </>
  )
}

export default FeedResponsive