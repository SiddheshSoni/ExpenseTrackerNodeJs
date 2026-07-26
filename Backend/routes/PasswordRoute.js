const express = require("express");
const router = express.Router();
const { forgotPass, resetPassword, updatePassword } = require("../controllers/PasswordController");
const Authenticate = require("../middlewares/Authentication");

router.post("/forgotpassword", forgotPass );
router.get("/resetpassword/:uuid", resetPassword );
router.post("/updatepassword/:uuid", updatePassword );

module.exports = router;