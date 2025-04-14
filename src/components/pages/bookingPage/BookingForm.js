import React from 'react';
import styles from '../bookingPage/bookingForm.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { validateEmail, validatePhone } from '../../../utils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import CakeIcon from '@mui/icons-material/Cake';
import DeckIcon from '@mui/icons-material/Deck';

function BookingForm({availableTimes, formData, onDateChange, onInputChange, onClearForm, onSubmitForm}) {
  const dropdownOptions = {
    people: ['1 person', '2 people', '3 people', '4 people', '5 people'],
    occasion: ['Birthday', 'Anniversary'],
    seatingArea: ['Indoor', 'Outdoor'],
  };

  const showErrorMessage = {
    firstName: "First name should be at least 2 characters",
    lastName: "Last name should be at least 2 characters",
    email: "Enter a valid email address",
    phone: "Enter a valid phone number",
  };


  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  })

  const getIsFormValid = () => {
    return (
      formData.firstName?.trim() && 
      formData.lastName?.trim() && 
      formData.email?.trim() &&
      formData.phone?.trim()
    ); 
  }; 
  
  const handleClickReserve = () => setStep(1);
  const handleClickNext = () => {
    if (step === 2) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true
      });
  
      if (!getIsFormValid()) return;

      setTouched({
        firstName: false,
        lastName: false,
        email: false,
        phone: false
      });
    }
  
    setStep(prev => prev + 1);
  };
  
  const handleClickContact = () => setStep(2);
  const handleClickConfirm = () => setStep(3);
    
  const handleBlur = (e) => {
    const {name} = e.target;

    setTouched(prev => ({...prev, [name]: true}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmitForm(formData);
    console.log(formData);
  }

  return (
    <>
    <div className={styles.container}>
        <div className={styles.formSteps}>
            <div className={styles.formStepsBtns}>
                <div>1</div>
                <button type='button' role='button' onClick={handleClickReserve} aria-label="Step 1: Reserve">RESERVE</button></div>
            <div className={styles.formStepsBtns}>
                <div>2</div>
                <button type='button' role='button' onClick={handleClickContact} aria-label="Step 2: Contact">CONTACT</button></div>
            <div className={styles.formStepsBtns}>
                <div>3</div>
                <button type='button' role='button' onClick={handleClickConfirm} aria-label="Step 3: Confirm">CONFIRM</button></div>
        </div>
        <form onSubmit={handleSubmit}>
            {step === 1 && <>
                <div className={styles.form}>
                <div className={styles.calendar}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar 
                        value={formData.selectedDate}
                        onChange={onDateChange}
                        aria-label="Select reservation date"
                        />
                    </LocalizationProvider>
                </div>
                <div className={styles.formFieldsContainer}>
                        <div>
                            <label htmlFor="time">Time</label>
                            <select 
                                id="time" 
                                value={formData['time']} 
                                onChange={onInputChange} 
                                aria-label="Select reservation time">
                                {Array.isArray(availableTimes) && availableTimes.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="people">People</label>
                            <select
                                id="people" 
                                value={formData.people} 
                                onChange={onInputChange} 
                                aria-label="Select number of people">
                                {dropdownOptions.people.map(number => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="occasion">Occasion</label>
                            <select
                               id="occasion" 
                               value={formData.occasion} 
                               onChange={onInputChange} 
                               aria-label="Select occasion">
                                {dropdownOptions.occasion.map(event => (
                                    <option key={event} value={event}>{event}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="seatingArea">Seating Area</label>
                            <select 
                                id="seatingArea" 
                                value={formData.seatingArea} 
                                onChange={onInputChange} 
                                aria-label="Select seating area">
                                {dropdownOptions.seatingArea.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                </div>
            </div>
            <button 
                className={styles.nextBtn} 
                onClick={handleClickNext} 
                type='button' 
                role='button'
                aria-label="Proceed to Contact Information"
                >
                    Next</button>
            </>}
            {step === 2 && 
                <>
                <div className={styles.contactDetails}>
                    <div>
                        <label htmlFor='firstName'>First Name<span>*</span></label>
                        <input 
                            type='text' 
                            id='firstName' 
                            name='firstName' 
                            value={formData.firstName} 
                            onChange={onInputChange} 
                            onBlur={handleBlur} 
                            className={`${touched.firstName && formData.firstName.length < 2 ? styles.errorInput : ''}`} 
                            aria-required="true" 
                            aria-describedby="first-name-error"/>
                    </div>
                    {touched.firstName && formData.firstName.length < 2 ? <p id="first-name-error" aria-live="assertive" className={styles.errorMessage}>{showErrorMessage.firstName}</p> : null}

                    <div>
                        <label htmlFor='lastName'>Last Name<span>*</span></label>
                        <input 
                            type='text' 
                            id='lastName' 
                            name='lastName' 
                            value={formData.lastName} 
                            onChange={onInputChange} 
                            onBlur={handleBlur} 
                            className={`${touched.lastName && formData.lastName.length < 2 ? styles.errorInput : ''}`} 
                            aria-required="true" 
                            aria-describedby="last-name-error"/>
                    </div>
                    {touched.lastName && formData.lastName.length < 2 ? <p id="last-name-error" aria-live="assertive" className={styles.errorMessage}>{showErrorMessage.lastName}</p> : null}

                    <div>
                        <label htmlFor='email'>Email<span>*</span></label>
                        <input 
                            type='email' 
                            id='email' 
                            name='email' 
                            value={formData.email} 
                            onChange={onInputChange} 
                            onBlur={handleBlur} 
                            className={`${touched.email && !validateEmail(formData.email) ? styles.errorInput : ''}`} 
                            aria-required="true" 
                            aria-describedby="email-error" 
                            aria-invalid={touched.email && !validateEmail(formData.email) ? "true" : "false"}/>
                    </div>
                    {touched.email && !validateEmail(formData.email) ? <p id="email-error" aria-live="assertive" className={styles.errorMessage}>{showErrorMessage.email}</p> : null}

                    <div>
                        <label htmlFor='phone'>Phone<span>*</span></label>
                        <input 
                            type='tel' 
                            id='phone' 
                            name='phone' 
                            value={formData.phone} 
                            onChange={onInputChange} 
                            onBlur={handleBlur} 
                            className={`${touched.phone && !validatePhone(formData.phone) ? styles.errorInput : ''}`} 
                            aria-required="true" 
                            aria-describedby="phone-error" 
                            aria-invalid={touched.phone && !validatePhone(formData.phone) ? "true" : "false"}/>
                    </div>
                    {touched.phone && !validatePhone(formData.phone) ? <p id="phone-error" aria-live="assertive" className={styles.errorMessage}>{showErrorMessage.phone}</p> : null}
                    
                </div>
                <button 
                className={styles.nextBtn} 
                onClick={handleClickNext} 
                type='button' 
                role='button'
                aria-label="Proceed to Confirm and Reserve"
                >
                    Next</button>
                </>
               }
            {step === 3 && 
               <>
               <div className={styles.confirmDetails}>
                    <h2>Booking Summary</h2>
                    <div className={styles.lineBreak}>{/*Line Break*/}</div>
                    <div>
                        <CalendarMonthIcon />
                        <p>{formData.selectedDate.format('MMMM D, YYYY')}</p>
                    </div>
                    <div>
                        <AccessTimeIcon />
                        <p>{formData['time']}</p>
                    </div>
                    <div>
                        <GroupsIcon />
                        <p>{formData.people}</p>
                    </div>
                    <div>
                        <CakeIcon />
                        <p>{formData.occasion}</p>
                    </div>
                    <div>
                        <DeckIcon />
                        <p>{formData.seatingArea}</p>
                    </div>
                    <div className={styles.lineBreak}>{/*Line Break*/}</div>
                    <div>
                        <p>Name:</p>
                        <p>{`${formData.firstName} ${formData.lastName}`}</p>
                    </div>
                    <div>
                        <p>Email:</p>
                        <p>{formData.email}</p>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <p>{formData.phone}</p>
                    </div>
               </div>
               <div className={styles.buttons}>
                <button type="submit" value="Make Your Reservation" className={styles.reservationBtn} aria-label="Submit reservation">Make Your Reservation</button>
               </div>
               </>
               }
        </form>
    </div>
    </>
  )
}

export default BookingForm
