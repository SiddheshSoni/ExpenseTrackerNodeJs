const express = require("express");
const { addExpense, getExpense, deleteExpense } = require("../controllers/ExpenseController");
const router = express.Router();


router.post("/", addExpense);
router.get("/", getExpense);
router.delete("/:id", deleteExpense);

module.exports = router;