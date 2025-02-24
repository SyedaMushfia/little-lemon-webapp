import React from 'react'
import styles from './footer.module.css'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareIcon from '@mui/icons-material/Square';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import useViewportWidth from '../hooks/useViewportWidth';


function Footer() {
  const width = useViewportWidth();

  const isDesktop = width > 768;
  const isTab = width <= 768 && width > 425;
  const isMobile = width <= 425;

  const doormatNavigation = ['Home', 'About', 'Menu', 'Reservations', 'Order Online', 'Login'];
  const contact = [
    {
      icon: <LocationOnIcon/>,
      detail: '151 N. LaKalle Street, Chicago'
    },
    {
      icon: <PhoneIcon />,
      detail: '0123 456 7890'
    },
    {
      icon: <EmailIcon />,
      detail: 'info@littlelemon.com'
    }
  ];
  const socialMediaIcons = [
    {
    name: 'Instagram',
    icon: <InstagramIcon />
    }, 
    {
      name: 'X',
      icon: <XIcon />
    }, 
    {
      name: 'Facebook',
      icon: <FacebookIcon />
    }, 
    {
      name: 'Youtube',
      icon: <YouTubeIcon />
    }
  ]


  return (
    <footer className={styles.container}>
      {isDesktop && (
        <div className={styles.desktopFooter}>
         <img src='../../images/footerlogo.png' alt='little-lemon-logo' className={styles.logo}/>
        <nav>
            <ul>
              {doormatNavigation.map(link => (
                <li key={link}>
                  <SquareIcon className={styles.icon}/>
                  {link}
                </li>
              ))}
            </ul>
            <ul>
              {contact.map(info => (
                <li key={info.detail}>
                  <div>{info.icon}</div>
                  {info.detail}
                </li>
              ))}
            </ul>
            <ul>
                {socialMediaIcons.map(icon => (
                  <li key={icon.name}>{icon.icon}</li>
                ))}
            </ul>
        </nav>
      </div>
      )} 
      {isTab && (
        <>
          <div className={styles.tabFooter}>
          <img src='../../images/footerlogo.png' alt='little-lemon-logo' className={styles.logo}/>
          <ul>
                {socialMediaIcons.map(icon => (
                  <li key={icon.name}>{icon.icon}</li>
                ))}
          </ul>
        </div>
        <div className={styles.tabFooterNavLinks}>
          <nav>
          <ul>
              {doormatNavigation.map(link => (
                <li key={link}>
                  {link}
                </li>
              ))}
            </ul>
            <ul>
              {contact.map(info => (
                <li key={info.detail}>
                  <div>{info.icon}</div>
                  {info.detail}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        </>
      )}
      {isMobile && (
        <div className={styles.mobileFooter}>
         <img src='../../images/footerlogo.png' alt='little-lemon-logo' className={styles.logo}/>
         <nav>
           <ul>
                {doormatNavigation.map(link => (
                  <li key={link}>
                    {link}
                  </li>
                ))}
            </ul>
            <ul>
                {socialMediaIcons.map(icon => (
                  <li key={icon.name}>{icon.icon}</li>
                ))}
            </ul>
            <ul>
              {contact.map(info => (
                <li key={info.detail}>
                  <div className={styles.icon}>{info.icon}</div>
                  {info.detail}
                </li>
              ))}
            </ul>
         </nav>
        </div>
      )}
    </footer>
  )
}

export default Footer
