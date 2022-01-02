import {createContext, useReducer, useEffect} from 'react'
import { projectAuth } from '../config/firebase'

const initialState = {
    user:null,
    isAuthReady:false
}

const authReducer = (state, action) => {
    switch(action.type){

        case 'LOGIN':
            return {...state,user:action.payload}

        case 'AUTH_CHANGE':
            return {...state,isAuthReady: true, user:action.payload}

        case 'LOGOUT' : 
            return {...state,user:null}

        default:
            return state
    }
}

export const AuthContext = createContext()

function AuthContextProvider({children}){

    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(()=>{
        const unsub = projectAuth.onAuthStateChanged(user => {
            dispatch({type:'AUTH_CHANGE',payload:user})
            unsub()
        })
    },[])

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider