const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../utils/db-connnection");

const Payment = sequelize.define('Payment',{
    orderId:{
      type:DataTypes.STRING,
      primaryKey:true,
      allowNull:false,  
    },
    paymentSessionId:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    orderCurrency:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    paymentStatus:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    customerId:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Payment;