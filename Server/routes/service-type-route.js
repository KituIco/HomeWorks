var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceTypeRepo = require('../repositiories/service-type-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var ServiceTypeValidator = require('../validators/service-type-validator.js');
var { nanoid } = require('nanoid');
var ServiceTypeController = require('../controllers/service-type-controller.js');

var serviceTypeRepo = new ServiceTypeRepo(db);
var serviceTypeValidator = new ServiceTypeValidator(
    clientErrors,
    serviceTypeRepo
);
var serviceTypeController = new ServiceTypeController(
    serviceTypeRepo,
    clientErrors,
    serviceTypeValidator,
    nanoid
);

var errorHandler = require('../middlewares/error-handler.js');

router.post('', [serviceTypeController.createServiceType, errorHandler]);
router.patch('/:typeID', [serviceTypeController.patchServiceType, errorHandler]);
router.delete('/:typeID', [serviceTypeController.deleteServiceType, errorHandler]);
router.get('', [serviceTypeController.getServiceTypes, errorHandler]);
router.get('/:typeID', [serviceTypeController.getServiceTypeByID, errorHandler]);

module.exports = router;