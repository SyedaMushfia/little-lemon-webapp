import React from 'react'
import useViewportWidth from '../../hooks/useViewportWidth';
import styles from './hero.module.css';

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
           <button aria-label="Reserve a table at Little Lemon">Reserve a Table</button>
         </div>
         {isDesktop && <img src='../images/restaurantfood.jpg' alt='restaurant-food'/>}
      </div>
    </>
  )
}

export default Hero
