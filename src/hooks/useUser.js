import {useState,useEffect} from 'react'
import { projectFirestore } from '../config/firebase'

function useUser(uid) {

    const [userinfo, setUserinfo] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(()=>{

        const getUser = async () =>{
    
            try{
                const user = await projectFirestore.collection('users').doc(uid).get()
                
                if(user.exists)
                setUserinfo({uid:user.id, ...user.data()})

            }catch(err)
            {
                console.log(err.message)
            }finally{
                setPending(false)
            }
        }

        getUser()

    },[uid])


    return{
        pending,
        userinfo
    }
}

export {
    useUser
} 
