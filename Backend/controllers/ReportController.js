const Expense = require("../models/Expenses");

const Report = async(req, res) =>{
    console.log("Report Controller")
    try {
        const page = parseInt(req.params.page) || 1;
        console.log(page);

        const limit = 10;
        const offset = (page-1) * limit;
        
        const{ count, rows: paginatedExpenses } = await Expense.findAndCountAll({
            where:{
                userId:req.user.id
            },
            limit,
            offset,
        });

        return res.status(200).json({
            paginatedExpenses,
            currentPage:page,    
            totalPages: Math.ceil(count/limit),
            hasNextPage: page < Math.ceil(count/limit),
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page -1,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = Report;

