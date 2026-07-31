const express = require('express');
const app = express();
const db = require("./utils/db-connnection");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
const ExpenseRoute = require('./routes/ExpenseRoute');
const PaymentRoute = require("./routes/PaymentRoutes");
const PremiumRoute = require("./routes/PremiumRoute");
const PasswordRoute = require("./routes/PasswordRoute");
const ReportRoute = require("./routes/ReportRoute");
var cors = require("cors");

app.use(express.json());
app.use(cors());


app.use("/Signup", SignupRoute);
app.use("/Login", LoginRoute);
app.use("/Expense", ExpenseRoute);
app.use("/pay", PaymentRoute);
app.use("/premium", PremiumRoute);
app.use("/password", PasswordRoute);
app.use("/report", ReportRoute);

db.sync({alter: true}).then(()=>{
    app.listen(3000, ()=> console.log('Server Started!'));
}).catch((err)=>{
    console.log(err);
});