import React from 'react'
import BookingForm from './BookingForm'
import styles from '../bookingPage/bookingsPage.module.css'

function BookingsPage({availableTimes, formData, onDateChange, onInputChange, onClearForm}) {
  return (
    <>
      <div className={styles.imgContainer} role="banner" aria-labelledby="reservation-heading">
        <p id="reservation-heading">RESERVATION</p>
        <p aria-labelledby="book-table-heading">Book Your Table Online Now!</p>
      </div>
      <section>
        <BookingForm availableTimes={availableTimes} formData={formData} onDateChange={onDateChange}
          onInputChange={onInputChange}
          onClearForm={onClearForm}/>
      </section>
    </>
  )
}

export default BookingsPage
