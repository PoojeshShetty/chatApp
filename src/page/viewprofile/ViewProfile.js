import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import {Link, useParams} from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { generateChatId } from '../../utils/chatId'
import './ViewProfile.css'
import { useAuth } from '../../hooks/useAuth'

function ViewProfile() {
    
    const {id} = useParams()
    const {pending,userinfo} = useUser(id)
    const {user:authUser} = useAuth()
    
    if(pending)
    return(
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    if(!userinfo)
    return(
        <div className='page--info'>
            User does not exist
        </div>
    )

    const title = <span>{userinfo.username}</span>
    return (
        <div className="ViewProfile">
            <Navbar title={title} />

            <div className="viewprofile__info">
                    <div className="viewprofile__header">
                        <div className="viewprofile__img">
                            <img src={userinfo.photoURL} alt="" />

                            <div
                                className={
                                    userinfo.online?
                                    "viewprofile__status st--online":
                                    "viewprofile__status st--offline"
                                }
                            >

                            </div>
                        </div>
                        <div className="viewprofile__chatbtn">
                            <Link to={`/viewchat/${generateChatId(authUser.uid,userinfo.uid)}`}>
                                <img src="/svg/logo.svg" alt="" />
                                Chat
                            </Link> 
                        </div>
                    </div>
                
                <div className="viewprofile__username viewprofile--info">
                    username - <span className="profile--username">
                        {userinfo.username}</span>
                </div>
                <div className="viewprofile__bio viewprofile--info">
                    status - <span className='profile--bio'>
                            {userinfo.status}</span>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile
