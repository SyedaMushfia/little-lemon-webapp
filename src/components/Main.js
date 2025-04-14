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
import dayjs from 'dayjs';
import { fetchAPI, submitAPI } from '../utils';

// This is for unit testing
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
    selectedDate: dayjs(),
    time: '17:00',
    people: '1 person',
    occasion: 'Birthday',
    seatingArea: 'Indoor',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const updateTimes = (state, action) => {
    if (action.type === 'UPDATE_TIMES')
      return fetchAPI(new Date(action.payload));
    return state;
  }
  
  const initializeTimes = () => {
    const today = new Date();
    return fetchAPI(today);
  }

  const [state, dispatch] = useReducer(updateTimes, [], initializeTimes);
  console.log(state);


  const handleInputChange = (e) => {
    const {id , value } = e.target;
    setFormData(prev => (
        {...prev, [id]: value}
    ))
    console.log(formData);
  }

  const handleDateChange = (newDate) => {
    setFormData(prev => ({...prev, selectedDate: newDate}));
    dispatch({ type: 'UPDATE_TIMES', payload: newDate });
  };

  const clearFormDetails = () => {
    setFormData({
        selectedDate: dayjs(), 
        time: '17:00',
        people: '1 person',
        occasion: 'Birthday',
        seatingArea: 'Indoor',
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
        <Route path="/bookings" element={<BookingsPage availableTimes={state} formData={formData} onDateChange={handleDateChange} onInputChange={handleInputChange} onClearForm={clearFormDetails} onSubmitForm={submitForm}/>}/>
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/booking-confirmed' element={<ConfirmedBooking />}/>
    </Routes>
  </main>
  )
}

export default Main
