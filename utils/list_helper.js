const _ = require('lodash')

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

const mostBlogs = (blogs) => {
  // get all authors names
  // .map function creates new array of authors names
  // _.unig gets only unique values
  const authorsNames = _.uniq(blogs.map(blog => blog.author))

  // array of objects containing authors names and amount of blogs they have on the list
  const authors = authorsNames.map(author => {
    return {
      author,
      blogs: 0
    }
  })

  // count how many times his name appears
  authors.forEach((author) => {
    blogs.forEach((blog) => {
      if (blog.author === author.author) {
        author.blogs++
      }
    })
  })

  // return author name and amount of blogs that he has on the list
  let authorWithMostBlogs = authors[0]
  authors.forEach((author) => {
    if (authorWithMostBlogs.blogs < author.blogs) {
      authorWithMostBlogs = author
    }
  })

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
