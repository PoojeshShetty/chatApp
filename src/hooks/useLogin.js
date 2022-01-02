import {useState,useEffect} from 'react'
import { projectAuth, projectFirestore } from '../config/firebase'
import { useAuth } from './useAuth'

function useLogin() {

    const [pending, setPending] = useState(false)
    const [error, setError] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const {dispatch} = useAuth()

    useEffect(()=> {

        return () => setCancelled(true)
    },[])


    const login = async (email,password)  => {

        setPending(true)
        setError(null)

        try{

            const res = await projectAuth.signInWithEmailAndPassword(email,password)

            await projectFirestore.collection('users').doc(res.user.uid).update({online:true})
            dispatch({type:'LOGIN',payload:res.user})

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
        login,
        pending,
        error
    }
}

export {
    useLogin
}
