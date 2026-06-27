const express = require("express");
const router = express.Router();
const SignupController = require("../controllers/SignupController");

// router.get("/", SignupController);
router.post("/", SignupController.addUser );

module.exports = router;