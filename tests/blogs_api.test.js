// eslint-disable-next-line no-unused-vars
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

    test('HTTP POST request to blogs', async () => {
        const newBlog = {
            title: 'HTTP POST worked',
            author: 'my by my',
            url: 'hmmmmm.oo',
            likes: 90253
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(response.body.at(-1).title).toEqual(newBlog.title)
    })

    test('likes property is missing from HTTP POST', async () => {
        const newBlog = {
            title: 'HTTP POST likes missing',
            author: 'my by my',
            url: 'hmmmmm.oo'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body.find((blog) => blog.title === 'HTTP POST likes missing').likes).toEqual(0)
    })

    test('title is missing from POST', async () => {
        const newBlog = {
            author: 'Title is missing',
            url: 'hmmmmm.oo'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    // test('url is missing from POST', async () => {
    //     const newBlog = {
    //         title: 'HTTP POST likes missing',
    //         author: 'Url is missing'
    //     }
    // })
})
