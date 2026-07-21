const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connnection");

const Users = sequelize.define("Users", {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Premium:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    totalExpense:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    }
});

module.exports = Users;