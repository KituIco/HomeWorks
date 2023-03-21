var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var ProviderValidator = require('../validators/provider-validator.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var ProviderController = require('../controllers/provider-controller.js');

var providerRepo = new ProviderRepo(db);
var credentialsRepo = new CredentialsRepo(db);
var userRepo = new UserRepo(db);
var providerValidator = new ProviderValidator(
    clientErrors, 
    credentialsRepo, 
    providerRepo
);
var providerController = new ProviderController(
    providerRepo,
    credentialsRepo,
    userRepo,
    clientErrors,
    providerValidator,
    nanoid,
    bcrypt,
    jwt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [providerController.createProvider, errorHandler]);
router.patch('/:providerID', [cookieJwtAuth], [providerController.patchProvider, errorHandler]);
router.delete('/:providerID', [cookieJwtAuth], [providerController.deleteProvider, errorHandler]);
router.get('', [providerController.getProviders, errorHandler]);
router.get('/:providerID', [cookieJwtAuth], [providerController.getProvider, errorHandler]);

module.exports = router;