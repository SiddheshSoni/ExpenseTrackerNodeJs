const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');
const Authenticate = require('../middlewares/Authentication');

router.get("/:page", Authenticate, ReportController);

module.exports = router;
