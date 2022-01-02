import {useState} from 'react'
import Logo from '../../components/logo/Logo'
import { useLogin } from '../../hooks/useLogin'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)

    const {login, pending, error} = useLogin()

    const handleFormSubmit = (e) => {

        e.preventDefault()

        setFormError(null)

        if(checkFormError())
        {
            setTimeout(()=> setFormError(null), 7000)
            return
        }

        login(email,password)
    }
    
    const checkFormError = () => {
        if(password.length<10)
        {
            setFormError('Password length should be greater than or equal to 10 characters')
            return true
        }

        return false
    }

    const handleGuestCredential = (e) => {
        e.preventDefault()
        setEmail('test@gmail.com')
        setPassword('testpassword')
    }
   
    return (

        <div>
            <Logo />
            <div className="login__container">
                <form action="" className="login__form" onSubmit={(e) => handleFormSubmit(e)}>

                    <h2>Login</h2>

                    {formError && <div className="error--msg">{formError}</div>
                    }

                    {error && <div className="error--msg">{error}</div>
                    }

                    <div className="form__control">
                        <input 
                            type="email" 
                            placeholder='Email'
                            value={email}
                            onChange={({target}) => setEmail(target.value)}
                            required
                        />
                    </div>

                    <div className="form__control">
                        <input 
                            type="password" 
                            placeholder='Password'
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                            required
                        />
                    </div>
                    <div className="loginfrm__btncll">
                        { pending ?
                        <button className="btn btn--loading">
                            <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                        </button> :
                        <button className="btn">Login</button>
                        }
                        <button 
                            className="btn btn--guest"
                            onClick={(e) => handleGuestCredential(e)}
                            >Guest Credential</button> 
                    </div>
                    <div className="form__links">
                         Don't have an account ? <Link to='/signup'>Sign up</Link> 
                    </div>
                    
                </form>

            </div>
        </div>
    )
}

export default Login
