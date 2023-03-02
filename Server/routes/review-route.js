var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var ReviewRepo = require('../repositiories/review-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var ReviewController = require('../controllers/review-controller.js');

var reviewRepo = new ReviewRepo(db);
var reviewController = new ReviewController(
    reviewRepo,
    clientErrors,
    serverErrors,
    null,
    nanoid
);

var cookieJwtAuth = require('../middlewares/cookie-jwt-auth.js');

router.post('', [cookieJwtAuth], reviewController.createReview);
router.patch('/:reviewID', [cookieJwtAuth], reviewController.patchReview);
router.delete('/:reviewID', [cookieJwtAuth], reviewController.deleteReview);
router.get('', reviewController.getAllReviews);
router.get('/service/:serviceID', reviewController.getServiceReviews);
router.get('/:reviewID', reviewController.getReview);

module.exports = router;