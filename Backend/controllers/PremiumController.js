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
                "totalExpense"
            ],
            order:[[col("totalExpense"), "DESC"]]
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