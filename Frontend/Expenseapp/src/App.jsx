import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import "./App.css";
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import { useDispatch, useSelector } from "react-redux";


const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome</h1>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="home" element={<HomePage />} />
      <Route path="*" element={<h1>{isLoggedIn ? `You need to Signup/Login to Continue! ${<Link to={"/signup"} >Signup</Link>}` : "404: Page Not Found!" }</h1>} />
    </Routes>
  )
}

export default App


{/* <Route path="/login" element={<Login />} /> */}