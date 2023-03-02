var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var AgencyRepo = require('../repositiories/agency-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var AgencyController = require('../controllers/agency-controller.js');

var agencyRepo = new AgencyRepo(db);
var agencyController = new AgencyController(
    agencyRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

router.post('', agencyController.createAgency);
router.patch('/:agencyID', agencyController.patchAgency);
router.delete('/:agencyID', agencyController.deleteAgency);
router.get('/:agencyID', agencyController.getAgencyByID);
router.get('', agencyController.getAllAgency);
router.get('/:agencyID/providers', agencyController.getAgencyProviders);
router.get('/;agencyID/service-types', agencyController.getAgencyServiceTypes);
router.patch('/:agencyID/providers', agencyController.addProviderToAgency);
router.patch('/providers/:providerID', agencyController.removeProviderFromAgency);
router.get('/:agencyID/search-name', agencyController.searchProviderInAgency);

module.exports = router;