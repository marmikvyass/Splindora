import React from 'react'
import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import Budget from './pages/Budget'

function App() {

  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/budget/:tripId' element={<Budget/>}/>
      </Routes>
    </>
  )
}

export default App
