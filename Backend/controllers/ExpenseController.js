const Expense = require('../models/Expenses');

const addExpense = async (req, res) =>{
    try {
        const { amount, description, category } = req.body;

        const expense = await Expense.create({
            amount, 
            description,
            category
        });

        // res.status(201).send("Added expense Successfully!");
        res.status(201).json(expense);

    } catch (error) {
        res.status(500).send("Failed adding expense! Error:" + error.message);
    }
};

const getExpense = async(req, res) =>{
    try {
        const allExpense = await Expense.findAll();
        
        return res.status(200).json(allExpense);
    } catch (error) {
        return res.status(500).json({
            message:"Failed getting expenses! Error:",
            error:error.message,
        });
    }
};

const deleteExpense = async(req, res) => {
    try {
        const {id} = req.params;
        const deleted = await Expense.destroy({
            where:{
                id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        return res.status(200).json({
            message:"deleted expense successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            message:"Failed getting expenses! Error:",
            error:error.message,
        });
    }
}


module.exports ={
    addExpense,
    getExpense,
    deleteExpense,
}