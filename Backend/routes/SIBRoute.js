const express = require("express");
const router = express.Router();
const { forgotPass } = require("../controllers/SIBController");

router.post("/", forgotPass );

module.exports = router;