const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test title blog 1',
        author: 'Me starring myself',
        url: 'some-random-url.pl',
        likes: 231
    },
    {
        title: 'Test title blog 2',
        author: 'You being youself',
        url: 'some-random-url.com',
        likes: 231123
    },
    {
        title: 'Test title blog 3',
        author: 'He being himself',
        url: 'some-random-url.org',
        likes: 231123123
    },
    {
        title: 'Test title blog 4',
        author: 'She being herself',
        url: 'some-random-url.io',
        likes: 3464574
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('api calls', () => {
    test('blogs lenght is correct and returned format is json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('property named "id" exists', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})
