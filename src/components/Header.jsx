import React from 'react'
import logo from '../assets/img/logo.svg'
import specialVision from '../assets/img/special-vision.svg'


const Header = () => {
    return (
        <header className="header">
            <div className="header__container container">
                <a href="" className="logo">
                    <img src={logo} alt="" />
                </a>
                <div className="action">
                    <a id="specialVersion" href="">
                        <img src={specialVision} alt="" />
                    </a>
                    <button type="button" className="action__btn"></button>
                    <div className="action__text">
                        Личный кабинет
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header