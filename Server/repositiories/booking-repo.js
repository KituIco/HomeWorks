class BookingRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createBooking = async (
        bookingID,
        seekerID,
        serviceID,
        bookingStatus,
        dateTimestamp
    ) => {
        try {
            let sqlQuery = `CALL create_booking(?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
            ]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchBooking = async (
        bookingID,
        seekerID,
        serviceID,
        bookingStatus,
        dateTimestamp
    ) => {
        try {
            let sqlQuery = `CALL patch_booking(?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                bookingID,
                seekerID,
                serviceID,
                bookingStatus,
                dateTimestamp
            ]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteBooking = async (bookingID) => {
        try {
            let sqlQuery = `CALL delete_booking(?)`;
            await this.db.query(sqlQuery, [bookingID]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getAllBookings = async () => {
        try {
            let sqlQuery = `CALL get_all_bookings()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getSeekerBookings = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_bookings(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
    
    getProviderBookings = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_bookings(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getBookingByID = async (bookingID) => {
        try {
            let sqlQuery = `CALL get_booking_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [bookingID]);
            return result[0][0];
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = BookingRepository;