import React  from 'react';
import './Blogs.css';
import BlogCard from './BlogCard';


const Blogs = () => {
  return (
    <>
        <div className="blogs">
          <div className="name_tag">
            <h2>
           Posts 
            </h2>
          </div>
           <div className="posts">
            <BlogCard url='https://iamprogrammer.hashnode.dev/digital-root'/>
            <BlogCard url='https://iamprogrammer.hashnode.dev/twitter-bot-using-python-and-deployed-on-heroku'/>
            <BlogCard url='https://iamprogrammer.hashnode.dev/sliding-window-technique'/>
            <BlogCard url='https://iamprogrammer.hashnode.dev/pascals-triangle'/>
            <BlogCard url='https://apnacodingadda.blogspot.com/2022/04/what-is-docker.html'/>
            <BlogCard url='https://apnacodingadda.blogspot.com/2022/03/makefile.html'/>
            <BlogCard url='https://apnacodingadda.blogspot.com/2022/02/what-is-digital-root.html'/>
            <BlogCard url='https://apnacodingadda.blogspot.com/2022/02/coding-problems-google-kick-start-2021.html'/>
           </div>
        </div>

    </>
  )
}

export default Blogs
