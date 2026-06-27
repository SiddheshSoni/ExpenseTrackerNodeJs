import React, { useRef } from 'react';
import "../CSS/Signup.css";

import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const Signup = () => {
  const userRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const submitHandler= (e) =>{
    e.preventDefault();
    const username = userRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    console.log(email, password, username); 
  }

  return (
    <div className='Signup-container'>
      <div className='Signup-card'>
          <Form onSubmit={submitHandler}>
            <FormGroup className='mb-2'>
              <FormLabel htmlFor='username' >Username:</FormLabel>
              <FormControl type='text' name='username' ref={userRef}/>
            </FormGroup>
            <FormGroup className='mb-2'>
              <FormLabel htmlFor='email'  >Email:</FormLabel>
              <FormControl type='email' name='email' ref={emailRef} />
            </FormGroup>
            <FormGroup className='mb-2'>
              <FormLabel htmlFor='password' >Password:</FormLabel>
              <FormControl type='password' name='password' ref={passRef}/>
            </FormGroup>
            <FormGroup className='mb-2 mt-4'>
              <Button className=' w-100' type='submit'>Sign up</Button>
            </FormGroup>
          </Form>
      </div>
    </div>
  )
}

export default Signup