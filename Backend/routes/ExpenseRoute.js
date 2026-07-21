const express = require("express");
const { addExpense, getExpense, deleteExpense } = require("../controllers/ExpenseController");
const Authenticate = require("../middlewares/Authentication");
const router = express.Router();


router.post("/",Authenticate, addExpense);
router.get("/", Authenticate ,getExpense);
router.delete("/:id",Authenticate, deleteExpense);

module.exports = router;