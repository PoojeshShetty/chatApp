import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function Navbar({title}) {

    const history = useHistory()
    const {user} = useAuth()

    const handleBackClick = () =>{
        history.goBack()
    }
    return (
        <div className='Navbar'>
            <div className="navbar__container">
                <div className="navbar__backbtn">
                    <button onClick={handleBackClick}>
                        <img 
                        src="/svg/back.svg" alt="back" 
                        />
                    </button>
                </div>
                <div className="navbar__title">
                    {title}
                </div>
                <div className="navbar__user">
                    <Link to="/profile">
                        <img 
                        src={user.photoURL}
                        alt="user" 
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
