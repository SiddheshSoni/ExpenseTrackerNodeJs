import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome</h1>} />
      <Route path="home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App