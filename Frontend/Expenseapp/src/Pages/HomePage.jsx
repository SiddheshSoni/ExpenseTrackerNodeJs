import React, { useEffect, useRef, useState } from 'react'
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";

const HomePage = () => {
    const catergories = ["Food", "Entertainment", "Travel", "Shopping", "Bills"];
    const [expense, setExpense] = useState([]);
    const amountRef = useRef();
    const descRef = useRef("");
    const catRef = useRef("");

    const submitHandler= async (e) =>{
        try{
            e.preventDefault();
            const amount = amountRef.current.value;
            const description = descRef.current.value;
            const category = catRef.current.value;
            // console.log(amount, description, category);

            const res = await fetch("http://localhost:3000/Expense", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({
                    amount, 
                    description,
                    category,
                })
            });

            if (!res.ok) {
                throw new Error("Failed to add expense");
            }

            const newExpense = await res.json();
            setExpense(prev => [...prev, newExpense]);
            alert("Added the expense successfully!");

            e.target.reset();
        }catch(error){
            console.log(error.message);
            alert("Failed to Add the expense!");
        }
    };

    useEffect(()=>{
        const getExpenses = async()=>{
            try{
                const res = await fetch("http://localhost:3000/Expense", {
                    method:"GET",
                    headers:{
                        'Content-Type':"application/json",
                    }
                });
                
                if(!res.ok){
                    throw new Error("Failed fetching data!");
                }

                const data = await res.json();   
                setExpense(data);
            }catch(error){
                console.log(error.message);
            }
        }
        getExpenses();
    },[]);

    const deleteExp = async (id) =>{
        try {
            const res = await fetch(`http://localhost:3000/expense/${id}`,{
                method:"DELETE",
                
            });

            if(!res.ok){
                throw new Error("Failed fetching data!");
            }
            setExpense((prev) =>( prev.filter((exp)=> exp.id !== id)));
            alert("Deleted expense!");
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <>
        <div className='form-container'>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel htmlFor='amount' >Amount:</FormLabel>
                    <FormControl type='number' name='amount' ref={amountRef}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor='description' >Description:</FormLabel>
                    <FormControl type='text' name='description' ref={descRef}/>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor='category' >Category:</FormLabel>
                    <FormSelect name='category' ref={catRef}>
                        {
                            catergories.map((cat)=>(
                                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                            ))
                        }
                    </FormSelect>
                </FormGroup>
                <Button type='submit'>Add</Button>
            </Form>
        </div>

        <div className='expense-container'>
            {
                expense.map((item)=>(
                    <li key={item.id}>amount:{item.amount}, desc:{item.description}, category:{item.category} <button onClick={()=>deleteExp(item.id)} >delete</button></li>
                ))
            }
        </div>
    </>
  )
}

export default HomePage