import {Link} from 'react-router-dom'
import {useUser} from '../../hooks/useUser'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function Chatfeed({chat}) {

    const {pending,userinfo} = useUser(chat.recieverId)

    if(pending)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    return (
        <Link to={`/viewchat/${chat.id}`}>
            <div className="chat__content">
                <div className="chat__avt">
                    <img src={userinfo.photoURL} alt="Imgtag" />
                    <div
                                className={
                                    userinfo.online?
                                    "user__status st--online":
                                    "user__status st--offline"
                                }
                    >
                    </div>
                </div>
                <div className="chat__info">
                    <div className="chat__header">
                        <div className="chat__title">
                            {userinfo.username}
                        </div>
                        <div className="chat__lastChatAt">
                            {(formatDistanceToNow(chat.createdAt.toDate()) === "less than a minute")?
                            "1s" : formatDistanceToNow(chat.createdAt.toDate()) }
                        </div>
                    </div>
                    <div className="chat__text">
                        <div className="chat__user">
                            {chat.message.length<50 ?
                            chat.message:
                            chat.message.slice(0,50).concat("...")}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Chatfeed
