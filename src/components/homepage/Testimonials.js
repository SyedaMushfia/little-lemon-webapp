import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styles from '../homepage/testimonials.module.css'
import { motion } from 'motion/react';
import useVisibility from '../../hooks/useVisibility';

function Testimonials() {
  const [isVisible, targetRef] = useVisibility();

  const people = [{
    name: 'George Mike',
    image: '../images/person2.jpg',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est est, vehicula a varius vel, ullamcorper ut libero. Cras laoreet vitae dolor a gravida.',
    rating: 4
  },
  {
    name: 'Sarah Clarke',
    image: '../images/person1.jpg',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est est, vehicula a varius vel, ullamcorper ut libero. Cras laoreet vitae dolor a gravida.',
    rating: 4
  },
  {
    name: 'Ciara Melnow',
    image: '../images/person4.jpg',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est est, vehicula a varius vel, ullamcorper ut libero. Cras laoreet vitae dolor a gravida.',
    rating: 4
  },
  {
    name: 'Nick Fish',
    image: '../images/person3.jpg',
    testimonial: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque est est, vehicula a varius vel, ullamcorper ut libero. Cras laoreet vitae dolor a gravida.',
    rating: 4
  }]

  let stars = [1, 2, 3, 4, 5];

  return (
    <>
      <div className={styles.container}>
      <h1>Testimonials</h1>
      <motion.div 
        className={styles.cardContainer}
        ref={targetRef}
        initial={{ y: 100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}>
        {people.map(person => (
            <div key={person.name} className={styles.card} role="article" aria-labelledby={`testimonial-${person.name}`}>
              <img src={person.image} alt={person.name}/>
              <h2>{person.name}</h2>
              <div className={styles.starContainer} aria-label={`Rating: ${person.rating} out of 5 stars`}>
                {stars.map((_, i) => (
                    <span key={i}>
                    {i < person.rating ? <StarIcon className={styles.stars}/> : <StarBorderIcon className={styles.stars}/>}
                    </span>
                ))}
              </div>
              <p>{person.testimonial}</p>
            </div>
        ))}
      </motion.div>
     </div>
    </>
  )
}

export default Testimonials
