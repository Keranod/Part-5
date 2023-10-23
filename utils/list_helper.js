const dummy = (blogs) => {
  if (blogs) {
    return 1
  }
}

const totalLikes = (blogs) => {
  let sumOfLikes = 0

  blogs.forEach((blog) => {
    sumOfLikes += blog.likes
  })

  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  let blogWithMostLikes = blogs[0]

  blogs.forEach((blog) => {
    if (blog.likes > blogWithMostLikes.likes) {
      blogWithMostLikes = blog
    }
  })

  return blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
