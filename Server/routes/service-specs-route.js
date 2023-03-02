var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ServiceSpecRepo = require('../repositiories/service-specs-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var ServiceSpecsController = require('../controllers/service-specs-controller.js');

var serviceSpecRepo = new ServiceSpecRepo(db);
var serviceSpecsController = new ServiceSpecsController(
    serviceSpecRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], serviceSpecsController.createServiceSpecs);
router.patch('/:specsID', [cookieJwtAuth], serviceSpecsController.patchServiceSpecs);
router.delete('/:specsID', [cookieJwtAuth], serviceSpecsController.deleteServiceSpecs);
router.get('', serviceSpecsController.getAllServiceSpecs);
router.get('/seeker/:seekerID', [serviceSpecsController.getSortedSeekerSpecs, serviceSpecsController.getSeekerSpecs]);
router.get('/seeker/:seekerID/type/:typeID', serviceSpecsController.getSeekerSpecsByType);
router.get('/seeker/:seekerID/status/:statusID', serviceSpecsController.getSeekerSpecsByStatus);
router.get('/type/:typeID', serviceSpecsController.getSpecsByType);
router.get('/status/:statusID', serviceSpecsController.getSpecsByStatus);
router.get('/:specsID', serviceSpecsController.getSpecsByID);

module.exports = router;