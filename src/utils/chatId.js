
export const generateChatId = (id1, id2) => {

    let result = []
    result = result.concat([id1,id2]).sort()
    
    return result.join("")
}

export const checkChatId = (userUid, chatId, userList) => 
{
    //if match is null then the userUid is not present
    if(!chatId.match(userUid))
        return false
    
    //if user uid present then get second id
    if(chatId.match(userUid).index >= 0 )
    {
        let index = chatId.match(userUid).index
        let secondId = null
        if(index>0)
        {
            secondId =chatId.substr(0,index)
        }
        else
        {
            secondId = chatId.substr(userUid.length)
        }

        if(secondId === userUid)
        {
            return false
        }

        if(userList.map(user => user.uid).includes(secondId))
        {
            return true
        }
        else
            return false

    }
    else // else return false if user uid not present since user not authorized to see other chats
    return false
}

export const getRecieverUser = (userUid, chatId, userList) => {
    let index = chatId.match(userUid).index
    let secondId = null
    if(index>0)
    {
        secondId =chatId.substr(0,index)
    }
    else
        secondId = chatId.substr(userUid.length)
    
    let recieveUsr = null
    userList.forEach(user => {
        if(user.uid===secondId)
          recieveUsr = user
    })

    return {...recieveUsr}
    
}