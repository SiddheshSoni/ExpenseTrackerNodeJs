const express = require('express');
const app = express();
const morgan = require("morgan");
const fs = require('fs');
const db = require("./utils/db-connnection");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
const ExpenseRoute = require('./routes/ExpenseRoute');
const PaymentRoute = require("./routes/PaymentRoutes");
const PremiumRoute = require("./routes/PremiumRoute");
const PasswordRoute = require("./routes/PasswordRoute");
const ReportRoute = require("./routes/ReportRoute");
var cors = require("cors");
const path = require('path');

app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan( "combined", { stream: accessLogStream }));

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