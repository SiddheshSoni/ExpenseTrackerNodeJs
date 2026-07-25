import React, { useRef, useState } from 'react';
import "../CSS/Signup.css";
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router';


const ForgotPassword = () => {
  
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();
  
  const emailRef = useRef(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();

    setMessage('');
    setError('');

    if (!email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
        const result = await fetch("http://localhost:3000/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await result.json();

        if (result.ok) {
            setMessage(data.message || "Success!");
            e.target.reset();
            // navigate("/");
        } else {
            setError(data.message || "Something went wrong.");
        }
    } catch (err) {
        setError(err.message || "Unable to connect to the server.");
    }
  };

  return (
    <div className='Signup-container'>
      <div className='Signup-card'>
        <h2 className='Signup-title'>Please enter your email!</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <FormControl type='email' name='email' ref={emailRef} />
          </FormGroup>
          <FormGroup className='mb-2 mt-4'>
            <Button className='w-100' type='submit'>Receive Email</Button>
          </FormGroup>
          {message && <p className='form-success'>{message}</p>}
          {error && <p className='form-error'>{error}</p>}

        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;