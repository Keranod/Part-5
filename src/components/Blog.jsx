import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleViewDetails}>view</button>
    </div>
    <div style={{ display: viewDetails }}>
      {blog.url}<br/>
      likes {blog.likes}
      <button onClick={null}>like</button><br/>
      {blog.user.name}
    </div>
  </div>  
)}


export default Blog