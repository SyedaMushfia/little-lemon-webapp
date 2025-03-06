import React from 'react'
import styles from "./header.module.css"
import useViewportWidth from '../hooks/useViewportWidth'
import { Link } from 'react-router';

function Header() {
  const width = useViewportWidth();

  const isDesktop = width > 1024;
  const isTab = width > 425 && width <= 1024;
  const isMobile = width <= 425; 

  return (
    <>
      <header className={styles.container}>
        {isDesktop && (
          <div className={styles.navbar}>
            <img src='../../images/logo.jpg' alt='little-lemon-logo' className={styles.logo}/>
            <nav>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/menu'>Menu</Link></li>
                <li><Link to='/bookings'>Reservations</Link></li>
                <li><Link to='/orderonline'>Order Online</Link></li>
                <li><Link to='login'>Login</Link></li>
              </ul>
            </nav>
          </div>
        )}
        {isTab && (
          <div className={styles.navbar}>
            <img src='../../images/logo.jpg' alt='little-lemon-logo' className={styles.logo}/>
            <div className={styles.tabNavbar}>
                <img src='../../images/🦆 icon _hamburger menu_.svg' alt='hamburger-menu'/>
                <img src='../../images/basket .svg'/>
            </div>
          </div>
        )}
        {isMobile && (
          <div className={styles.mobileNavbar}>
            <img src='../../images/🦆 icon _hamburger menu_.svg' alt='hamburger-menu'/>
            <img src='../../images/logo.jpg' alt='little-lemon-logo' className={styles.mobileLogo}/>
            <img src='../../images/basket .svg'/>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
