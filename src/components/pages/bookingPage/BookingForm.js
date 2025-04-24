import React from 'react';
import styles from '../bookingPage/bookingForm.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import CakeIcon from '@mui/icons-material/Cake';
import DeckIcon from '@mui/icons-material/Deck';

function BookingForm({availableTimes, formData, errors, onInputBlur, onTimeFocus, onDateChange, onInputChange, onSubmitForm}) {

  const [step, setStep] = useState(1);

  const stepButtons = [
    {
        step: 1,
        name: 'RESERVE',
        ariaLabel: 'Step 1: Reserve',
        handleClick: () => setStep(1)
    },
    {
        step: 2,
        name: 'CONTACT',
        ariaLabel: 'Step 2: Contact',
        handleClick: () => setStep(2)
    }, 
    {
        step: 3,
        name: 'CONFIRM',
        ariaLabel: 'Step 3: Confirm',
        handleClick: () => setStep(3)
    }
  ]

  const selectFields = [
    {
        nameOfInput: 'Time',
        id: 'time',
        placeholder: '17:00',
        error: 'time-error',
        ariaLabel: 'Select reservation time',
        options: availableTimes
    },
    {
        nameOfInput: 'People',
        id: 'people',
        placeholder: '1 person',
        error: 'people-error',
        ariaLabel: 'Select number of people',
        options: ['1 person', '2 people', '3 people', '4 people', '5 people']
    },
    {
        nameOfInput: 'Occasion',
        id: 'occasion',
        placeholder: 'Birthday',
        error: 'occasion-error',
        ariaLabel: 'Select occasion',
        options: ['Birthday', 'Anniversary']
    },
    {
        nameOfInput: 'Seating Area',
        id: 'seatingArea',
        placeholder: 'Indoor',
        error: 'seating-area-error',
        ariaLabel: 'Select seating area',
        options: ['Indoor', 'Outdoor']
    }
]

const inputFields = [
    {
        nameOfInput: 'First Name',
        id: 'firstName',
        type: 'text',
        minLength: 2,
        ariaLabel: 'First Name',
        ariaDescribedBy: 'first-name-error',
    },
    {
        nameOfInput: 'Last Name',
        id: 'lastName',
        type: 'text',
        minLength: 2,
        ariaLabel: 'Last Name',
        ariaDescribedBy: 'last-name-error',
    },
    {
        nameOfInput: 'Email',
        id: 'email',
        type: 'email',
        ariaLabel: 'Email',
        ariaDescribedBy: 'email-error',
    },
    {
        nameOfInput: 'Phone',
        id: 'phone',
        type: 'tel',
        ariaLabel: 'Phone',
        ariaDescribedBy: 'phone-error',
    }
]

const isStepOneValid = formData.selectedDate &&
selectFields.every(field => formData[field.id] && !errors[field.id]);

const isStepTwoValid = inputFields.every(field => formData[field.id] && !errors[field.id]);

const isNextDisabled = (step === 1 && !isStepOneValid) || (step === 2 && !isStepTwoValid);

  
  const handleClickNext = () => {
      setStep(prev => prev + 1);
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitForm(formData);
    console.log(formData);
  }
  
  return (
    <>
    <div className={styles.container}>
        <div className={styles.formSteps}>
            {stepButtons.map(button => (
                <div key={button.name} className={`${styles.formStepsBtns} ${step === button.step ? styles.activeStep : ''}`}>
                    <div>{button.step}</div>
                    <button 
                        type='button' 
                        role='button' 
                        onClick={button.handleClick} 
                        aria-label={button.ariaLabel}>
                            {button.name}
                            </button>
                </div>    
            ))}
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
                        disablePast
                        />
                    </LocalizationProvider>
                    {errors.selectedDate && (
                                <p className={styles.dateError} id="date-error" aria-live="assertive">{errors.selectedDate}</p>
                )}
                </div>
                <div className={styles.formFieldsContainer}>
                    {selectFields.map(select => (
                        <React.Fragment key={select.nameOfInput}>
                            <div key={select.nameOfInput}>
                            <label htmlFor={select.id}>{select.nameOfInput}</label>
                            <select
                                id={select.id}
                                name={select.id}
                                value={formData[select.id]}
                                aria-label={select.ariaLabel}
                                required
                                aria-required="true"
                                onBlur={onInputBlur}
                                onChange={onInputChange}
                                onFocus={select.id === 'time' ? onTimeFocus : null}
                                className={`${errors[select.id] ? styles.errorInput : ''}`}
                            >
                                <option key={select.placeholder} value='' disabled hidden>{select.placeholder}</option>
                                {select.options?.map((option, i) => (
                                        <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ArrowDropDownIcon className={styles.dropdownIcon}/>
                        </div>
                        {errors[select.id] && <p className={styles.errorMessage} id={select.error} aria-live="assertive">{errors[select.id]}</p>}
                      </React.Fragment>
                    ))}
                </div>
            </div>
            <button 
                className={`${styles.nextBtn} ${isNextDisabled ? styles.disabledBtn : ''}`} 
                onClick={handleClickNext} 
                type='button' 
                role='button'
                aria-label="Proceed to Contact Information"
                disabled={isNextDisabled}
                >
                    Next</button>
            </>}
            {step === 2 && 
                <>
                <div className={styles.contactDetails}>
                    {inputFields.map(field => (
                        <React.Fragment key={field.nameOfInput}>
                            <div key={field.nameOfInput}>
                                <label htmlFor={field.id}>{field.nameOfInput}<span>*</span></label>
                                <input 
                                    type={field.type}
                                    id={field.id}
                                    name={field.id}
                                    required
                                    minLength={field.minLength}
                                    value={formData[field.id]}
                                    onChange={onInputChange}
                                    onBlur={onInputBlur}
                                    aria-required='true'
                                    aria-label={field.ariaLabel}
                                    aria-describedby={field.ariaDescribedBy}
                                    aria-invalid={`${errors[field.id] ? 'true' : 'false'}`}
                                    className={`${errors[field.id] ? styles.errorInput : ''}`} 

                                />
                            </div>
                            {errors[field.id] && <p id={field.ariaDescribedBy} aria-live="assertive" className={styles.errorMessage}>{errors[field.id]}</p>}

                        </React.Fragment>
                    ))}
                </div>
                <button 
                className={`${styles.nextBtn} ${isNextDisabled ? styles.disabledBtn : ''}`} 
                onClick={handleClickNext} 
                type='button' 
                role='button'
                aria-label="Proceed to Confirm and Reserve"
                disabled={isNextDisabled}
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
                        <p>{formData.selectedDate?.format('MMMM D, YYYY')}</p>
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
