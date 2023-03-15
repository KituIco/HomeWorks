var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var TransactionReportsRepo = require('../repositiories/transaction-reports-repo.js');
var BookingRepo = require('../repositiories/booking-repo.js');
var PaymentRepo = require('../repositiories/payment-repo.js');
var ServiceSpecsRepo = require('../repositiories/service-specs-repo.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var TransactionReportsValidator = require('../validators/transaction-reports-validator.js');
var { nanoid } = require('nanoid');
var TransactionReportsController = require('../controllers/transaction-reports-controller.js');

var transactionReportsRepo = new TransactionReportsRepo(db);
var bookingRepo = new BookingRepo(db);
var paymentRepo = new PaymentRepo(db);
var specsRepo = new ServiceSpecsRepo(db);
var seekerRepo = new SeekerRepo(db);
var providerRepo = new ProviderRepo(db);
var serviceRepo = new ServiceRepo(db);
var transactionReportsValidator = new TransactionReportsValidator(
    clientErrors,
    transactionReportsRepo,
    bookingRepo,
    paymentRepo,
    specsRepo,
    seekerRepo,
    providerRepo,
    serviceRepo
);
var transactionReportsController = new TransactionReportsController(
    transactionReportsRepo,
    clientErrors,
    transactionReportsValidator,
    nanoid
);

var errorHandler = require('../middlewares/error-handler.js');

router.post('', [transactionReportsController.createTransactionReport, errorHandler]);
router.patch('/:reportID', [transactionReportsController.patchTransactionReport, errorHandler]);
router.delete('/:reportID', [transactionReportsController.deleteTransactionReport, errorHandler]);
router.get('', [transactionReportsController.getTransactionReportsByKeywords, transactionReportsController.getTransactionReports, errorHandler]);
router.get('/seeker/:seekerID', [transactionReportsController.getTransactionReportsBySeekerID, errorHandler]);
router.get('/provider/:providerID', [transactionReportsController.getTransactionReportsByProviderID, errorHandler]);
router.get('/service/:serviceID', [transactionReportsController.getTransactionReportsByServiceID, errorHandler]);
router.get('/status/:statusID', [transactionReportsController.getTransactionReportsByStatusCode, errorHandler]);
router.get('/:reportID', [transactionReportsController.getTransactionReportByID, errorHandler]);

module.exports = router;