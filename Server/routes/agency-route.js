var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var AgencyRepo = require('../repositiories/agency-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var AgencyValidator = require('../validators/agency-validator.js');
var { nanoid } = require('nanoid');
var AgencyController = require('../controllers/agency-controller.js');

var agencyRepo = new AgencyRepo(db);
var providerRepo = new ProviderRepo(db);
var agencyValidator = new AgencyValidator(
    clientErrors,
    agencyRepo,
    providerRepo
);
var agencyController = new AgencyController(
    agencyRepo,
    clientErrors,
    agencyValidator,
    nanoid
);

var errorHandler = require('../middlewares/error-handler.js');

router.post('', [agencyController.createAgency, errorHandler]);
router.patch('/:agencyID', [agencyController.patchAgency, errorHandler]);
router.delete('/:agencyID', [agencyController.deleteAgency, errorHandler]);
router.get('/:agencyID', [agencyController.getAgencyByID, errorHandler]);
router.get('', [agencyController.getAllAgency, errorHandler]);
router.get('/:agencyID/providers', [agencyController.getAgencyProviders, errorHandler]);
router.get('/;agencyID/service-types', [agencyController.getAgencyServiceTypes, errorHandler]);
router.patch('/:agencyID/providers', [agencyController.addProviderToAgency, errorHandler]);
router.patch('/providers/:providerID', [agencyController.removeProviderFromAgency, errorHandler]);
router.get('/:agencyID/search-name', [agencyController.searchProviderInAgency, errorHandler]);

module.exports = router;