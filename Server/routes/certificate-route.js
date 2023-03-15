var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CertificateRepo = require('../repositiories/certificate-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var CertificateValidator = require('../validators/certificate-validator.js');
var clientErrors = require('../error/client-error-handler.js');
var { nanoid } = require('nanoid');
var CertificateController = require('../controllers/certificate-controller.js');

var certificateRepo = new CertificateRepo(db);
var providerRepo = new ProviderRepo(db);
var certificateValidator = new CertificateValidator(
    clientErrors,
    certificateRepo,
    providerRepo
);
var certificateController = new CertificateController(
    certificateRepo,
    clientErrors,
    certificateValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [certificateController.createCertificate, errorHandler]);
router.patch('/:certificateID', [cookieJwtAuth], [certificateController.patchCertificate, errorHandler]);
router.delete('/:certificateID', [certificateController.deleteCertificate, errorHandler]);
router.get('', [certificateController.getCertificates, errorHandler]);
router.get('/provider/:providerID', [certificateController.getProviderCertificates, errorHandler]);
router.get('/:certificateID', [certificateController.getCertificateByID, errorHandler]);

module.exports = router;