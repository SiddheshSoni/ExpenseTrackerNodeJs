import React, { useRef, useState } from 'react';
import "../CSS/Signup.css";

import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Signup = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const username = userRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passRef.current?.value;

    setMessage('');
    setError('');

    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.text();

      if (response.ok) {
        setMessage(data || 'Signed up successfully!');
        e.target.reset();
      } else {
        setError(data || 'Failed to create account.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server. Make sure your backend is running.');
    }
  };

  return (
    <div className='Signup-container'>
      <div className='Signup-card'>
        <h2 className='Signup-title'>Create Account</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='username'>Username:</FormLabel>
            <FormControl type='text' name='username' ref={userRef} />
          </FormGroup>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <FormControl type='email' name='email' ref={emailRef} />
          </FormGroup>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='password'>Password:</FormLabel>
            <FormControl type='password' name='password' ref={passRef} />
          </FormGroup>
          <FormGroup className='mb-2 mt-4'>
            <Button className='w-100' type='submit'>Sign up</Button>
          </FormGroup>
          {message && <p className='form-success'>{message}</p>}
          {error && <p className='form-error'>{error}</p>}
          
          <p onClick={()=> navigate("/Login")} className='w-100 text-center mt-4 mb-0 bg-body-tertiary'>Already Have an Account? <span className='text-primary' >Login</span> </p>

        </Form>
      </div>
    </div>
  );
};

export default Signup