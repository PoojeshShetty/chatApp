import { useState } from 'react'
import Logo from '../../components/logo/Logo'
import { useSignup } from '../../hooks/useSignup'
import { Link } from 'react-router-dom'
import './Signup.css'

function Signup() {

    const [formerror, setFormError] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const {pending, signup, error} = useSignup()

    const handleFormSubmit = (e) => {

        e.preventDefault()

        if(checkFormError())
        {
            setTimeout(()=> setFormError(null),7000)
            return
        }

        setFormError(null)
        const displayName = firstName + ' ' + lastName

        signup(email,password,displayName,username)
    } 

    const checkFormError = () => {
        if(firstName.length>10 || lastName.length>10)
        {
            setFormError('number of characters should be less than 10')
            return true
        }

        if(password.length <10)
        {
            setFormError('password length should be greater than or equal to 10')
            return true
        }

        return false
    }

    return (
        <div>
            <Logo />
            <div className="signup__container">
                <form className="signup__form" onSubmit={(e)=> handleFormSubmit(e)}>
                    
                    <h2>Sign Up</h2>

                    {formerror && <div className='error--msg'>{formerror}</div>}
                    {error && <div className='error--msg'>{error}</div>}

                    <div className="form__control">
                        <input 
                        type="text" 
                        placeholder='First Name'
                        value={firstName}
                        onChange={({target}) => setFirstName(target.value.trim())}
                        required
                        />
                    </div>
                    
                    <div className="form__control">
                        <input 
                        type="text" 
                        placeholder='Last Name'
                        value={lastName}
                        onChange={({target}) => setLastName(target.value.trim())}
                        required
                        />
                    </div>
                    
                    <div className="form__control">
                        <input 
                        type="text" 
                        placeholder='Username'
                        value={username}
                        onChange={({target}) => setUsername(target.value.trim())}
                        required
                        />
                    </div>
                    
                    <div className="form__control">
                        <input 
                        type="email" 
                        placeholder='Email'
                        value={email}
                        onChange={({target}) => setEmail(target.value.trim())}
                        required
                        />
                    </div>
                    
                    <div className="form__control">
                        <input 
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={({target}) => setPassword(target.value.trim())}
                        required
                        />
                    </div>
                    
                    {pending ? 
                    <button className="btn btn--loading">
                        <img src="/svg/loading_icon.svg" alt="loading" className='load--icon' />
                    </button> :
                    <button className="btn">SignUp</button>
                    }

                    <div className="form__links">
                         Have an account ? <Link to='/login'>Login</Link> 
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup
