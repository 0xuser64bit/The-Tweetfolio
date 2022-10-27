import React from 'react'
import ResponsiveNavbar from './ResponsiveNavbar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import FeedResponsive from './FeedResponsive'
import ProfileResponsive from './ProfileResponsive'
import BlogsResponsive from './BlogsResponsive'
import ConnectionsResponsive from './ConnectionsResponsive'
const Main = () => {
  return (
    <>
     <Router>
        <ResponsiveNavbar/>
        <Routes>
          <Route path="/" element={<FeedResponsive/>}/>
          <Route path="/home" element={<FeedResponsive/>} />
          <Route path="/profile" element={<ProfileResponsive/>}/>
          <Route path="/posts" element={<BlogsResponsive/>}/>
          <Route path="/connects" element={<ConnectionsResponsive />}/>
        </Routes>
      </Router>
     </>
  )
}

export default Main