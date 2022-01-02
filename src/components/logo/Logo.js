import React from 'react'
import './Logo.css'

function Logo() {
    return (
        <div className='Logo'>
            <div className="logo__container">
                <img className="logo__img" src="/svg/logo.svg" alt="" />
                <div className="logo__txt">Chatt App</div>
            </div>
        </div>
    )
}

export default Logo
