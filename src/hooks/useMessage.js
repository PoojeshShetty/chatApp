import {useState,useEffect} from 'react'
import { projectFirestore,timestamp } from '../config/firebase'

function useMessage(chatid) {
    
    const [pending, setPending] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const [success, setSuccess] = useState(null)
    
    useEffect(()=>{

        return () => setCancelled(true)
    },[])

    const sendMessage = async (chatObj, senderid, recieverid, recieverDisplayName, senderDisplayName) => {

        setPending(true)

        try{

            const createdAt = await timestamp.fromDate(new Date())
            await projectFirestore.collection('chats').doc(chatid).collection('messages').add({
                ...chatObj, createdAt
            })

            await projectFirestore.collection('chatsfeed').doc(senderid).collection('chats')
                    .doc(chatid).set({
                        ...chatObj, createdAt, recieverId:recieverid, recieverName: recieverDisplayName
                    })

            await projectFirestore.collection('chatsfeed').doc(recieverid).collection('chats')
            .doc(chatid).set({
                ...chatObj, createdAt, recieverId:senderid, recieverName: senderDisplayName
            })

        }catch(err){
            console.log(err.message)
        }finally{
            if(!cancelled)
                setPending(false)
        }

    }

    const editMessage = async (messageId,message) => {

        setPending(true)

        try{
            await projectFirestore.collection('chats').doc(chatid).collection('messages').doc(messageId)
                    .update({
                        message
                    })
            
            if(!cancelled)
                setSuccess(true)
        }catch(err)
        {
            console.log(err.message)
        }finally{
            if(!cancelled)
                setPending(false)
        }
    }

    const deleteMessage = async (messageId,message) => {

        setPending(true)

        try{
            await projectFirestore.collection('chats').doc(chatid).collection('messages').doc(messageId)
                    .delete()
            
            if(!cancelled)
                setSuccess(true)
        }catch(err)
        {
            console.log(err.message)
        }finally{
            if(!cancelled)
                setPending(false)
        }
    }

    return {
        sendMessage,
        editMessage,
        deleteMessage,
        pending,
        success
    }
}

export default useMessage
