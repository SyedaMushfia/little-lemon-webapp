import React, { useReducer } from 'react'
import { Routes, Route, useNavigate } from 'react-router';
import Homepage from './homepage/Homepage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import BookingsPage from './pages/bookingPage/BookingsPage';
import OrderOnline from './pages/OrderOnline';
import LoginPage from './pages/LoginPage';
import ConfirmedBooking from './pages/bookingPage/ConfirmedBooking';
import { useState } from 'react';
import { fetchAPI, submitAPI, validateEmail, validatePhone } from '../utils';

// This is also used for unit testing
export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES')
    return fetchAPI(new Date(action.payload));
  return state;
}

export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
}

function Main() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedDate: null,
    time: '',
    people: '',
    occasion: '',
    seatingArea: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
      selectedDate: '',
      time: '',
      people: '',
      occasion: '',
      seatingArea: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
  })

  const [state, dispatch] = useReducer(updateTimes, [], initializeTimes);
  console.log(state);


  const handleInputChange = (e) => {
    const {id , value } = e.target;
    setFormData(prev => (
        {...prev, [id]: value}
    ))

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: ''
    }));
    console.log(formData);
  }

  const handleTimeFocus = (e) => {
    if (!formData.selectedDate) {
      setErrors((prev) => ({
        ...prev,
        selectedDate: 'Please select a reservation date'
      }));
    }
  };

  const handleBlur = (e) => {
    const {name, value} = e.target;

    if (!value) {
        switch (name) {
            case 'selectedDate':
              setErrors(prevErrors => ({
                  ...prevErrors,
                  time: 'Please select a reservation date'
              }));
            break;
            case 'time':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    time: 'Please select a reservation time'
                }));
            break;
            case 'people':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    people: 'Please select the no. of people'
                }));
            break;
            case 'occasion':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    occasion: 'Please select an occasion'
                }));
            break;
            case 'seatingArea':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    seatingArea: 'Please select a seating area'
                }));
            break;
            case 'firstName':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    firstName: !value.trim() && value.length < 2 ? 'First name should be at least 2 characters' : ''
                }));
            break;
            case 'lastName':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    lastName: !value.trim() && value.length < 2 ? 'Last name should be at least 2 characters' : ''
                }));
            break;
            case 'email':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    email: !value.trim() && !validateEmail(value) ? 'Enter a valid email address' : ''
                }));
            break;
            case 'phone':
                setErrors(prevErrors => ({
                    ...prevErrors,
                    phone: !value.trim() && !validatePhone(value) ? 'Enter a valid phone number' : ''
                }));
            break;
            default:
                break;
    } 
   } else {
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
   }
  }

  const handleDateChange = (newDate) => {
      setFormData(prev => ({...prev, selectedDate: newDate}));
      dispatch({ type: 'UPDATE_TIMES', payload: newDate });
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedDate: ''
      }));
  };

  const clearFormDetails = () => {
    setFormData({
        selectedDate: null, 
        time: '',
        people: '',
        occasion: '',
        seatingArea: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })
  }

  const submitForm = (formData) => {
    const response = submitAPI(formData);

    if (response) {
      localStorage.setItem('confirmedBooking', JSON.stringify(formData));
      clearFormDetails();
      navigate('./booking-confirmed');
    }
    else alert('Something went wrong! Please try again.')
  }

  return (
    <main>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/bookings" element={<BookingsPage availableTimes={state} formData={formData} errors={errors} onTimeFocus={handleTimeFocus} onInputBlur={handleBlur} onDateChange={handleDateChange} onInputChange={handleInputChange} onClearForm={clearFormDetails} onSubmitForm={submitForm}/>}/>
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/booking-confirmed' element={<ConfirmedBooking />}/>
    </Routes>
  </main>
  )
}

export default Main
