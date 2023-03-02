var express = require('express');
var router = express.Router();

var db = require('../middlewares/mysql_data_access.js');
var BookingRepo = require('../repositiories/booking-repo.js');
var clientErrors = require('../error/client-error-handler.js');
var serverErrors = require('../error/server-error-handler.js');
var { nanoid } = require('nanoid');
var BookingController = require('../controllers/booking-controller.js');

var bookingRepo = new BookingRepo(db);
var bookingController = new BookingController(
    bookingRepo, 
    clientErrors, 
    serverErrors, 
    null, 
    nanoid
);

router.post('', bookingController.createBooking);
router.patch('/:bookingID', bookingController.patchBooking);
router.delete('/:bookingID', bookingController.deleteBooking);
router.get('', bookingController.getAllBookings);
router.get('/seeker/:seekerID', bookingController.getSeekerBookings);
router.get('/provider/:providerID', bookingController.getProviderBookings);
router.get('/:bookingID', bookingController.getBookingByID);

module.exports = router;