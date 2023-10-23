const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
  }
  
const totalLikes = (blogs) => {
    let sumOfLikes = 0
    
    blogs.forEach( (blog) => {
        sumOfLikes += blog.likes
    })

    return sumOfLikes
}

  module.exports = {
    dummy,
    totalLikes
  }