var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var AddressRepo = require('../repositiories/address-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var axios = require('axios');
var AddressController = require('../controllers/address-controller.js');

var addressRepo = new AddressRepo(db);
var addressController = new AddressController(
    addressRepo,
    clientErrors,
    serverErrors,
    null,
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

module.exports = router;