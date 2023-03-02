var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var ServiceController = require('../controllers/service-controller.js');

var serviceRepo = new ServiceRepo(db);
var serviceController = new ServiceController(
    serviceRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], serviceController.createService);
router.patch('/:serviceID', [cookieJwtAuth], serviceController.patchService);
router.delete('/:serviceID', [cookieJwtAuth], serviceController.deleteService);
router.get('', serviceController.getAllServices);
router.get('/provider/:providerID', [serviceController.getProviderServiceByKeyword, serviceController.getProviderServicesSorted, serviceController.getProviderServices]);
router.get('/:serviceID', serviceController.getService);

module.exports = router;