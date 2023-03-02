var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var TransactionReportsRepo = require('../repositiories/transaction-reports-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var TransactionReportsController = require('../controllers/transaction-reports-controller.js');

var transactionReportsRepo = new TransactionReportsRepo(db);
var transactionReportsController = new TransactionReportsController(
    transactionReportsRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

router.post('', transactionReportsController.createTransactionReport);
router.patch('/:reportID', transactionReportsController.patchTransactionReport);
router.delete('/:reportID', transactionReportsController.deleteTransactionReport);
router.get('', [transactionReportsController.getTransactionReportsByKeywords, transactionReportsController.getTransactionReports]);
router.get('/seeker/:seekerID', transactionReportsController.getTransactionReportsBySeekerID);
router.get('/provider/:providerID', transactionReportsController.getTransactionReportsByProviderID);
router.get('/service/:serviceID', transactionReportsController.getTransactionReportsByServiceID);
router.get('/status/:statusID', transactionReportsController.getTransactionReportsByStatusCode);
router.get('/:reportID', transactionReportsController.getTransactionReportByID);

module.exports = router;