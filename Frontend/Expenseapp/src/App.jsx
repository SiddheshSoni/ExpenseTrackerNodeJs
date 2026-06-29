import React from 'react'
import { Routes, Route } from 'react-router-dom'
import "./App.css";
import Signup from './Pages/Signup'
import Login from './Pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App