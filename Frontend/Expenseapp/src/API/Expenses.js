const addExpense = async(newExpense)=>{
    try{
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/Expense", {
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                'Authorization':token
            },
            body:JSON.stringify(newExpense)
        });

        if (!res.ok) {
            throw new Error("Failed to add expense");
        }

        return await res.json();
    }catch(error){
        console.log(error.message);
    }
}
const getPaginatedExpense = async({page, rows}) => {
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

        return await res.json();   
        
        // setExpense(data.paginatedExpenses);

        // setPagination(data);

    }catch(error){
        console.log(error.message);
    }
};

const deleteExpense = async(id) =>{
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
                throw new Error("Failed deleting expense!");
            }
            
            return await res.json();
        } catch (error) {
            console.log(error.message);
        }
}

export  {
    getPaginatedExpense,
    deleteExpense,
    addExpense,
};