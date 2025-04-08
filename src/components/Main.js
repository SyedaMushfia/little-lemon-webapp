import React from 'react'
import { Routes, Route } from 'react-router';
import Homepage from './homepage/Homepage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import BookingsPage from './pages/bookingPage/BookingsPage';
import OrderOnline from './pages/OrderOnline';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
import dayjs from 'dayjs';

function Main() {
  const [availableTimes, setAvailableTimes] = useState(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
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

  const handleInputChange = (e) => {
    const {id , value } = e.target;
    setFormData(prev => (
        {...prev, [id]: value}
    ))
    console.log(formData);
  }

  const handleDateChange = (newDate) => {
    setFormData(prev => ({...prev, selectedDate: newDate}));
  };

  const clearFormDetails = () => {
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    })
  }

  return (
    <main>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/bookings" element={<BookingsPage availableTimes={availableTimes} formData={formData} onDateChange={handleDateChange} onInputChange={handleInputChange} onClearForm={clearFormDetails}/>} />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  </main>
  )
}

export default Main
