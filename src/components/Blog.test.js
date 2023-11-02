import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog default render', () => {
    let container

    const blog = {
        title: 'Test blog',
        author: 'Konrad being me',
        url: 'jungle.monkeys',
        likes: '1234',
        user: {
            name: 'Hades'
        }
    }

    const loggedUser = {
        username: 'Hades'
    }

    container = render(
        <Blog blog={blog} loggedUser={loggedUser} />
    ).container


    const titleAuthor = screen.getByText(`${blog.title} ${blog.author}`)

    expect(titleAuthor).toBeDefined()

    const div = container.querySelector('.viewDetails')

    expect(div).toHaveStyle('display: none')
})