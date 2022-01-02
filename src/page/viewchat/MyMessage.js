import {useState,useEffect} from 'react'
import useMessage from '../../hooks/useMessage'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function MyMessage({chat, createdAt, chatId, messageId}) {
    const [editClickBt, setEditClickBt] = useState(false)
    const [editMsgBt, setEditMsgBt] = useState(false)
    const [editChat, setEditChat] = useState(chat)
    const {pending,editMessage, deleteMessage, success} = useMessage(chatId)

    useEffect(()=>{
        if(!success) return

        handleCancelEdit()
    },[success])

    const handleCancelEdit = () => {
        setEditMsgBt(false)
        setEditClickBt(false)
    }

    const handleSave = () => {
        if(editChat==="")
         return
        
        editMessage(messageId,editChat)
    }

    const handleDelete = () => {
        deleteMessage(messageId)
    }

    if(editMsgBt)
    return(
        <div className='chat__message self'>
            <textarea 
                className='message__edit'
                rows="4"
                value={editChat} 
                onChange={({target}) => setEditChat(target.value)}
            />
            <div className="collection__btn">
                
                {pending ? 
                <button className='btn--save' disabled>Load</button> :
                <button className='btn--save' onClick={handleSave}>Save</button>}

                <button className='btn--cancel'
                    onClick={handleCancelEdit}
                >Cancel</button>
            </div>
        
        </div>
    )

    return (
        <div className='chat__message self'>
            <div className="message__text"  onClick={()=> setEditClickBt(false)}>
                {chat}
            </div>
            <div className="right__option">
                <button className="edit__btn" onClick={() => setEditClickBt(!editClickBt)}>
                    <img src="/svg/edit.svg" alt="edit" />
                </button>

                {editClickBt && 
                    <div className="edit__option">
                        <div className="btn--edit">
                            <button onClick={()=> setEditMsgBt(true)}>edit</button>
                        </div>
                        {pending ?
                        <div className="btn--delete" disabled>
                            <button>Load</button>
                        </div>:
                        <div className="btn--delete" onClick={handleDelete}>
                            <button>delete</button>
                        </div>
                        }

                    </div>
                }

                <div className="message__createdAt">
                    {(formatDistanceToNow(createdAt) === "less than a minute")?
                            "1s" : formatDistanceToNow(createdAt) }
                </div>
            </div>
        </div>
    )
}

export default MyMessage
