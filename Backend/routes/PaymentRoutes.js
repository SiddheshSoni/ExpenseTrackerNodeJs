const express = require('express');
const { processPayments, getPaymentStatus } = require('../controllers/paymentController');
const Authenticate = require('../middlewares/Authentication');
const router = express.Router();


router.post('/', Authenticate, processPayments);
router.get('/payment-status/:orderId', getPaymentStatus);

module.exports= router;
