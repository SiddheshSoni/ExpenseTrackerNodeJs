import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import "../CSS/report.css";
import { getPaginatedExpense } from '../API/Expenses';

const Report = () => {
    const [expense, setExpense] = useState([]);
    const [view, setView] = useState("monthly");
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
        getPaginatedExp();
    }, [page, rows]);
    
    const getPaginatedExp = async() =>{
        try {
            const res = await getPaginatedExpense({page, rows});

            setExpense(res.paginatedExpenses);
            setPagination(res);
        } catch (error) {
             console.log(error.message);
        }
    }

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
    
    const totalExpense = filteredExpenses?.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    const rowHandler = (e) => {
        localStorage.setItem("rows", e.target.value);
        setRows(e.target.value);
    };
  return (
    <>  
        <div className='d-flex justify-content-center align-content-center'>
            <h1>Day to Day Expense</h1>
        </div>
        <div className='d-flex justify-content-between m-2'>            
            <div className="d-flex gap-2 mb-3">
                <Button
                    variant={view === "daily" ? "info" : "outline-info"}
                    onClick={() => setView("daily")}
                >
                    Daily
                </Button>

                <Button
                    variant={view === "weekly" ? "info" : "outline-info"}
                    onClick={() => setView("weekly")}
                >
                    Weekly
                </Button>

                <Button
                    variant={view === "monthly" ? "info" : "outline-info"}
                    onClick={() => setView("monthly")}
                >
                    Monthly
                </Button>
            </div>
            <div>
                <Button 
                    id='download-btn'
                    onClick={downloadReport}
                    variant='info'
                >
                    Download Report
                </Button>
            </div>
        </div>
        <div className='d-flex'> 
            <label htmlFor='rows'>Select No. of Rows</label>
            <select onChange={rowHandler} value={rows} name='rows'>
                <option value="5" >5</option>
                <option value="10" >10</option>
                <option value="25" >25</option>
                <option value="50" >50</option>
            </select>
        </div>
            <Table className='leaderboard-tb'>
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

                            <td className="">
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
    </>
  )
}

export default Report;