import {useState,useEffect} from 'react'
import { projectAuth,projectFirestore } from '../config/firebase'
import { useAuth } from './useAuth'

function useLogout() {

    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const {user,dispatch} = useAuth()

    useEffect(()=> {

        return () => setCancelled(true)
    },[])


    const logout = async ()  => {

        setPending(true)
        setError(null)

        try{

            await projectFirestore.collection('users').doc(user.uid).update({
                online:false
            })
            await projectAuth.signOut()

            dispatch({type:'LOGOUT'})

        }catch(ex){
            if(!cancelled)
                {
                    setError(ex.message)
                    setTimeout(()=> setError(null), 7000)
                }

        }finally{
            if(!cancelled)
                setPending(false)
        }
    }

    return {
        logout,
        pending,
        error
    }
}

export {
    useLogout
}
