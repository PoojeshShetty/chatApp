import {useState, useEffect,useRef} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link,useParams } from 'react-router-dom'
import MyMessage from './MyMessage'
import './ViewChat.css'
import { useUsers } from '../../hooks/useUsers'
import { useAuth } from '../../hooks/useAuth'
import { checkChatId,getRecieverUser } from '../../utils/chatId'
import { projectFirestore } from '../../config/firebase'
import SendMessage from './SendMessage'
import UserMessage from './UserMessage'

function ViewChat() {

    const {user:authUser} = useAuth()
    const [receiver, setReceiver] = useState(null)
    const {chatid} = useParams()
    const {pending, viewusers} = useUsers(authUser.uid)
    const [fetchChat, setFetchChat] = useState(null)
    const [chats, setChats] = useState([])
    const scrollref = useRef();

    useEffect(()=>{

        if(pending) return

        if(!checkChatId(authUser.uid,chatid,viewusers)) return

        const updatestate = () => {
            setReceiver(getRecieverUser(authUser.uid,chatid,viewusers))
            setFetchChat(chatid)
        }

        updatestate()
          
    },[pending,authUser,viewusers,chatid])

    useEffect(()=>{
        if(!fetchChat) return
        const unsub = projectFirestore.collection('chats').doc(fetchChat).collection('messages')
                .orderBy('createdAt','asc')
            .onSnapshot(docs => {
                let result = []
                docs.forEach(doc => {
                    if(doc.data())
                    result.push({id:doc.id, ...doc.data()})
                })
                setChats(result)
            })
        
        return () => unsub()
    },[fetchChat])

    useEffect(()=>{
        scrollref.current?.scrollIntoView({ behaviour: "smooth" });
    },[chats])

    if(pending)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    if(!checkChatId(authUser.uid,chatid,viewusers))
        return(
            <div className="page--info">
                Following chat does not exist
            </div>
        )
    
    if(!receiver)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    const title = <Link to={`/viewprofile/${receiver.uid}`}>{receiver.username}</Link>
    return (
        <div className='ViewChat'>

            <Navbar title={title} />

            <div className="viewchat__container">
                {chats && chats.map(chat=>(
                    <div className="viewchat__message" key={chat.id}>
                        {chat.uid=== authUser.uid ?
                        <MyMessage 
                            chat={chat.message} 
                            createdAt={chat.createdAt.toDate()}
                            chatId={fetchChat}
                            messageId={chat.id}
                        /> :
                        <UserMessage
                            chat={chat.message}
                            createdAt={chat.createdAt.toDate()}
                        />
                        }
                    </div>
                ))}
                 <div ref={scrollref}></div>
            </div>

            <SendMessage 
                userid={authUser.uid} 
                username={authUser.displayName} 
                chatid={fetchChat}
                recieverid={receiver.uid}
                recieverName={receiver.username}
            />

        </div>
    )
}

export default ViewChat
