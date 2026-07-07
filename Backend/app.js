const express = require('express');
const app = express();
const db = require("./utils/db-connnection");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
const ExpenseRoute = require('./routes/ExpenseRoute');
const PaymentRoute = require("./routes/PaymentRoutes");
var cors = require("cors");

app.use(express.json());
app.use(cors());


app.use("/Signup", SignupRoute);
app.use("/Login", LoginRoute);
app.use("/Expense", ExpenseRoute);
app.use("/pay", PaymentRoute);


db.sync({sync:true}).then(()=>{
    app.listen(3000, ()=> console.log('Server Started!'));
}).catch((err)=>{
    console.log(err);
});