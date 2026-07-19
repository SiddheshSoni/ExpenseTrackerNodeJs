const { fn, col } = require("sequelize");
const { Users } = require("../models");
const Expense = require("../models/Expenses");

const checkPremium = async(req, res) =>{
    try {
        const user = await req.user;
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({
            message:"failed",
            error:error
        })
    }
};

const getLeaderboard = async (req, res) =>{
    try {
        const leaderboard = await Users.findAll({
            attributes: [
                "id",
                "username",
                [
                    fn("COALESCE", fn("SUM", col("Expenses.amount")), 0),
                    "totalExpense"
                ]
            ],
            include: [{
                model: Expense,
                attributes: []
            }],
            group: ["Users.id"],
            order: [[fn("SUM", col("Expenses.amount")), "DESC"]]
        });

        res.status(200).json(leaderboard);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

module.exports = {
    checkPremium,
    getLeaderboard,
};