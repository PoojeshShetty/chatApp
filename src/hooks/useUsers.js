import {useState,useEffect} from 'react'
import { projectFirestore } from '../config/firebase'

function useUsers(uid) {

    const [pending, setPending] = useState(true)
    const [viewusers, setViewUsers] = useState([])
    
    useEffect(()=>{
        const unsub = projectFirestore.collection('users').onSnapshot(docs => {
            const result = []
            docs.forEach(doc => result.push({uid:doc.id, ...doc.data()}))
            setViewUsers(result.filter(doc => doc.uid !== uid))
            setPending(false)
        })

        return () => unsub()
    },[uid])

    return {
        pending,
        viewusers
    }
}

export {
    useUsers
} 
