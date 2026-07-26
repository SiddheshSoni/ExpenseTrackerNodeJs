const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connnection");

const ForgotPasswordRequest = sequelize.define("ForgotPasswordRequest", {
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
    }
});

module.exports = ForgotPasswordRequest;