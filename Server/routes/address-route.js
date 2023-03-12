var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var AddressRepo = require('../repositiories/address-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var AddressValidator = require('../validators/address-validator.js');
var { nanoid } = require('nanoid');
var axios = require('axios');
var AddressController = require('../controllers/address-controller.js');

var addressRepo = new AddressRepo(db);
var userRepo = new UserRepo(db);
var addressValidator = new AddressValidator(clientErrors);
var addressController = new AddressController(
    addressRepo,
    userRepo,
    clientErrors,
    serverErrors,
    addressValidator,
    nanoid,
    axios
);
var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], addressController.createAddress);
router.patch('/:addressID', [cookieJwtAuth], addressController.patchAddress);
router.delete('/:addressID', [cookieJwtAuth], addressController.deleteAddress);
router.get('', addressController.getAllAddress);
router.get('/user/:userID', addressController.getAllAddressOfUser);
router.get('/:addressID', addressController.getAddressByID)
router.get('/default/seekers', addressController.getAllDefaultSeekerAddress);
router.get('/default/providers', addressController.getAllDefaultProviderAddress);

module.exports = router;