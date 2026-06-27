const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('expenseappdb', 'root', 'Sid2444', {
  host: 'localhost',
  dialect:'mysql'
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