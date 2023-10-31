import Notification from './Notification'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    notificationMessage,
    notificationType
}) => {
return (
    <div>
      <h2>Log in to application</h2>
      <Notification 
        message={notificationMessage} 
        type={notificationType}
      />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type='text'
          value={username}
          name='Username'
          onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
          type='password'
          value={password}
          name='Password'
          onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}
 export default LoginForm