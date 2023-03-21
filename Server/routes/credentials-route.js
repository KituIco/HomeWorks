var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var CredentialsValidator = require('../validators/credentials-validator.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var CredentialsController = require('../controllers/credentials-controller.js');

var credentialsRepo = new CredentialsRepo(db);
var userRepo = new UserRepo(db);
var credentialsValidator = new CredentialsValidator(
    clientErrors,
    credentialsRepo
);

var credentialsController = new CredentialsController(
    credentialsRepo,
    userRepo,
    clientErrors,
    credentialsValidator,
    nanoid,
    jwt,
    bcrypt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [credentialsController.createCredentials, errorHandler]);
router.post('/login', [credentialsController.login, errorHandler]);
router.post('/identifier', [credentialsController.validateIdentifier, errorHandler]);
router.delete('/logout', [cookieJwtAuth], [credentialsController.logout, errorHandler]);
router.patch('/user/:userID/email', [cookieJwtAuth], [credentialsController.patchEmail, errorHandler]);
router.patch('/user/:userID/phone-number', [cookieJwtAuth], [credentialsController.patchPhoneNumber, errorHandler]);
router.patch('/user/:userID/password', [cookieJwtAuth], [credentialsController.patchPassword, errorHandler]);
router.get('/user/:userID', [credentialsController.getUserCredentials, errorHandler]);

module.exports = router;