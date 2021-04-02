import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

    const [showMenu, setShowMenu] = useState(false)

    const closeMobileMenu = () => setShowMenu(false)
    const openMobileMenu = () => setShowMenu(true)

    return (
        <div className='nav'>
            <div className='nav-inner'>
                <a href='https://www.potentialtoteach.be/zoek-materiaal' className='logo-link'>
                    <div className='logo' />
                </a>
                <div className='links'>
                    <a href='https://www.potentialtoteach.be/zoek-materiaal' className='nav-link'>Zoek materiaal</a>
                    <a href='https://www.potentialtoteach.be/veelgestelde-vragen' className='nav-link'>Veelgestelde
                        vragen</a>
                    <a href='https://www.potentialtoteach.be/over-potential' className='nav-link'>Over Potential</a>
                    <a href='https://www.potentialtoteach.be/contact' className='nav-link'>Contact</a>
                </div>
            </div>
            {/*mobile-nav*/}
            <div className='mobile-nav'>
                <div className='mobile-nav-bar'>
                    <a href='https://www.potentialtoteach.be/zoek-materiaal' className='logo-link mobile-logo'>
                        <div className='logo' />
                    </a>
                    <FontAwesomeIcon className="mobile-nav-bar-button" icon={faBars} onClick={openMobileMenu}/>
                </div>
                {showMenu && <div className='mobile-nav-menu-wrapper'>
                    <div className='mobile-nav-menu'>
                        <a href='https://www.potentialtoteach.be/zoek-materiaal' className='logo-link mobile-logo menu-logo'>
                            <div className='logo' />
                        </a>
                        <div className='links mobile-links'>
                            <a href='/' className='nav-link'>Home</a>
                            <a href='/cards' className='nav-link'>Bekijk kaarten</a>
                            <a href='https://www.potentialtoteach.be/zoek-materiaal' className='nav-link'>Zoek materiaal</a>
                            <a href='https://www.potentialtoteach.be/veelgestelde-vragen' className='nav-link'>Veelgestelde
                                vragen</a>
                            <a href='https://www.potentialtoteach.be/over-potential' className='nav-link'>Over Potential</a>
                            <a href='https://www.potentialtoteach.be/contact' className='nav-link'>Contact</a>
                        </div>
                    </div>
                    <div className='mobile-nav-closer' onClick={closeMobileMenu}></div>
                </div>}
            </div>
        </div>
    );
};
export default Header;
