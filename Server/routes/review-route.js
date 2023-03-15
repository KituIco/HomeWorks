var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ReviewRepo = require('../repositiories/review-repo.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var ReviewValidator = require('../validators/review-validator.js');
var { nanoid } = require('nanoid');
var ReviewController = require('../controllers/review-controller.js');

var reviewRepo = new ReviewRepo(db);
var serviceRepo = new ServiceRepo(db);
var seekerRepo = new SeekerRepo(db);
var reviewValidator = new ReviewValidator(
    clientErrors,
    reviewRepo,
    serviceRepo,
    seekerRepo
);
var reviewController = new ReviewController(
    reviewRepo,
    clientErrors,
    reviewValidator,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');
var errorHandler = require('../middlewares/error-handler.js');

router.post('', [cookieJwtAuth], [reviewController.createReview, errorHandler]);
router.patch('/:reviewID', [cookieJwtAuth], [reviewController.patchReview, errorHandler]);
router.delete('/:reviewID', [cookieJwtAuth], [reviewController.deleteReview, errorHandler]);
router.get('', [reviewController.getAllReviews, errorHandler]);
router.get('/service/:serviceID', [reviewController.getServiceReviews, errorHandler]);
router.get('/:reviewID', [reviewController.getReview, errorHandler]);

module.exports = router;