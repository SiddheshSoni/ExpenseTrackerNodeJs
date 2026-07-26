import React, { useRef, useState } from 'react';
import "../CSS/Signup.css";
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';


const ResetPassword = () => {

  const navigate = useNavigate();
  const { uuid } = useParams();
  const passwordRef = useRef(null);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPassword = passwordRef.current?.value;

    setMessage('');
    setError('');

    if (!newPassword) {
      setError('Please fill password.');
      return;
    }

    try {
        const result = await fetch(`http://localhost:3000/password/updatepassword/${uuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                newPassword,
            }),
        });

        const data = await result.json();

        if (result.ok) {
            setMessage(data.message || "Success!");
            passwordRef.current.value = "";
            
            setTimeout(() => {
                navigate("/Signup");
            }, 1500);
        } else {
            console.log(data);
            setError(data.error || "Something went wrong.");
        }
    } catch (err) {
        setError(err.message || "Unable to connect to the server.");
    }
  };

  return (
    <div className='Signup-container'>
      <div className='Signup-card'>
        <h2 className='Signup-title'>Please enter new password!</h2>
        <Form onSubmit={submitHandler}>
          <FormGroup className='mb-2'>
            <FormLabel htmlFor='password'>New Password:</FormLabel>
            <FormControl type='password' name='password' ref={passwordRef} />
          </FormGroup>
          <FormGroup className='mb-2 mt-4'>
            <Button className='w-100' type='submit'>Reset Password</Button>
          </FormGroup>
          {message && <p className='form-success'>{message}</p>}
          {error && <p className='form-error'>{error}</p>}

        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;