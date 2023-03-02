var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var CertificateRepo = require('../repositiories/certificate-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var CertificateController = require('../controllers/certificate-controller.js');

var certificateRepo = new CertificateRepo(db);
var certificateController = new CertificateController(
    certificateRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], certificateController.createCertificate);
router.patch('/:certificateID', [cookieJwtAuth], certificateController.patchCertificate);
router.delete('/:certificateID', certificateController.deleteCertificate);
router.get('', certificateController.getCertificates);
router.get('/provider/:providerID', certificateController.getProviderCertificates);
router.get('/:certificateID', certificateController.getCertificateByID);

module.exports = router;