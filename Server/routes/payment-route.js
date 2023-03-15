var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var PaymentRepo = require('../repositiories/payment-repo.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var PaymentValidator = require('../validators/payment-validator.js');
var { nanoid } = require('nanoid');
var PaymentController = require('../controllers/payment-controller.js');

var paymentRepo = new PaymentRepo(db);
var seekerRepo = new SeekerRepo(db);
var providerRepo = new ProviderRepo(db);
var serviceRepo = new ServiceRepo(db);
var paymentValidator = new PaymentValidator(
    clientErrors,
    paymentRepo,
    seekerRepo,
    providerRepo,
    serviceRepo
);
var paymentController = new PaymentController(
    paymentRepo,
    clientErrors,
    paymentValidator,
    nanoid
);

const errorHandler = require('../middlewares/error-handler.js');

router.post('', [paymentController.createPayment, errorHandler]);
router.patch('/:paymentID', [paymentController.patchPayment, errorHandler]);
router.delete('/:paymentID', [paymentController.deletePayment, errorHandler]);
router.get('', [paymentController.getAllPayments, errorHandler]);
router.get('/status', [paymentController.getAllPaymentsByStatus, errorHandler]);
router.get('/seeker/:seekerID', [paymentController.getSeekerPaymentsByStatus, paymentController.getSeekerPayments, errorHandler]);
router.get('/provider/:providerID', [paymentController.getProviderPaymentsByStatus, paymentController.getProviderPayments, errorHandler]);
router.get('/method', [paymentController.getPaymentByMethod, errorHandler]);
router.get('/:paymentID', [paymentController.getPaymentByID, errorHandler])

module.exports = router;