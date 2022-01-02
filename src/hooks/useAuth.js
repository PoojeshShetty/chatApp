import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

function useAuth() {

    const context = useContext(AuthContext)

    if(!context)
       console.log('The component should be inside authcontext provider')

    return context
}

export {
    useAuth
} 
