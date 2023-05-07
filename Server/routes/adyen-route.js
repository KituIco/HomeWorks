var express = require('express');
var router = express.Router();

var checkout = require('../utils/adyen.js');
var { nanoid } = require('nanoid');
var PaymentTransactionRepo = require('../repositiories/payment-transactions-repo.js');
var AdyenValidator = require('../validators/adyen-validator.js');
var AdyenController = require('../controllers/adyen-controller.js');
var clientErrors = require('../error/client-error-handler.js');

var paymentTransactionRepo = new PaymentTransactionRepo();
var adyenConroller = new AdyenController(
    checkout,
    clientErrors,
    null,
    paymentTransactionRepo,
    nanoid
);

var errorHandler = require('../middlewares/error-handler.js');

router.get('/payment-methods', [adyenConroller.getPaymentMethods, errorHandler]);
router.post('/payments', [adyenConroller.makePayment, errorHandler]);

module.exports = router;