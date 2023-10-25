const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).end()
    }

    if (!body.url) {
        return response.status(400).end()
    }

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    if (!body.title) {
        return response.status(400).end().json({ error: 'Missing title property' })
    }

    const title = body.title

    let likes = 0

    if (body.likes) {
        likes = body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
        { title, likes },
        { runValidators: true, context: 'query' }
    )

    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
