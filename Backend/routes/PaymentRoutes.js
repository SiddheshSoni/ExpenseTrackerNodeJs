const express = require('express');
const { processPayments, getPaymentStatus } = require('../controllers/paymentController');
const router = express.Router();


// router.get('/', getPayment);
router.post('/', processPayments);
router.get('/payment-status/:orderId', getPaymentStatus);

module.exports= router;
