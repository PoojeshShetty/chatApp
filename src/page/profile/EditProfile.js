import {useState,useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useEditProfile } from '../../hooks/useEditProfile'

function EditProfile({user, setEdit}) {

    const [status, setStatus] = useState(user.status)
    const [username, setUsername] = useState(user.username)
    const [profileImg, setProfileImg] = useState(null)
    const [formerror, setFormerror] = useState(null)
    const {editProfile,pending,success } = useEditProfile(user.uid)

    useEffect(()=>{

        const changeEdit = () => {
            setEdit(false)
        }
        if(success)
            changeEdit()
    },[success,setEdit])

    const handleSave = (e) => {
        e.preventDefault()

        if(checkFormError())
        {
            setTimeout(()=> setFormerror(null), 7000)
            return
        }

        editProfile(username,profileImg,status)

    }

    const checkFormError = () => {
        if(profileImg && !profileImg.type.includes('image') && !profileImg.type.includes('svg'))
        {
            setFormerror("The type of file should be an image")
            return true
        }

        if(profileImg && profileImg.size>2000000)
        {
            setFormerror("The size of file should be less than 2 mb")
            return true
        }

        if(username.length>10)
        {
            setFormerror('number of characters should be less than 10')
            return true
        }

        return false
    }

    return (
        <div className='Profile'>
            <Navbar />
            <div className="profile__container profile__edit">
                
                <form action="" className="edit__form" onSubmit={(e) => handleSave(e)}>
                    {formerror && <div className="error--msg">{formerror}</div>
                    }

                    <div className="profile__username profile--info">
                        username - <input type="text" 
                                        value={username} 
                                        onChange={({target}) => setUsername(target.value.trim())}
                                        className="profile--username"
                                        required
                                />
                    </div>
                    <div className="profile__bio profile--info">
                        Status - 
                        <textarea type="text" value={status} onChange={({target})=> setStatus(target.value)} />
                    </div>

                    <input type="file" onChange={({target}) => setProfileImg(target.files[0])} />
                    
                    <div className="profile__btncll">
                        
                        {
                            pending ? 
                            <button className='profile--save btn--loading' disabled>
                                <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                            </button> :
                            <button className='profile--save'>Save</button>
                        }
                    </div>

                </form>
                <button className="profile--cancel" onClick={() => setEdit(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default EditProfile
