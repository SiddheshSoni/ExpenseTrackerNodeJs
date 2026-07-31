const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');
const Authenticate = require('../middlewares/Authentication');

router.get("/", Authenticate, ReportController);

module.exports = router;
