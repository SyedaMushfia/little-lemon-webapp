import React from 'react'
import dayjs from 'dayjs'
import styles from './confirmedBooking.module.css'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function ConfirmedBooking() {
    const bookingData = JSON.parse(localStorage.getItem('confirmedBooking'));

  return (
    <>
        <div className={styles.container}>
            <div className={styles.imgContainer}><img src='../images/restaurant1.jpg'/></div>
            <div className={styles.confirmationContainer}>
                <h1>Your table is booked!</h1>
                <div className={styles.dateContainer}>
                    <p className={styles.day}>{dayjs(bookingData?.selectedDate)?.format('DD')}</p>
                    <p className={styles.month}>{dayjs(bookingData?.selectedDate)?.format('MMMM')}</p>
                    <div className={styles.dateAndTime}>
                    <p>{dayjs(bookingData?.selectedDate)?.format('DD.MM.YYYY')}</p>
                    <p>{dayjs(bookingData?.time, 'HH:mm').format('h:mm A')}</p>
                    </div>
                </div>
                <p className={styles.message}>{`${bookingData?.firstName} ${bookingData?.lastName}, thank you for reserving a table with Little Lemon. We’re excited to host you and make your visit truly special. You’ll receive a confirmation email shortly with the details.`}</p>
            </div>
        </div>
    </>
  )
}

export default ConfirmedBooking
