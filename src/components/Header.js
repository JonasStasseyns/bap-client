import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {verifyJWT} from "../utils/JWT";

const Header = () => {

    // TODO Fix lifecycle of checking JWT  and rendering auth buttons conditionally
    // TODO Add register button next to login when not authenticated

    const [showMenu, setShowMenu] = useState(false)
    const [cartSize, setCartSize] = useState('')

    const closeMobileMenu = () => setShowMenu(false)
    const openMobileMenu = () => setShowMenu(true)

    useEffect(() => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart'))
            if (cart.length) setCartSize(cart.length)
        }catch (err){
            console.log("cart is empty or non-existing")
        }
        console.log(!!verifyJWT())
    }, [])

    return (
        <div className='nav'>
            <div className='nav-inner'>
                <a href='/' className='logo-link'>
                    <div className='logo' />
                </a>
                <div className='links'>
                    <a href='/products' className='nav-link'>Toestellen</a>
                    <a href='/techs' className='nav-link'>Installateurs</a>
                    <a href='/wizard' className='nav-link'>Waar begin ik?</a>
                    <a href='/messages' className='nav-link'>Berichten</a>
                    <a href='/cart' className='nav-link'>Winkelwagen ({cartSize})</a>
                    {verifyJWT() ? <a href='/auth/account' className='nav-link'>Account</a> : ''}
                    {verifyJWT() ? <a href='/auth/logout' className='nav-link'>Uitloggen</a> : <a href='/auth/login' className='nav-link'>Log in</a>}
                </div>
            </div>
            {/*mobile-nav*/}
            <div className='mobile-nav'>
                <div className='mobile-nav-bar'>
                    <a href='https://ac-assistant.be' className='logo-link mobile-logo'>
                        <div className='logo' />
                    </a>
                    <FontAwesomeIcon className="mobile-nav-bar-button" icon={faBars} onClick={openMobileMenu}/>
                </div>
                {showMenu && <div className='mobile-nav-menu-wrapper'>
                    <div className='mobile-nav-menu'>
                        <a href='https://ac-assistant.be' className='logo-link mobile-logo menu-logo'>
                            <div className='logo' />
                        </a>
                        <div className='links mobile-links'>
                            <a href='/' className='nav-link'>Home</a>
                            <a href='/products' className='nav-link'>Toestellen</a>
                            <a href='/techs' className='nav-link'>Installateurs</a>
                            <a href='/wizard' className='nav-link'>Waar begin ik?</a>
                            <a href='/messages' className='nav-link'>Berichten</a>
                            <a href='/cart' className='nav-link'>Winkelwagen</a>
                            {verifyJWT() ? <a href='/auth/logout' className='nav-link'>Uitloggen</a> : <a href='/auth/login' className='nav-link'>Log in</a>}
                        </div>
                    </div>
                    <div className='mobile-nav-closer' onClick={closeMobileMenu}></div>
                </div>}
            </div>
        </div>
    );
};
export default Header;
