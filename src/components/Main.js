import React from 'react'
import { Routes, Route } from 'react-router';
import Homepage from './homepage/Homepage';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import BookingsPage from './pages/BookingsPage';
import OrderOnline from './pages/OrderOnline';
import LoginPage from './pages/LoginPage';

function Main() {
  return (
    <main>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  </main>
  )
}

export default Main
