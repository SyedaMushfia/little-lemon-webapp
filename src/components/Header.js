import React from 'react'
import styles from "./header.module.css"
import useViewportWidth from '../hooks/useViewportWidth'

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
                <li><a>Home</a></li>
                <li><a>About</a></li>
                <li><a>Menu</a></li>
                <li><a>Reservations</a></li>
                <li><a>Order Online</a></li>
                <li><a>Login</a></li>
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
