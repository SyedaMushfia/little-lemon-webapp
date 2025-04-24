import React from 'react'
import styles from "./header.module.css"
import useViewportWidth from '../hooks/useViewportWidth'
import { Link, useLocation } from 'react-router';
import { useState } from 'react';
import { AnimatePresence, motion } from "motion/react"

function Header() {
  const location = useLocation();
  const width = useViewportWidth();

  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = width > 1024;
  const isTab = width > 425 && width <= 1024;
  const isMobile = width <= 425; 

  const handleClick = () => setIsOpen(!isOpen);

  const handleLinkClick = () => setIsOpen(false);
  

  return (
    <>
      <header className={styles.container}>
        {isDesktop && (
          <div className={styles.navbar}>
            <Link to='/'><img src='../../images/logo.jpg' alt='little lemon logo' className={styles.logo}/></Link>
            <nav aria-label='Main navigation'>
              <ul>
                <li><Link to='/' className={location.pathname === '/' ? styles.activePage : ''}>Home</Link></li>
                <li><Link to='/about' className={location.pathname === '/about' ? styles.activePage : ''}>About</Link></li>
                <li><Link to='/menu' className={location.pathname === '/menu' ? styles.activePage : ''}>Menu</Link></li>
                <li><Link to='/bookings' className={location.pathname === '/bookings' ? styles.activePage : ''}>Reservations</Link></li>
                <li><Link to='/orderonline' className={location.pathname === '/orderonline' ? styles.activePage : ''}>Order Online</Link></li>
                <li><Link to='login' className={location.pathname === '/login' ? styles.activePage : ''}>Login</Link></li>
              </ul>
            </nav>
          </div>
        )}
        {isTab && (
          <>
            <div className={styles.navbar}>
            <Link to='/'><img src='../../images/logo.jpg' alt='little lemon logo' className={styles.logo}/></Link>
            <div className={styles.tabNavbar} aria-label="Tablet navigation">
                <img src='../../images/🦆 icon _hamburger menu_.svg' alt='Open menu' 
                role="button" 
                aria-label="Open menu"
                onClick={handleClick}/>
                <img src='../../images/basket .svg' alt='View cart' 
                role="button" 
                aria-label="View cart"/>
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
                <motion.div
                  className={styles.navbarDropdown}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 0, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <nav aria-label='Main navigation'>
                    <ul>
                      <li><Link to='/' onClick={handleLinkClick} className={location.pathname === '/' ? styles.activePage : ''}>Home</Link></li>
                      <li><Link to='/about' onClick={handleLinkClick} className={location.pathname === '/about' ? styles.activePage : ''}>About</Link></li>
                      <li><Link to='/menu' onClick={handleLinkClick} className={location.pathname === '/menu' ? styles.activePage : ''}>Menu</Link></li>
                      <li><Link to='/bookings' onClick={handleLinkClick} className={location.pathname === '/bookings' ? styles.activePage : ''}>Reservations</Link></li>
                      <li><Link to='/orderonline' onClick={handleLinkClick} className={location.pathname === '/orderonline' ? styles.activePage : ''}>Order Online</Link></li>
                      <li><Link to='/login' onClick={handleLinkClick} className={location.pathname === '/login' ? styles.activePage : ''}>Login</Link></li>
                    </ul>
                  </nav>
                </motion.div>
            )}
          </AnimatePresence>
          </>
        )}
        {isMobile && (
          <>
            <div className={styles.mobileNavbar} aria-label="Mobile navigation">
            <img src='../../images/🦆 icon _hamburger menu_.svg' alt='Open menu' className={styles.mobileIcons}
              role="button" 
              tabIndex={0} 
              onClick={handleClick}
              aria-label="Open menu"/>
            <Link to='/'><img src='../../images/logo.jpg' alt='little lemon logo' className={styles.mobileLogo}/></Link>
            <img src='../../images/basket .svg' alt='View cart' className={styles.mobileIcons}
              role="button" 
              aria-label="View cart"/>
          </div>
            <AnimatePresence>
            {isOpen && (
                <motion.div
                  className={styles.navbarDropdown}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 0, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <nav aria-label='Main navigation'>
                    <ul>
                      <li><Link to='/' onClick={handleLinkClick} className={location.pathname === '/' ? styles.activePage : ''}>Home</Link></li>
                      <li><Link to='/about' onClick={handleLinkClick} className={location.pathname === '/about' ? styles.activePage : ''}>About</Link></li>
                      <li><Link to='/menu' onClick={handleLinkClick} className={location.pathname === '/menu' ? styles.activePage : ''}>Menu</Link></li>
                      <li><Link to='/bookings' onClick={handleLinkClick} className={location.pathname === '/bookings' ? styles.activePage : ''}>Reservations</Link></li>
                      <li><Link to='/orderonline' onClick={handleLinkClick} className={location.pathname === '/orderonline' ? styles.activePage : ''}>Order Online</Link></li>
                      <li><Link to='/login' onClick={handleLinkClick} className={location.pathname === '/login' ? styles.activePage : ''}>Login</Link></li>
                    </ul>
                  </nav>
                </motion.div>
            )}
            </AnimatePresence>
          </>
        )}
      </header>
    </>
  )
}

export default Header
