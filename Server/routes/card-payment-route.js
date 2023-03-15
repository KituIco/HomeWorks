var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CardPaymentRepo = require('../repositiories/card-payment-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var CardPaymentValidator = require('../validators/card-payment-validator.js');
var { nanoid } = require('nanoid');
var CardPaymentController = require('../controllers/card-payment-controller.js');

var cardPaymentRepo = new CardPaymentRepo(db);
var userRepo = new UserRepo(db);
var cardPaymentValidator = new CardPaymentValidator(
    clientErrors,
    cardPaymentRepo,
    userRepo,
);
var cardPaymentController = new CardPaymentController(
    cardPaymentRepo,
    clientErrors,
    cardPaymentValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
const errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [cardPaymentController.createCardPayment, errorHandler]);
router.patch('/:cardID', [cookieJwtAuth], [cardPaymentController.patchCardPayment, errorHandler]);
router.delete('/:cardID', [cookieJwtAuth], [cardPaymentController.deleteCardPayment, errorHandler]);
router.get('', [cardPaymentController.getAllCardPayments, errorHandler]);
router.get('/user/:userID', [cookieJwtAuth], [cardPaymentController.getUserCardPayments, errorHandler]);
router.get('/:cardID', [cookieJwtAuth], [cardPaymentController.getCardPaymentByID, errorHandler]);

module.exports = router;