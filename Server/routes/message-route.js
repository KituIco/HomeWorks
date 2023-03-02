var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var MessageRepo = require('../repositiories/message-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var MessageController = require('../controllers/message-controller.js');

var messageRepo = new MessageRepo(db);
var messageController = new MessageController(
    messageRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], messageController.createMessage);
router.patch('/:messageID', [cookieJwtAuth], messageController.patchMessage);
router.delete('/:messageID', messageController.deleteMessage);
router.get('', messageController.getMessages);
router.get('/booking/:bookingID', [messageController.getBookingMessagesByKeyword, messageController.getBookingMessages]);
router.get('/:messageID', messageController.getMessage);

module.exports = router;