import React from 'react'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import styles from '../homepage/specials.module.css';
import useViewportWidth from '../../hooks/useViewportWidth';

function Specials() {
  const productDetails = [{
    name: 'Greek Salad',
    price: '$12.99',
    description: 'A refreshing and vibrant mix of crisp cucumbers, juicy tomatoes, red onions, and tangy Kalamata olives, tossed with creamy feta cheese and drizzled with a zesty olive oil dressing.',
    image: '../images/greek-salad.jpg'
},
{
    name: 'Bruschetta',
    price: '$5.99',
    description: 'A classic Italian appetizer featuring crispy toasted bread topped with a fresh blend of ripe tomatoes, garlic, basil, and extra virgin olive oil. Finished with a hint of balsamic glaze for a perfect balance of flavors.',
    image: '../images/bruchetta.svg'
},
{
    name: 'Lemon Dessert',
    price: '$8.00',
    description: 'Indulge in the perfect balance of sweet and tangy with our Zesty Lemon Delight! This refreshing dessert features a buttery, melt-in-your-mouth crust, a smooth lemon curd filling, and a light dusting of powdered sugar for the perfect finish.',
    image: '../images/lemon-dessert.jpg'
}]

const width = useViewportWidth();

const isDesktop = width > 768;
const isTab = width <= 768;
const isMobile = width <= 425;


  return (
    <>
      {isDesktop && (
        <div className={styles.container}>
          <div className={styles.heading}>
           <h1>This weeks specials!</h1>
           <button>Online Menu</button>
         </div>
         <div className={styles.desktopProductCard}>
         {productDetails.map(food => (
           <div className={styles.desktopProductDetails} key={food.name}>
               <img src={food.image} alt={food.name}/>
               <div className={styles.name}>
                   <h1>{food.name}</h1>
                   <p>{food.price}</p>
               </div>
               <p className={styles.description}>{food.description}</p>
               <div className={styles.delivery}>
                 <h3>Order a delivery</h3>
                 <DeliveryDiningIcon />
               </div>
           </div>
         ))}
         </div>
        </div>
      )}
      {isTab && (
        <div className={styles.tabContainer}>
          <div className={styles.heading}>
           <h1>ORDER FOR DELIVERY!</h1>
         </div>
         <div className={styles.tabProductCard}>
         {productDetails.map(food => (
             <>
               <div className={styles.tabProductDetails} key={food.name}>
                 <div>
                   <h1>{food.name}</h1>
                   <p className={styles.description}>{food.description}</p>
                   <p className={styles.price}>{food.price}</p>
                   {isMobile ? null : <div className={styles.delivery}>
                     <h3>Order a delivery</h3>
                     <DeliveryDiningIcon />
                   </div>}
                 </div>
                 {isMobile ? null : <img src={food.image} alt={food.name}/>}
               </div>
             </>
           ))}
         </div>
        </div>
      )}
    </>
  )
}

export default Specials
