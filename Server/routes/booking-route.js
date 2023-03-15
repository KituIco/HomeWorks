var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var BookingRepo = require('../repositiories/booking-repo.js');
var SeekerRepo = require('../repositiories/seeker-repo.js');
var ProviderRepo = require('../repositiories/provider-repo.js');
var ServiceRepo = require('../repositiories/service-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var BookingValidator = require('../validators/booking-validator.js');
var { nanoid } = require('nanoid');
var BookingController = require('../controllers/booking-controller.js');

var bookingRepo = new BookingRepo(db);
var seekerRepo = new SeekerRepo(db);
var providerRepo = new ProviderRepo(db);
var serviceRepo = new ServiceRepo(db);
var bookingValidator = new BookingValidator(
    clientErrors,
    bookingRepo,
    seekerRepo,
    providerRepo,
    serviceRepo
);
var bookingController = new BookingController(
    bookingRepo,
    clientErrors,
    bookingValidator, 
    nanoid
);

const errorHandler = require('../middlewares/error-handler.js');

router.post('', [bookingController.createBooking, errorHandler]);
router.patch('/:bookingID', [bookingController.patchBooking, errorHandler]);
router.delete('/:bookingID', [bookingController.deleteBooking, errorHandler]);
router.get('', [bookingController.getAllBookings, errorHandler]);
router.get('/seeker/:seekerID', [bookingController.getSeekerBookings, errorHandler]);
router.get('/provider/:providerID', [bookingController.getProviderBookings, errorHandler]);
router.get('/:bookingID', [bookingController.getBookingByID, errorHandler]);

module.exports = router;