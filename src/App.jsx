import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [sortedBlogs, setSortedBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationType, setNotificationType] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        const blogsSortedByLikes = blogs.slice().sort((a, b) => b.likes - a.likes)
        setSortedBlogs(blogsSortedByLikes)
    }, [blogs])

    const handleCreateBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        try {
            const returnedBlog = await blogService.create(blogObject)

            setBlogs(blogs.concat(returnedBlog))
            setNotificationMessage(
                `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
            )
            setNotificationType(
                'success'
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
            }, 5000)
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

            setNotificationMessage(
                'Successful login'
            )
            setNotificationType(
                'success'
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
            }, 5000)
        } catch (exception) {
            setNotificationMessage(
                'Wrong credentials'
            )
            setNotificationType(
                'error'
            )
            setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleLikeBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.update(blogObject.id, blogObject)
            const updatedBlogs = blogs.map((blog) =>
                blog.id === returnedBlog.id ? returnedBlog : blog
            )
            setBlogs(updatedBlogs)
        } catch {null}
    }

    const handleDeleteBlog = async (blogObject) => {
        try {
            await blogService.remove(blogObject.id)
            const updatedBlogs = blogs.filter((blog) => blog.id !== blogObject.id)
            setBlogs(updatedBlogs)
        } catch {null}
    }

    if (user === null) {
        return (
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleLogin={handleLogin}
                notificationMessage={notificationMessage}
                notificationType={notificationType}
            />
        )
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification
                message={notificationMessage}
                type={notificationType}
            />
            <form onSubmit={handleLogout}>
                <p>
                    {user.name} logged in
                    <button id='logout' type='submit'>logout</button>
                </p>
            </form>
            {blogForm()}
            {sortedBlogs.map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} deleteBlog={handleDeleteBlog} loggedUser={user} />
            )}
        </div>
    )
}

export default App