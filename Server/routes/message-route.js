var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var MessageRepo = require('../repositiories/message-repo.js');
var BookingRepo = require('../repositiories/booking-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var MessageValidator = require('../validators/message-validator.js');
var { nanoid } = require('nanoid');
var MessageController = require('../controllers/message-controller.js');

var messageRepo = new MessageRepo(db);
var bookingRepo = new BookingRepo(db);
var userRepo = new UserRepo(db);
var messageValidator = new MessageValidator(
    clientErrors,
    messageRepo,
    bookingRepo,
    userRepo
);
var messageController = new MessageController(
    messageRepo,
    clientErrors,
    messageValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [messageController.createMessage, errorHandler]);
router.patch('/:messageID', [cookieJwtAuth], [messageController.patchMessage, errorHandler]);
router.delete('/:messageID', [messageController.deleteMessage, errorHandler]);
router.get('', [messageController.getMessages, errorHandler]);
router.get('/booking/:bookingID', [messageController.getBookingMessagesByKeyword, messageController.getBookingMessages, errorHandler]);
router.get('/:messageID', [messageController.getMessage, errorHandler]);

module.exports = router;