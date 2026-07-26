const express = require("express");
const router = express.Router();
const { forgotPass } = require("../controllers/PasswordController");
const Authenticate = require("../middlewares/Authentication");

router.post("/forgotPassword", forgotPass );
router.post("/resetPassword", resetPassword );

module.exports = router;