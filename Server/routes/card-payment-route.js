var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CardPaymentRepo = require('../repositiories/card-payment-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var CardPaymentController = require('../controllers/card-payment-controller.js');

var cardPaymentRepo = new CardPaymentRepo(db);
var cardPaymentController = new CardPaymentController(
    cardPaymentRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], cardPaymentController.createCardPayment);
router.patch('/:cardID', [cookieJwtAuth], cardPaymentController.patchCardPayment);
router.delete('/:cardID', [cookieJwtAuth], cardPaymentController.deleteCardPayment);
router.get('', cardPaymentController.getAllCardPayments);
router.get('/user/:userID', [cookieJwtAuth], cardPaymentController.getUserCardPayments);
router.get('/:cardID', [cookieJwtAuth], cardPaymentController.getCardPaymentByID);

module.exports = router;