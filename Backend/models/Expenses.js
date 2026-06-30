const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../utils/db-connnection");

const Expense = sequelize.define("Expense", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    amount:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

module.exports = Expense;