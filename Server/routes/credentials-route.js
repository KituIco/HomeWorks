var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var CredentialsController = require('../controllers/credentials-controller.js');

var credentialsRepo = new CredentialsRepo(db);
var credentialsController = new CredentialsController(
    credentialsRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid,
    bcrypt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('/login', credentialsController.login);
router.delete('/logout', [cookieJwtAuth], credentialsController.logout);
router.patch('/user/:userID/email', [cookieJwtAuth], credentialsController.patchEmail);
router.patch('/user/:userID/phone-number', [cookieJwtAuth], credentialsController.patchPhoneNumber);
router.patch('/user/:userID/password', [cookieJwtAuth], credentialsController.patchPassword);

module.exports = router;