const Users = require("./Users");
const Expenses = require("./Expenses");
const ForgotPasswordRequest = require("./ForgotPassReq");

//Users-Expense Table Relationship
Users.hasMany(Expenses);
Expenses.belongsTo(Users);

//Users-ForgotPasswordRequest Table Relationship
Users.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(Users);

module.exports = {
    Users,
    Expenses,
}