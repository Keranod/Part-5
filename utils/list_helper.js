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
  // _.uniq gets only unique values
  // .map function within _.uniq creates new array of authors names
  // .map function of array created using _.uniq returns object with author name and blogs amount
  const authors = _.uniq(blogs.map(blog => blog.author)).map(author => {
    return {
      author,
      blogs: _.countBy(blogs, 'author')[author] || 0
      // iterates over blogs counting by author property
      // [author] retrives count from _.countBy
      // || 0 just in case if author does not exist
    }
  })

  //   // array of objects containing authors names and amount of blogs they have on the list
  //   const authors = authorsNames.map(author => {
  //     return {
  //       author,
  //       blogs: 0
  //     }
  //   })

  //   // count how many times his name appears
  //   authors.forEach((author) => {
  //     blogs.forEach((blog) => {
  //       if (blog.author === author.author) {
  //         author.blogs++
  //       }
  //     })
  //   })

  // return author name and amount of blogs that he has on the list
  return _.maxBy(authors, 'blogs')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
