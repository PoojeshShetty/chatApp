import {useState} from 'react'
import Search from '../../components/search/Search'
import './NewChat.css'
import {Link} from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useAuth } from '../../hooks/useAuth'
import { generateChatId } from '../../utils/chatId'
import { useUsers } from '../../hooks/useUsers'
import escapeStringRegexp from 'escape-string-regexp'

function NewChat() {

    const title = <span>NewChat</span>
    const [query, setQuery] = useState('')
    const {user:authUser} = useAuth()
    const {pending:pageLoad, viewusers} = useUsers(authUser.uid)

    if(pageLoad)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    let querylist = []
    if(query && query!=="" && viewusers.length>0)
    {
        const match = new RegExp(escapeStringRegexp(query),'i')
        querylist = viewusers.filter(user => match.test(user.username))
    }
    else
        querylist = viewusers
    return (
        <div className="NewChat">
            <Navbar title={title} />
            <div className="newchat__container">
                <Search query={query} setQuery={setQuery}/>

                {querylist && querylist.map(user => (
                    <div className="user__info" key={user.uid}>
                        <div className="user__img">
                            <img src={user.photoURL}
                                alt="user" />
                            
                            <div
                                className={
                                    user.online?
                                    "user__status st--online":
                                    "user__status st--offline"
                                }
                            >
                            </div>
                        </div>
                        <div className="user__username">
                            <Link to={`/viewprofile/${user.uid}`} >
                                {user.username}
                            </Link>
                        </div>
                        <div className="user__chat">
                            <Link to={`/viewchat/${generateChatId(authUser.uid,user.uid)}`}>
                                <img src="/svg/logo.svg" alt="" />
                                Chat
                            </Link>   
                        </div>
                    </div>
                ))

                }
            </div>


        </div>
    )
}

export default NewChat
