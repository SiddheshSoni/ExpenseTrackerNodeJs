import React, { useEffect, useRef, useState } from 'react'
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import Checkout from './cashfree';
import Leaderboard from './LeaderBoard';

const HomePage = () => {
    const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);

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
            
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:3000/Expense", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':token
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
            setLeaderboardRefresh(prev => prev + 1);
            alert("Added the expense successfully!");

            e.target.reset();
        }catch(error){
            console.log(error.message);
            alert("Failed to Add the expense!");
        }
    };
    useEffect(()=>{
        const isPremium = async()=>{
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/premium",{
                    method:"GET",
                    headers:{
                        'Content-Type':"application/json",
                        'Authorization':token,
                    }
                });

                const data = await res.json();
                console.log(data);
                if(data.user.Premium){
                    alert("You are a Premium User!")
                }

            } catch (error) {
                console.log(error.message);
            }
        }
        isPremium();
    },[]);
    useEffect(()=>{
        
        const getExpenses = async()=>{
            try{
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:3000/Expense", {
                    method:"GET",
                    headers:{
                        'Content-Type':"application/json",
                        'Authorization':token
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
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/expense/${id}`,{
                method:"DELETE",
                headers:{
                        'Content-Type':"application/json",
                        'Authorization':token
                    }
            });

            if(!res.ok){
                throw new Error("Failed fetching data!");
            }
            setExpense((prev) =>( prev.filter((exp)=> exp.id !== id)));
            alert("Deleted expense!");
            setLeaderboardRefresh(prev => prev + 1);
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <>
        <div>
            <Checkout />
            {/* <Button variant="primary" id='renderBtn'>
                buy premium membership
            </Button> */}
        </div>
        <div id='cf_checkout'></div>
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

        <Leaderboard refresh={leaderboardRefresh} />
    </>
  )
}

export default HomePage