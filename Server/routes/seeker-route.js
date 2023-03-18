var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var SeekerValidator = require('../validators/seeker-validator.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SeekerController = require('../controllers/seeker-controller.js');

var seekerRepo = new SeekerRepo(db);
var credentialsRepo = new CredentialsRepo(db);
var userRepo = new UserRepo(db);
var seekerValidator = new SeekerValidator(
    clientErrors, 
    seekerRepo, 
    credentialsRepo
);

var seekerController = new SeekerController(
    seekerRepo,
    credentialsRepo,
    userRepo,
    clientErrors,
    seekerValidator,
    nanoid,
    bcrypt,
    jwt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [seekerController.createSeeker, errorHandler]);
router.post('/mail', [seekerController.checkSeekerMail, errorHandler]);
router.patch('/:seekerID', [cookieJwtAuth], [seekerController.patchSeeker, errorHandler]);
router.delete('/:seekerID', [cookieJwtAuth],[seekerController.deleteSeeker, errorHandler]);
router.get('', [seekerController.getSeekers, errorHandler]);
router.get('/:seekerID', [cookieJwtAuth], [seekerController.getSeeker, errorHandler]);

module.exports = router;