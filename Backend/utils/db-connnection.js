const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('expenseappdb', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect:'mysql',
  logging: false,
});

(async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connection has been established!");
    }catch(err){
        console.log('Unable to connect to Database!', err);
    }
})();

module.exports = sequelize;