import React, { useEffect, useRef, useState } from 'react'
import {Alert, Button, Col, Form, FormControl, FormGroup, FormLabel, FormSelect, Row, Table } from "react-bootstrap";
import Checkout from './cashfree';
import Leaderboard from './LeaderBoard';
import { getPaginatedExpense, deleteExpense, addExpense } from '../API/Expenses';
import { checkPremium } from '../API/Premium';
import "../CSS/Homepage.css";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/authSlice';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [alert, setAlert] = useState({
        show:false,
        message:"",
    });
    const catergories = ["Food", "Entertainment", "Travel", "Shopping", "Bills"];
    const [expense, setExpense] = useState([]);
    const amountRef = useRef();
    const descRef = useRef("");
    const catRef = useRef("");
    const noteRef = useRef("");
    const [isPremium, setIsPremium] = useState(false);
    const [rows, setRows] = useState(localStorage.getItem("rows") || 10);
    const rowHandler = (e) => {
        localStorage.setItem("rows", e.target.value);
        setRows(e.target.value);
    };
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

    useEffect(()=>{
        const fetchPremium = async () => {
            const premium = await checkPremium();
            setIsPremium(premium);
        };
        fetchPremium();
    },[]);

    useEffect(()=>{
        getPaginatedExp();
    }, [page, rows]);

    const getPaginatedExp = async() => {
        try {
            const res = await getPaginatedExpense({page, rows});
            setExpense(res.paginatedExpenses);
            setPagination(res);
        } catch (error) {
            console.log(error.message);
        }
    }

    const submitHandler= async (e) =>{
        try{
            e.preventDefault();
            
            const newExpense = {
                amount: amountRef.current.value, 
                description: descRef.current.value,
                category: catRef.current.value,
                note: noteRef.current.value || "",
            }
            const res = await addExpense(newExpense);
            
            await getPaginatedExp();
            setLeaderboardRefresh(prev => prev + 1);
            alert("Added the expense successfully!");
            e.target.reset();
        }catch(error){
            console.log(error.message);
            alert("Failed to Add the expense!");
        }
    };

    const deleteExp = async (id) =>{
        try {
            const res = await deleteExpense(id);
            
            setExpense(prev => prev.filter(exp=> exp.id !== id));
            alert("Deleted expense!");
            await getPaginatedExp();
            setLeaderboardRefresh(prev => prev + 1);
        } catch (error) {
            console.log(error.message);
        }
    }

    const getLeaderboardHandler = () =>{
        if(!isPremium){
            setAlert({
                show:true,
                message:"You are not a Premium User!"
            })
            return;
        }
        setShowLeaderboard(prev => !prev);
    }
  return (
    <>
        <div className="floating-logout-btn">
            <Button className='floating-logout-btn' 
                onClick={()=>{
                    dispatch(logout());
                    navigate('/signup');
                }}>
                Logout
            </Button>
        </div>
        {alert.show && <Alert>{alert.message}</Alert>}
        { !isPremium && <div><Checkout /></div> }
        <div id='main-container'>
            <div className='form-container'>
                <Form as={Row} onSubmit={submitHandler}>                   
                    <FormGroup as={Col}>
                        <FormLabel htmlFor='amount' >Amount:</FormLabel>
                        <FormControl type='number' name='amount' ref={amountRef}/>
                    </FormGroup>                        
                    <FormGroup as={Col}>
                        <FormLabel htmlFor='description' >Description:</FormLabel>
                        <FormControl type='text' name='description' ref={descRef}/>
                    </FormGroup>                    
                    <FormGroup as={Col}>
                        <FormLabel htmlFor='category' >Category:</FormLabel>
                        <FormSelect name='category' ref={catRef}>
                            <option value="">Auto Detect</option>
                            {
                                catergories.map((cat)=>(
                                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                ))
                            }
                        </FormSelect>
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel htmlFor='note' >Note:</FormLabel>
                        <FormControl type='text' name='note' ref={noteRef}/>
                    </FormGroup>
                    <Button variant='info' className='mt-2 ' type='submit'>Add</Button>
                </Form>
            </div>
        </div>
        <div >
            <div className='d-flex mb-2'>
                <label htmlFor='rows' className=' fw-bold me-1'>Select No. of Rows</label>
                <select className='' onChange={rowHandler} value={rows}  name='rows'>
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="25" >25</option>
                    <option value="50" >50</option>
                </select>
            </div>
            <div>
                <Table className='expense-container'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Expense</th>
                            <th>Note</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                            expense.map(item =>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.note}</td>
                                    <td><button className='delete-btn' onClick={()=>deleteExp(item.id)} >❌</button></td>
                                </tr>
                            ))
                            }

                    </tbody>
                </Table>
            </div>
            <div id='pagination-btns'>            
                {pagination.hasPreviousPage && (<Button variant='info' onClick={()=> setPage(0)} > {"<<"} </Button>)}
                {pagination.hasPreviousPage && (
                    <Button variant='info' onClick={()=> setPage(pagination.previousPage)}>
                        {pagination.previousPage}
                    </Button>
                )}
                <Button variant='info' id='currBtn' >{pagination.currentPage}</Button>
                {pagination.hasNextPage && (
                    <Button variant='info' onClick={()=> setPage(pagination.nextPage)}>
                        {pagination.nextPage}
                    </Button>
                )}
                {pagination.hasNextPage && (
                    <Button variant='info' onClick={()=> setPage(pagination.totalPages)} >
                        {">>"}
                    </Button>
                )}                   
            </div>
        </div>
        <div className='d-flex justify-content-center mt-4 gap-3'>
            <Button variant='success' onClick={()=>getLeaderboardHandler()}>{showLeaderboard === true ?"Close Leaderboard": "Get Leaderboard"}</Button> 
            <Button variant='info' onClick={()=> navigate('/Report')}>Generate Report </Button>  
        </div>
        {showLeaderboard && <Leaderboard refresh={leaderboardRefresh} />}
    </>
  )
}

export default HomePage