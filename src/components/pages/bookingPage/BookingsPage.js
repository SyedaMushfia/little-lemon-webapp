import React from 'react'
import BookingForm from './BookingForm'
import styles from '../bookingPage/bookingsPage.module.css'

function BookingsPage({availableTimes, formData, onDateChange, onInputChange, onClearForm}) {
  return (
    <>
      <div className={styles.imgContainer}>
        <p>RESERVATION</p>
        <p>Book Your Table Online Now!</p>
      </div>
      <BookingForm availableTimes={availableTimes} formData={formData} onDateChange={onDateChange}
        onInputChange={onInputChange}
        onClearForm={onClearForm}/>
    </>
  )
}

export default BookingsPage
