import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Vehicles from './pages/Vehicles'
import Dashboard from './pages/Dashboard'
import VehicleDetails from './pages/VehicleDetails'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
