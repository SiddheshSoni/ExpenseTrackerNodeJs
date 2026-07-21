const {Expenses, Users} = require('../models/index');

const addExpense = async (req, res) =>{
    try {
        const { amount, description, category } = req.body;
                console.log("req user id POST REQ", req.user.id);
        const expense = await Expenses.create({
            amount, 
            description,
            category,
            UserId:req.user.id
        });

        const user = await Users.findByPk(req.user.id);

        await Users.update(
            {
                totalExpense:Number(user.totalExpense)+Number(amount),
            },
            {
                where:{
                    id:req.user.id,
                }
            }
        );
        // res.status(201).send("Added expense Successfully!");
        res.status(201).json(expense);

    } catch (error) {
        res.status(500).send("Failed adding expense! Error:" + error.message);
    }
};

const getExpense = async(req, res) =>{
    try {
        console.log("req user id", req.user.id);
        const allExpense = await Expenses.findAll({
            where: {
                userId:req.user.id
            }
        });
        
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
        const expense = await Expenses.findByPk(id);
        

        const deleted = await Expenses.destroy({
            where:{
                id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        const user = await Users.findByPk(req.user.id);

        await Users.update(
            {
                totalExpense:Number(user.totalExpense)-Number(expense.amount),
            },
            {
                where:{
                    id:req.user.id,
                }
            }
        );
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