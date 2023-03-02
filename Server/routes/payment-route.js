var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var PaymentRepo = require('../repositiories/payment-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var PaymentController = require('../controllers/payment-controller.js');

var paymentRepo = new PaymentRepo(db);
var paymentController = new PaymentController(
    paymentRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

router.post('', paymentController.createPayment);
router.patch('/:paymentID', paymentController.patchPayment);
router.delete('/:paymentID', paymentController.deletePayment);
router.get('', paymentController.getAllPayments);
router.get('/status', paymentController.getAllPaymentsByStatus);
router.get('/seeker/:seekerID', [paymentController.getSeekerPaymentsByStatus, paymentController.getSeekerPayments]);
router.get('/provider/:providerID', [paymentController.getProviderPaymentsByStatus, paymentController.getProviderPayments]);
router.get('/method', paymentController.getPaymentByMethod);
router.get('/:paymentID', paymentController.getPaymentByID)

module.exports = router;