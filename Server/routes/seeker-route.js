var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var CredentialsRepo = require('../repositiories/credentials-repo.js');
var UserRepo = require('../repositiories/user-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SeekerController = require('../controllers/seeker-controller.js');

var seekerRepo = new SeekerRepo(db);
var credentialsRepo = new CredentialsRepo(db);
var userRepo = new UserRepo(db);
var seekerController = new SeekerController(
    seekerRepo,
    credentialsRepo,
    userRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid,
    bcrypt,
    jwt
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', seekerController.createSeeker);
router.patch('/:seekerID', [cookieJwtAuth], seekerController.patchSeeker);
router.delete('/:seekerID', [cookieJwtAuth],seekerController.deleteSeeker);
router.get('', seekerController.getSeekers);
router.get('/:seekerID', [cookieJwtAuth], seekerController.getSeeker);

module.exports = router;