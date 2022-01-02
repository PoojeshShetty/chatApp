import Chatfeed from './Chatfeed'
import './Chats.css'

function Chats({chatfeed}) {
    return (
        <div className="Chats">
            {chatfeed && chatfeed.map(chat => 
                <Chatfeed chat={chat} key={chat.id}/>
            )}
        </div>
    )
}

export default Chats
