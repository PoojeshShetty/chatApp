import {useState, useEffect} from 'react'
import { projectAuth,projectFirestore } from '../config/firebase'
import { useAuth } from './useAuth'


function useSignup() {
    
    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [success, setSuccess] = useState(null)
    const {dispatch} = useAuth()

    useEffect(()=>{
        
        return () => setCancelled(true)
    },[])

    const signup = async (email, password, displayName, username) => {

        setPending(true)
        setError(null)
        setSuccess(null)
        try{

            const res = await projectAuth.createUserWithEmailAndPassword(email,password)

            await res.user.updateProfile({
                displayName: username,
                photoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            })

            await projectFirestore.collection('users').doc(res.user.uid)
                        .set({
                            displayName,
                            username,
                            online:true,
                            status:'',
                            photoURL:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                        })

            dispatch({type:'LOGIN',payload:res.user})

            if(!cancelled)
             setSuccess(true)

        }catch(err){
            if(!cancelled)
            {
                setError(err.message)
                setTimeout(()=> setError(null), 7000)
            }
        }finally{
            if(!cancelled)
                setPending(false)
        }
    }

    return {
        signup,
        pending,
        error,
        success
    }
}

export{
    useSignup
} 
