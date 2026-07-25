const {Expenses, Users} = require('../models/index');
const { suggestCategory } = require('../services/genAI');
const sequelize = require('../utils/db-connnection');

const addExpense = async (req, res) =>{
    
    const transaction = await sequelize.transaction();

    try {

        let { amount, description, category } = req.body;
        
        // console.log("req user id POST REQ", req.user.id);

        if(!category || category === ""){
            const suggestedCategory = await suggestCategory(description);
            // console.log("suggested" + suggestedCategory);
            category = suggestedCategory;
        }

        const expense = await Expenses.create({
            amount, 
            description,
            category,
            UserId:req.user.id
        }, {transaction: transaction});

        const user = await Users.findByPk(req.user.id);

        await Users.update(
            {
                totalExpense:Number(user.totalExpense)+Number(amount),
            },
            {
                where:{
                    id:req.user.id,
                },
                transaction,
            }
        );
        // res.status(201).send("Added expense Successfully!");
        await transaction.commit();
        res.status(201).json(expense);

    } catch (error) {
        await transaction.rollback();
        res.status(500).send("Failed adding expense! Error:" + error.message);
    }
};

const getExpense = async(req, res) =>{
    try {
        // console.log("req user id", req.user.id);
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
    
    const transaction = await sequelize.transaction();

    try {
        const {id} = req.params;
        const expense = await Expenses.findOne({
            where:{
                id,
                UserId:req.user.id,
            },
            transaction,
        })
        
        if (!expense) {
            await transaction.rollback();
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        const deleted = await Expenses.destroy({
            where:{
                id,
                UserId:req.user.id,
            },
            transaction
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
                },
                transaction,
            }
        );
        await transaction.commit();
        return res.status(200).json({
            message:"deleted expense successfully!"
        });
    } catch (error) {
        await transaction.rollback();
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