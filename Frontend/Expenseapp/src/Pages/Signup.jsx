import React, { useRef, useState } from 'react';
import "../CSS/Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { login } from '../Store/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);

  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    
    const username = isSignUp ? userRef.current?.value.trim(): "Guest";
    const email = emailRef.current?.value.trim();
    const password = passRef.current?.value;

    setMessage('');
    setError('');

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const userCred = {
      email,
      password,
    };

    if(isSignUp){
      userCred.username = username;
    }

    try {
      const response = await fetch(`http://localhost:3000/${isSignUp?"SignUp":"Login"}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCred),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'success!');
        localStorage.setItem("token", data.token);
        dispatch(login());
        navigate('/home');
        e.target.reset();
      } else {
        setError(data.message || 'Error!.');
      }
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  return (
    <div className='Signup-container'>
      <div className='Signup-card'>
        <h2 className='Signup-title'>{isSignUp ? "Create Account": "Login"}</h2>
        <Form onSubmit={submitHandler}>
          {isSignUp && 
            <FormGroup className='mb-2'>
              <FormLabel htmlFor='username'>Username:</FormLabel>
              <FormControl type='text' name='username' ref={userRef} defaultValue={"Guest"} />
            </FormGroup>
          }
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <FormControl type='email' name='email' ref={emailRef} />
          </FormGroup>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='password'>Password:</FormLabel>
            <FormControl type='password' name='password' ref={passRef} />
          </FormGroup>
          <FormGroup className='mb-2 mt-4'>
            <Button className='w-100' type='submit'>{isSignUp? "Sign Up" : "Login"}</Button>
          </FormGroup>
          {message && <p className='form-success'>{message}</p>}
          {error && <p className='form-error'>{error}</p>}

          <p onClick={()=> setIsSignUp(prev => !prev)} className='w-100 text-center mt-4 mb-0 bg-body-tertiary'>
            {isSignUp ? "Already Have an Account?" : "Create an Account"}
            <span className='text-primary' >{isSignUp? "Login" : "Sign Up"}</span>
          </p>

        </Form>
      </div>
    </div>
  );
};

export default Signup