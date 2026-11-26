const Notification = ({ message, msgStyle }) => {
    if (message === null) {
        return null
    }

    console.log('Notification style: ', msgStyle)
    

    return (
        <div style={msgStyle}>
            {message}
        </div>
    )
}


export default Notification