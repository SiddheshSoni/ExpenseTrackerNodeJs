import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';

const Report = () => {
    const [expense, setExpense] = useState([]);
    const [view, setView] = useState("daily");
    
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
    }
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


    const filteredExpenses = expense.filter(item => {
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

    const totalExpense = filteredExpenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

  return (
    <>  
        <div className='d-flex justify-content-center align-content-center'>
            <h1>Day to Day Expense</h1>
        </div>
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
                    {filteredExpenses.map((item) => (
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
                        <td>₹-</td>
                        <td>₹{totalExpense}</td>
                    </tr>

                    <tr>
                        <td colSpan={4}><strong>Savings</strong></td>
                        <td>₹{totalExpense}</td>
                    </tr>
                </tfoot>
            </Table>
        <Button
            // disabled={!isPremium}
            onClick={downloadReport}
        >
            Download Report
        </Button>
    </>
  )
}

export default Report;