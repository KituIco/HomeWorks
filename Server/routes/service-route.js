var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var ServiceTypeRepo = require('../repositiories/service-type-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var ServiceValidator = require('../validators/service-validator.js');
var { nanoid } = require('nanoid');
var ServiceController = require('../controllers/service-controller.js');

var serviceRepo = new ServiceRepo(db);
var providerRepo = new ProviderRepo(db);
var serviceTypeRepo = new ServiceTypeRepo(db);
var serviceValidator = new ServiceValidator(
    clientErrors, 
    serviceRepo, 
    providerRepo, 
    serviceTypeRepo
);

var serviceController = new ServiceController(
    serviceRepo,
    clientErrors,
    serviceValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [serviceController.createService, errorHandler]);
router.patch('/:serviceID', [cookieJwtAuth], [serviceController.patchService, errorHandler]);
router.delete('/:serviceID', [cookieJwtAuth], [serviceController.deleteService, errorHandler]);
router.get('', [serviceController.getAllServices, errorHandler]);
router.get('/provider/:providerID', [serviceController.getProviderServiceByKeyword, serviceController.getProviderServicesSorted, serviceController.getProviderServices, errorHandler]);
router.get('/recommended', [serviceController.getServiceRecommendations, errorHandler]);
router.get('/:serviceID', [serviceController.getService, errorHandler]);

module.exports = router;