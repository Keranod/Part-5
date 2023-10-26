const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./users_test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('api users bad calls', () => {
    test('missing username property', async () => {
        const newUser = {
            name: 'Missing Username',
            password: 'AAAAAAAAAAAA'
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        console.log(response.body)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
