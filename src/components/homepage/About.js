import React from 'react'
import styles from '../homepage/about.module.css'

function About() {
  return (
    <div className={styles.container}>
      <div className={styles.aboutRestaurant}>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit lacus ac lorem mollis, sed tempus diam ullamcorper. Donec aliquet nisl ac lorem rutrum condimentum. Sed sollicitudin sagittis risus ac finibus. Donec vestibulum blandit erat. Cras elementum tincidunt purus, ac porta metus hendrerit et. Integer sit amet molestie risus. In pulvinar semper faucibus.</p>
      </div>
      <div className={styles.imagesContainer}>
        <div className={styles.images}><img src='../images/restaurant-chef.jpg' alt='restaurant-chef'/></div>
        <div className={styles.images}><img src='../images/restaurant.jpg' alt='restaurant-seating-area'/></div>
      </div>
    </div>
  )
}

export default About
