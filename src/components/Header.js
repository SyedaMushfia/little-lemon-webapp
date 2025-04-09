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
            <img src='../../images/logo.jpg' alt='little lemon logo' className={styles.logo}/>
            <nav aria-label='Main navigation'>
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
            <img src='../../images/logo.jpg' alt='little lemon logo' className={styles.logo}/>
            <div className={styles.tabNavbar} aria-label="Tablet navigation">
                <img src='../../images/🦆 icon _hamburger menu_.svg' alt='Open menu' 
                role="button" 
                aria-label="Open menu"/>
                <img src='../../images/basket .svg' alt='View cart' 
                role="button" 
                aria-label="View cart"/>
            </div>
          </div>
        )}
        {isMobile && (
          <div className={styles.mobileNavbar} aria-label="Mobile navigation">
            <img src='../../images/🦆 icon _hamburger menu_.svg' alt='Open menu' 
              role="button" 
              tabIndex={0} 
              aria-label="Open menu"/>
            <img src='../../images/logo.jpg' alt='little lemon logo' className={styles.mobileLogo}/>
            <img src='../../images/basket .svg' alt='View cart' 
              role="button" 
              aria-label="View cart"/>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
