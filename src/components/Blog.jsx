import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog }) => {
  const [viewDetails, setViewDetails] = useState('none')

  const toggleViewDetails = () => {
    if (viewDetails === 'none') {
      setViewDetails('')
    } else {
      setViewDetails('none')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeBlog = async (blog) => {
    console.log(blog)
    const changedBlog = { ...blog, likes: ++blog.likes}

    likeBlog(changedBlog)
  }

  return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleViewDetails}>view</button>
    </div>
    <div style={{ display: viewDetails }}>
      {blog.url}<br/>
      likes {blog.likes}
      <button onClick={() => handleLikeBlog(blog)}>like</button><br/>
      {blog.user.name}
    </div>
  </div>  
)}


export default Blog