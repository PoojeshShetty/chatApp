import {useState, useEffect} from 'react'
import { projectFirestore,projectStorage } from '../config/firebase'
import { useAuth } from './useAuth'

function useEditProfile(uid) {

    const [profile, setProfile] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [success, setSuccess] = useState(null)
    const {user} = useAuth()

    useEffect(()=>{
        const unsub = projectFirestore.collection('users').doc(uid).onSnapshot(doc => {
            if(doc.data())
            {
                setProfile({uid:doc.id, ...doc.data()})
            }
            setPending(false)
        })

        return () => {
            unsub()
            setCancelled(true)
        }
    },[uid])

    const checkNUploadImg = async (profileImg) => {
        if(!profileImg)
           return null
        
        const prfuploadUrl = `/thumbnail/${uid}/${profileImg.name}`
        const res = await projectStorage.ref(prfuploadUrl).put(profileImg)
        const photoURL = await res.ref.getDownloadURL()
        return photoURL
    }

    const editProfile = async (username,profileImg,status) => {

        setPending(true)
        setError(null)
        setSuccess(null)

        try{

            const photoURL = await checkNUploadImg(profileImg)

            const updateObj = {}

            if(photoURL)
                updateObj.photoURL = photoURL
            updateObj.username = username
            updateObj.status = status

            await projectFirestore.collection('users').doc(uid).update({...updateObj})

            if(photoURL)
                await user.updateProfile({
                    photoURL
                })
            
            if(!cancelled)
                setSuccess(true)

        }catch(err){
            if(!cancelled)
            {
                setError(err.message)
                setTimeout(()=>setError(null), 7000)
            }
        }finally{
            if(!cancelled)
            setPending(false)
        }
    }

    return {
        editProfile,
        pending,
        error,
        profile,
        success
    }
}

export {
    useEditProfile
}
