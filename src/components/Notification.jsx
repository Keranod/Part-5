const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }

    if (type === null) {
        return null
    }
  
    if (type === 'error'){
        return <div className={type}>{message}</div>
    }

    return <div className={type}>{message}</div>
  }
  
  export default Notification
  