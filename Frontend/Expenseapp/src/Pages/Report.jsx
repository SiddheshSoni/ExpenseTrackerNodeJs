import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import "../CSS/report.css";

const Report = () => {
    const [expense, setExpense] = useState([]);
    const [view, setView] = useState("daily");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [rows, setRows] = useState(localStorage.getItem("rows") || 10);

    const downloadReport = () => {

        const headers = [
            "Date",
            "Description",
            "Category",
            "Income",
            "Expense"
        ];

        const rows = filteredExpenses.map(item => [
            item.date,
            item.description,
            item.category,
            item.type === "income" ? "": "",
            item.amount
        ]);

        const csv = [
            headers,
            ...rows
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csv], {
            type: "text/csv"
        });

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = `${view}-report.csv`;

        a.click();

        window.URL.revokeObjectURL(url);
    };

    useEffect(()=>{
        getPaginatedExpenses(page);
    }, [page, rows]);
    
    const getPaginatedExpenses = async(page)=>{
        
        try{
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:3000/report?page=${page}&limit=${rows}`, {
                method:"GET",
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':token
                },
            });
            
            if(!res.ok){
                throw new Error("Failed fetching data!");
            }

            const data = await res.json();   
            setExpense(data.paginatedExpenses);

            setPagination(data);

        }catch(error){
            console.log(error.message);
        }
    };

    const filteredExpenses = expense?.filter(item => {
        const expenseDate = new Date(item.createdAt);
        const today = new Date();

        if (view === "daily") {
            return expenseDate.toDateString() === today.toDateString();
        }

        if (view === "monthly") {
            return (
                expenseDate.getMonth() === today.getMonth() &&
                expenseDate.getFullYear() === today.getFullYear()
            );
        }

        return true;
    });
    console.log("expense:", expense.length);
console.log("filtered:", filteredExpenses.length);
    const totalExpense = filteredExpenses?.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const rowHandler = (e) => {
        console.log(e.target.value);
        localStorage.setItem("rows", e.target.value);
        setRows(e.target.value);
    };
    console.log(expense)
  return (
    <>  
        <div className='d-flex justify-content-center align-content-center'>
            <h1>Day to Day Expense</h1>
        </div>
        <div className='d-flex justify-content-between m-2'>            
            <div className="d-flex gap-2 mb-3">
                <Button
                    variant={view === "daily" ? "primary" : "outline-primary"}
                    onClick={() => setView("daily")}
                >
                    Daily
                </Button>

                <Button
                    variant={view === "weekly" ? "primary" : "outline-primary"}
                    onClick={() => setView("weekly")}
                >
                    Weekly
                </Button>

                <Button
                    variant={view === "monthly" ? "primary" : "outline-primary"}
                    onClick={() => setView("monthly")}
                >
                    Monthly
                </Button>
            </div>
            <div>
                <Button 
                    id='download-btn'
                    onClick={downloadReport}
                >
                    Download Report
                </Button>
            </div>
        </div>
        <div className='d-flex'> 
            <label htmlFor='rows'>Select No. of Rows</label>
            <select onChange={rowHandler}  name='rows'>
                <option value="5" >5</option>
                <option value="10" >10</option>
                <option value="25" >25</option>
                <option value="50" >50</option>
            </select>
        </div>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Income</th>
                        <th>Expense</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredExpenses?.map((item) => (
                        <tr key={item.id}>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>

                            <td className="text-success">
                                {/* {item.type === "income"
                                    ? `₹${item.amount}`
                                    : "-"} */}
                            </td>

                            <td className="text-danger">
                                {item.amount}                                  
                            </td>
                        </tr>
                    ))}
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={3}><strong>Total</strong></td>
                        <td>₹0</td>
                        <td>₹{totalExpense}</td>
                    </tr>

                    <tr>
                        <td colSpan={4}><strong>Savings</strong></td>
                        <td>₹{totalExpense}</td>
                    </tr>
                </tfoot>
            </Table>
        <div id='pagination-btns'>

            {pagination.hasPreviousPage && (<Button> {"<<"} </Button>)}
            {pagination.hasPreviousPage && (
                <Button onClick={()=> setPage(pagination.previousPage)}>
                    {pagination.previousPage}
                </Button>
            )}
            <Button id='currBtn' >{pagination.currentPage}</Button>
            {pagination.hasNextPage && (
                <Button  onClick={()=> setPage(pagination.nextPage)}>
                    {pagination.nextPage}
                </Button>
            )}
            {pagination.hasNextPage && (
                <Button>
                    {">>"}
                </Button>
            )}
        
        </div>
    </>
  )
}

export default Report;