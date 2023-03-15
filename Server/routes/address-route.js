var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var AddressRepo = require('../repositiories/address-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var AddressValidator = require('../validators/address-validator.js');
var { nanoid } = require('nanoid');
var AddressController = require('../controllers/address-controller.js');

var addressRepo = new AddressRepo(db);
var userRepo = new UserRepo(db);
var addressValidator = new AddressValidator(
    clientErrors,
    addressRepo,
    userRepo
);
var addressController = new AddressController(
    addressRepo,
    clientErrors,
    addressValidator,
    nanoid
);
var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [addressController.createAddress, errorHandler]);
router.patch('/:addressID', [cookieJwtAuth], [addressController.patchAddress, errorHandler]);
router.delete('/:addressID', [cookieJwtAuth], [addressController.deleteAddress, errorHandler]);
router.get('', [addressController.getAllAddress, errorHandler]);
router.get('/user/:userID', [addressController.getAllAddressOfUser, errorHandler]);
router.get('/:addressID', [addressController.getAddressByID, errorHandler])
router.get('/default/seekers', [addressController.getAllDefaultSeekerAddress, errorHandler]);
router.get('/default/providers', [addressController.getAllDefaultProviderAddress, errorHandler]);

module.exports = router;