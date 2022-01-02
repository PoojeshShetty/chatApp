import {useState} from 'react'
import useMessage from '../../hooks/useMessage'

function SendMessage({userid,username, chatid ,recieverid, recieverName}) {

    const [inputmessage, setInputMessage] = useState('')
    const {pending, sendMessage} = useMessage(chatid)

    const handleSendMessage = () => {

        if(inputmessage==="") return

        const chatObj = {
            uid:userid,
            username,
            message:inputmessage
        }

        sendMessage(chatObj,userid,recieverid,recieverName,username)

        setInputMessage('')
    }

    return (
        <div className="user__message">
            <textarea 
            className='message__input'
            placeholder='Type message'
            name="" cols="30" rows="1.5"
            value={inputmessage}
            onChange={({target}) => setInputMessage(target.value)}
            />

            {pending ? 
                <button className='message__send' onClick={handleSendMessage} disabled>
                   <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                </button>
                :
                <button className='message__send' onClick={handleSendMessage}>
                    <img src="/svg/send.svg" alt="send" />
                </button>
            }
        </div>
    )
}

export default SendMessage
