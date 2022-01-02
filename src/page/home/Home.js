import Search from '../../components/search/Search'
import './Home.css'
import {Link} from 'react-router-dom'
import Chats from './Chats'
import { useLogout} from '../../hooks/useLogout'
import {useState, useEffect} from 'react'
import { projectFirestore } from '../../config/firebase'
import { useAuth } from '../../hooks/useAuth' 
import escapeStringRegexp from 'escape-string-regexp'

function Home() {

    const {logout, pending:pendingLogout } = useLogout()
    const [chatfeed, setChatfeed] = useState()
    const [pageLoad, setPageLoad] = useState(true)
    const [query, setQuery] = useState('')
    const {user} = useAuth()

    
    useEffect(()=>{
        const unsub = projectFirestore.collection('chatsfeed').doc(user.uid).collection('chats')
                        .orderBy('createdAt','desc').onSnapshot(docs => {
                            let result = []
                            docs.forEach(doc => result.push({id:doc.id, ...doc.data()}))
                            setChatfeed(result)
                            setPageLoad(false)
                        
                        })
        return () => unsub()
    },[user])

    if(pageLoad)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    let queryList = []
    if(query && query!=="" && chatfeed.length > 0){
        const match = new RegExp(escapeStringRegexp(query),'i')
        queryList = chatfeed.filter(user => match.test(user.recieverName))
    }
    else
        queryList = chatfeed
    
    if(chatfeed.length===0)
    return (
        <div className='Home'>
           <div className="home__header">
                <Search query={query} setQuery={setQuery}/>
                <div className="home__user">
                    <Link to="/profile">
                        <img 
                        src={user.photoURL} 
                        alt="user" 
                        />
                    </Link>
                </div>
           </div>
            <div className="home__links">
                <Link to="/newchat">New Chat</Link>
                    {
                    pendingLogout ? 
                    <button className='btn--logout' disabled>
                        <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                    </button> :
                    <button className='btn--logout' onClick={logout}>Logout</button>
                    }
            </div> 

            <div className="Chats">
                <div className="page--info">
                    Click on new Chat to start chatting.
                </div>
                
            </div> 
        </div>
    )

    return (
        <div className='Home'>
           <div className="home__header">
                <Search query={query} setQuery={setQuery}/>
                <div className="home__user">
                    <Link to="/profile">
                        <img 
                        src={user.photoURL} 
                        alt="user" 
                        />
                    </Link>
                </div>
           </div>
            <div className="home__links">
                <Link to="/newchat">New Chat</Link>
                {
                    pendingLogout ? 
                    <button className='btn--logout' disabled>
                        <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                    </button> :
                    <button className='btn--logout' onClick={logout}>Logout</button>
                }
            </div>

            <Chats chatfeed={queryList} />
        </div>
    )
}

export default Home
