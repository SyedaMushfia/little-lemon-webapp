import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styles from '../homepage/testimonials.module.css'

function Testimonials() {
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
      <div className={styles.cardContainer}>
        {people.map(person => (
            <div key={person.name} className={styles.card}>
              <img src={person.image} alt={person.name}/>
              <h2>{person.name}</h2>
              <div className={styles.starContainer}>
                {stars.map((_, i) => (
                    <span key={i}>
                    {i < person.rating ? <StarIcon className={styles.stars}/> : <StarBorderIcon className={styles.stars}/>}
                    </span>
                ))}
              </div>
              <p>{person.testimonial}</p>
            </div>
        ))}
      </div>
     </div>
    </>
  )
}

export default Testimonials
