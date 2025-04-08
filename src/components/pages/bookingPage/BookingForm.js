import React from 'react';
import styles from '../bookingPage/bookingForm.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { validateEmail, validatePhone } from '../../../utils';

function BookingForm({availableTimes, formData, onDateChange, onInputChange, onClearForm}) {
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

  
  const handleClickReserve = () => setStep(1);
  const handleClickNext = () => setStep(2);
  const handleClickContact = () => setStep(2);
  const handleClickSummary = () => setStep(3);
    
  const handleBlur = (e) => {
    const {name} = e.target;

    setTouched(prev => ({...prev, [name]: true}));
  }

  const getIsFormValid = () => {
    return (
      formData.firstName?.trim() && 
      formData.lastName?.trim() && 
      formData.email?.trim() &&
      formData.phone?.trim()
    ); 
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true
      });
    
    if (!getIsFormValid()) return;

    alert('Your table is booked!');
    console.log(formData);
    setStep(3);
    onClearForm();

    setTouched({
        firstName: false,
        lastName: false,
        email: false,
        phone: false
      });
  }

  return (
    <>
    <div className={styles.container}>
        <div className={styles.formSteps}>
            <div className={styles.formStepsBtns}>
                <div>1</div>
                <button type='button' onClick={handleClickReserve}>RESERVE</button></div>
            <div className={styles.formStepsBtns}>
                <div>2</div>
                <button type='button' onClick={handleClickContact}>CONTACT</button></div>
            <div className={styles.formStepsBtns}>
                <div>3</div>
                <button type='button' onClick={handleClickSummary}>SUMMARY</button></div>
        </div>
        <form onSubmit={handleSubmit}>
            {step === 1 && <>
                <div className={styles.form}>
                <div className={styles.calendar}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar 
                        value={formData.selectedDate}
                        onChange={onDateChange}/>
                    </LocalizationProvider>
                </div>
                <div className={styles.formFieldsContainer}>
                        <div>
                            <label htmlFor="time">Time</label>
                            <select id="time" value={formData['time']} onChange={onInputChange}>
                                {availableTimes.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="people">People</label>
                            <select id="people" value={formData.people} onChange={onInputChange}>
                                {dropdownOptions.people.map(number => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="occasion">Occasion</label>
                            <select id="occasion" value={formData.occasion} onChange={onInputChange}>
                                {dropdownOptions.occasion.map(event => (
                                    <option key={event} value={event}>{event}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        <div>
                            <label htmlFor="seatingArea">Seating Area</label>
                            <select id="seatingArea" value={formData.seatingArea} onChange={onInputChange}>
                                {dropdownOptions.seatingArea.map(area => (
                                    <option key={area} value={area}>{area}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                </div>
            </div>
            <button className={styles.nextBtn} onClick={handleClickNext} type='button'>Next</button>
            </>}
            {step === 2 && 
                <>
                <div className={styles.contactDetails}>
                    <div>
                        <label htmlFor='firstName'>First Name<span>*</span></label>
                        <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={onInputChange} onBlur={handleBlur} className={`${touched.firstName && formData.firstName.length < 2 ? styles.errorInput : ''}`}/>
                    </div>
                    {touched.firstName && formData.firstName.length < 2 ? <p className={styles.errorMessage}>{showErrorMessage.firstName}</p> : null}

                    <div>
                        <label htmlFor='lastName'>Last Name<span>*</span></label>
                        <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={onInputChange} onBlur={handleBlur} className={`${touched.lastName && formData.lastName.length < 2 ? styles.errorInput : ''}`}/>
                    </div>
                    {touched.lastName && formData.lastName.length < 2 ? <p className={styles.errorMessage}>{showErrorMessage.lastName}</p> : null}

                    <div>
                        <label htmlFor='email'>Email<span>*</span></label>
                        <input type='email' id='email' name='email' value={formData.email} onChange={onInputChange} onBlur={handleBlur} className={`${touched.email && !validateEmail(formData.email) ? styles.errorInput : ''}`}/>
                    </div>
                    {touched.email && !validateEmail(formData.email) ? <p className={styles.errorMessage}>{showErrorMessage.email}</p> : null}

                    <div>
                        <label htmlFor='phone'>Phone<span>*</span></label>
                        <input type='tel' id='phone' name='phone' value={formData.phone} onChange={onInputChange} onBlur={handleBlur} className={`${touched.phone && !validatePhone(formData.phone) ? styles.errorInput : ''}`}/>
                    </div>
                    {touched.phone && !validatePhone(formData.phone) ? <p className={styles.errorMessage}>{showErrorMessage.phone}</p> : null}
                    
                </div>
                <div className={styles.buttons}>
                    <button type="submit" value="Make Your Reservation" className={styles.reservationBtn}>Make Your Reservation</button>
                </div>
                </>
               }
        </form>
    </div>
    </>
  )
}

export default BookingForm
