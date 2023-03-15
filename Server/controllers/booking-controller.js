class BookingController {
    constructor (
        bookingRepo,
        clientErrors,
        bookingValidator,
        nanoid
    ) {
        this.bookingRepo = bookingRepo;
        this.clientErrors = clientErrors;
        this.bookingValidator = bookingValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createBooking = async(req, res, next) => {
        try {
            let {
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp,
                description,
                cost,
                specsID
            } = req.body;

            // Client Errors
            // Pre-query validations
                // Validate if necessary fields are not null
            this.bookingValidator.validateCreatePayload(req.body, ['seekerID', 'serviceID']);
                // Validate if seekerID exists in database
            await this.bookingValidator.validateExistence(seekerID, 'seeker');
                // Validate if serviceID exists in databas
            await this.bookingValidator.validateExistence(serviceID, 'service');

            let bookingID = this.nanoid(14);

            await this.bookingRepo.createBooking(
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp,
                description,
                cost,
                specsID
            );

            let newBooking = {
                ...req.body
            }
            newBooking.bookingID = bookingID;
            
            res.status(201).json({
                message: 'Booking created successfully',
                body: newBooking
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:bookingID"
    patchBooking = async(req, res, next) => {
        try {
            let {
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp,
                description,
                cost,
                specsID
            } = req.body;
            
            let {bookingID} = req.params;

            // Client Errors
            // Pre-query validations
                // Validate if bookingID is not null
            this.bookingValidator.checkRequiredParameters(req.params, ['bookingID']);
                // Validate if bookingID exists in database
            await this.bookingValidator.validateExistence(bookingID, 'booking');
                // Validate if not all fields are null
            this.bookingValidator.validatePatchPayload(req.body);
                // Validate if seekerID exists in database
            seekerID != null && await this.bookingValidator.validateExistence(seekerID, 'seeker');
                // Validate if serviceID exists in database
            serviceID != null && await this.bookingValidator.validateExistence(serviceID, 'service');
            
            await this.bookingRepo.patchBooking(
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp,
                description,
                cost,
                specsID
            );

            let updatedBooking = {
                ...req.body
            }
            updatedBooking.bookingID = bookingID;

            res.status(200).json({
                message: 'Booking updated successfully',
                body: updatedBooking
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:bookingID"
    deleteBooking = async(req, res, next) => {
        try {
            let {bookingID} = req.params;

            // Pre-query validations
                // Validate if bookingID is not null
            this.bookingValidator.checkRequiredParameters(req.params, ['bookingID']);
                // Validate if bookingID exists in database
            await this.bookingValidator.validateExistence(bookingID, 'booking');
            
            await this.bookingRepo.deleteBooking(bookingID);

            res.status(204);
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllBookings = async(req, res, next) => {
        try {
            let bookings = await this.bookingRepo.getAllBookings();
            res.status(200).json({
                message: 'Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerBookings = async(req, res, next) => {
        try {
            let {seekerID} = req.params;

            // Pre-query validations
                // Validate if seekerID is not null
            this.bookingValidator.checkRequiredParameters(req.params, ['seekerID']);
                // Validate if seekerID exists in database
            await this.bookingValidator.validateExistence(seekerID, 'seeker');

            let bookings = await this.bookingRepo.getSeekerBookings(seekerID);

            res.status(200).json({
                message: 'Seeker Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/provider/:providerID"
    getProviderBookings = async(req, res, next) => {
        try {
            let {providerID} = req.params;

            // Pre-query validations
                // Validate if providerID is not null
            this.bookingValidator.checkRequiredParameters(req.params, ['providerID']);
                // Validate if providerID exists in database
            await this.bookingValidator.validateExistence(providerID, 'provider');
            
            let bookings = await this.bookingRepo.getProviderBookings(providerID);

            res.status(200).json({
                message: 'Provider Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    getBookingByID = async(req, res, next) => {
        try {
            let {bookingID} = req.params;

            // Pre-query validations
                // Validate if bookingID is not null
            this.bookingValidator.checkRequiredParameters(req.params, ['bookingID']);

            let booking = await this.bookingRepo.getBookingByID(bookingID);

            // Post-query validations
                 // Validate if bookingID exists in database

            res.status(200).json({
                message: 'Booking retrieved successfully',
                body: booking
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };
}

module.exports = BookingController;