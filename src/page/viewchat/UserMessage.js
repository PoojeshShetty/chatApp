import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function UserMessage({chat,createdAt}) {
    return (
        <div className='chat__message user'>
            <div className="message__createdAt">
            {(formatDistanceToNow(createdAt) === "less than a minute")?
                            "1s" : formatDistanceToNow(createdAt) }
            </div>
            <div className="message__text">
                {chat}
            </div>
        </div>
    )
}

export default UserMessage
