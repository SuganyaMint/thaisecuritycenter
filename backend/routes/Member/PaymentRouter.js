const express = require('express');
const router = express.Router();

const { getPayment, Payment, PaymentCallback, checkPayment } = require('../../controllers/Member/PaymentController');

router.get('/', getPayment);
router.post('/paymentgbp', Payment);
router.post('/paymentcallback', PaymentCallback);
router.post('/checkpayment', checkPayment);

module.exports = router;

