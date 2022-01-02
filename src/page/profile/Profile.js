import {useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useAuth } from '../../hooks/useAuth'
import { useEditProfile } from '../../hooks/useEditProfile'
import EditProfile from './EditProfile'
import { useLogout} from '../../hooks/useLogout'
import './Profile.css'

function Profile() {

    const [editPf, setEditPf] = useState(false)
    const {user} = useAuth()
    const {profile, pending} = useEditProfile(user.uid)
    const {logout, pending:pendingLogout } = useLogout()

    if(pending)
    return (
        <div className='loading--page'>
          <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
        </div>
    )

    if(editPf)
    return(
        <EditProfile user={profile} setEdit={setEditPf}/>
    )

    const title = <span>{profile.username}</span>
    return (
        <div className='Profile'>
            <Navbar title={title} />
            <div className="profile__container">
                <div className="profile__info">
                    <div className="profile__img">
                        <img src={profile.photoURL} alt="prfImg" />
                    </div>
                    <div className="profile__edit">
                        <button onClick={() => setEditPf(true)}>
                            <img src="/svg/edit.svg" alt="edit" />
                            <span>edit</span>
                        </button>
                    </div>
                </div>
                <div className="profile__username profile--info">
                    username - <span className="profile--username">
                        {profile.username}</span>
                </div>
                <div className="profile__bio profile--info">
                    status - <span className='profile--bio'>
                            {profile.status}</span>
                </div>

                {
                    pendingLogout ? 
                    <button className='profile--logout' disabled>
                        <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                    </button> :
                    <button className='profile--logout' onClick={logout}>Logout</button>
                }

            </div>
        </div>
    )
}

export default Profile
