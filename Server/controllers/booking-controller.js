class BookingController {
    constructor (
        bookingRepo,
        clientErrors,
        serverErrors,
        bookingValidator = null,
        nanoid
    ) {
        this.bookingRepo = bookingRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.bookingValidator = bookingValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createBooking = async(req, res) => {
        try {
            let {
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
            } = req.body;

            // Client Errors
            // Pre-query validations
                // Validate if necessary fields are not null
                // Validate if seekerID exists in database
                // Validate if serviceID exists in databas

            let bookingID = this.nanoid(14);

            await this.bookingRepo.createBooking(
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
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
            console.log(error);
        }
    };

    // PATCH: "/:bookingID"
    patchBooking = async(req, res) => {
        try {
            let {
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
            } = req.body;
            
            let {bookingID} = req.params;

            // Client Errors
            // Pre-query validations
                // Validate if not all fields are null
                // Validate if bookingID is not null
                // Validate if bookingID exists in database
                // Validate if seekerID exists in database
                // Validate if serviceID exists in database
            
            await this.bookingRepo.patchBooking(
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
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
            console.log(error);
        }
    };

    // DELETE: "/:bookingID"
    deleteBooking = async(req, res) => {
        try {
            let {bookingID} = req.params;

            // Pre-query validations
                // Validate if bookingID is not null
                // Validate if bookingID exists in database
            
            await this.bookingRepo.deleteBooking(bookingID);

            res.status(204);
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllBookings = async(req, res) => {
        try {
            let bookings = await this.bookingRepo.getAllBookings();
            res.status(200).json({
                message: 'Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerBookings = async(req, res) => {
        try {
            let {seekerID} = req.params;

            // Pre-query validations
                // Validate if seekerID is not null

            let bookings = await this.bookingRepo.getSeekerBookings(seekerID);

            res.status(200).json({
                message: 'Seeker Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/provider/:providerID"
    getProviderBookings = async(req, res) => {
        try {
            let {providerID} = req.params;

            // Pre-query validations
                // Validate if providerID is not null
            
            let bookings = await this.bookingRepo.getProviderBookings(providerID);

            res.status(200).json({
                message: 'Provider Bookings retrieved successfully',
                body: bookings
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    getBookingByID = async(req, res) => {
        try {
            let {bookingID} = req.params;

            // Pre-query validations
                // Validate if bookingID is not null

            let booking = await this.bookingRepo.getBookingByID(bookingID);

            // Post-query validations
                 // Validate if bookingID exists in database

            res.status(200).json({
                message: 'Booking retrieved successfully',
                body: booking
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = BookingController;