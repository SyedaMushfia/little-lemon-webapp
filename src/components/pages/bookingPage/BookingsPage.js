import React from 'react'
import BookingForm from './BookingForm'
import styles from '../bookingPage/bookingsPage.module.css'

function BookingsPage({availableTimes, formData, errors, onInputBlur, onTimeFocus, onDateChange, onInputChange, onClearForm, onSubmitForm}) {
  return (
    <>
      <div className={styles.imgContainer} role="banner" aria-labelledby="reservation-heading">
        <p id="reservation-heading">RESERVATION</p>
        <p aria-labelledby="book-table-heading">Book Your Table Online Now!</p>
      </div>
      <section>
        <BookingForm 
          availableTimes={availableTimes} 
          formData={formData} 
          errors={errors} 
          onInputBlur={onInputBlur}
          onDateChange={onDateChange}
          onTimeFocus={onTimeFocus}
          onInputChange={onInputChange}
          onClearForm={onClearForm}
          onSubmitForm={onSubmitForm}/>
      </section>
    </>
  )
}

export default BookingsPage
