const express = require('express');
const app = express();
const db = require("./utils/db-connnection");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
var cors = require("cors");

app.use(express.json());
app.use(cors());


app.use("/Signup", SignupRoute);
app.use("/Login", LoginRoute);


db.sync({alter:true}).then(()=>{
    app.listen(3000, ()=> console.log('Server Started!'));
}).catch((err)=>{
    console.log(err);
});