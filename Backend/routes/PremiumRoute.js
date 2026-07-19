const express = require("express");
const { checkPremium, getLeaderboard, } = require("../controllers/PremiumController");
const Authenticate = require("../middlewares/Authentication");
const router = express.Router();

router.get("/", Authenticate, checkPremium);
router.get("/leaderboard", getLeaderboard);
module.exports = router;
