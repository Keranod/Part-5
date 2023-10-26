const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username) {
        response.statusMessage = 'username property is missing'
        return response.status(400).end()
    }

    if (!password) {
        response.statusMessage = 'password property is missing'
        return response.status(400).end()
    }

    if (username.length < 3) {
        response.statusMessage = 'username must be at least 3 characters long'
        return response.status(400).end()
    }

    if (password.length < 3) {
        response.statusMessage = 'password must be at least 3 characters long'
        return response.status(400).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users)
})

module.exports = usersRouter
