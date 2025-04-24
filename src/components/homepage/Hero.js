import React from 'react'
import useViewportWidth from '../../hooks/useViewportWidth';
import styles from './hero.module.css';
import { Link } from 'react-router';
import { motion } from 'motion/react';

function Hero() {
  const width = useViewportWidth();

  const isDesktop = width > 425; 

  return (
    <>
      <div className={styles.container}>
         <div>
           <h1>Little Lemon</h1>
           <h2>Chicago</h2>
           <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
           <Link to='/bookings'><button aria-label="Reserve a table at Little Lemon">Reserve a Table</button></Link>
         </div>
         {isDesktop && 
          <motion.img
            src='../images/restaurantfood.jpg' alt='restaurant-food'
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
          </motion.img>}
      </div>
    </>
  )
}

export default Hero
