var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceSpecRepo = require('../repositiories/service-specs-repo.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var ServiceTypeRepo = require('../repositiories/service-type-repo.js');
var AddressRepo = require('../repositiories/address-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var ServiceSpecsValidator = require('../validators/service-specs-validator.js');
var { nanoid } = require('nanoid');
var ServiceSpecsController = require('../controllers/service-specs-controller.js');

var serviceSpecRepo = new ServiceSpecRepo(db);
var seekerRepo = new SeekerRepo(db);
var serviceTypeRepo = new ServiceTypeRepo(db);
var addressRepo = new AddressRepo(db);
var serviceSpecsValidator = new ServiceSpecsValidator(
    clientErrors,
    serviceSpecRepo,
    seekerRepo,
    serviceTypeRepo,
    addressRepo
);

var serviceSpecsController = new ServiceSpecsController(
    serviceSpecRepo,
    clientErrors,
    serviceSpecsValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [serviceSpecsController.createServiceSpecs, errorHandler]);
router.patch('/:specsID', [cookieJwtAuth], [serviceSpecsController.patchServiceSpecs, errorHandler]);
router.delete('/:specsID', [cookieJwtAuth], [serviceSpecsController.deleteServiceSpecs, errorHandler]);
router.get('', [serviceSpecsController.getAllServiceSpecs, errorHandler]);
router.get('/seeker/:seekerID', [serviceSpecsController.getSortedSeekerSpecs, serviceSpecsController.getSeekerSpecs, errorHandler]);
router.get('/seeker/:seekerID/type/:typeID', [serviceSpecsController.getSeekerSpecsByType, errorHandler]);
router.get('/seeker/:seekerID/status/:statusID', [serviceSpecsController.getSeekerSpecsByStatus, errorHandler]);
router.get('/type/:typeID', [serviceSpecsController.getSpecsByType, errorHandler]);
router.get('/status/:statusID', [serviceSpecsController.getSpecsByStatus, errorHandler]);
router.get('/:specsID', [serviceSpecsController.getSpecsByID, errorHandler]);

module.exports = router;