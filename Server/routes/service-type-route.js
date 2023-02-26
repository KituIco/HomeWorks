var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceTypeRepo = require('../repositiories/service-type-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var ServiceTypeController = require('../controllers/service-type-controller.js');

var serviceTypeRepo = new ServiceTypeRepo(db);
var serviceTypeController = new ServiceTypeController(
    serviceTypeRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

router.post('', serviceTypeController.createServiceType);
router.patch('/:typeID', serviceTypeController.patchServiceType);
router.delete('/:typeID', serviceTypeController.deleteServiceType);
router.get('', serviceTypeController.getServiceTypes);
router.get('/:typeID', serviceTypeController.getServiceTypeByID);

module.exports = router;