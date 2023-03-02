var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var ProviderController = require('../controllers/provider-controller.js');

var providerRepo = new ProviderRepo(db);
var credentialsRepo = new CredentialsRepo(db);
var userRepo = new UserRepo(db);
var providerController = new ProviderController(
    providerRepo,
    credentialsRepo,
    userRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid,
    bcrypt,
    jwt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', providerController.createProvider);
router.patch('/:providerID', [cookieJwtAuth], providerController.patchProvider);
router.delete('/:providerID', [cookieJwtAuth], providerController.deleteProvider);
router.get('', providerController.getProviders);
router.get('/:providerID', [cookieJwtAuth], providerController.getProvider);

module.exports = router;