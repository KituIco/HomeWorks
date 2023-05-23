const BookingRepository = require('../../../repositiories/booking-repo');
const ServiceRepository = require('../../../repositiories/service-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('BookingRepository', () => {
    let bookingRepo;
    let serviceRepo;
    let userRepo;
    let seekerRepo;
    let providerRepo;
    let userID1 = nanoid(10);
    let userID2 = nanoid(10);
    let serviceID = nanoid(10);
    let bookingID = nanoid(10);

    beforeAll(async () => {
        // Create a new bookingRepo instance before every test.
        bookingRepo = new BookingRepository(db);
        serviceRepo = new ServiceRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);
        seekerRepo = new SeekerRepository(db);

        // create a new user
        await userRepo.createUser(userID1);
        await userRepo.createUser(userID2);

        // create a new seeker
        await seekerRepo.createSeeker(userID1, 'John', 'Doe', null, null, null);

        // create a new provider
        await providerRepo.createProvider(
            userID2,
            'John',
            'Doe',
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );

        // create a new service
        const typeID = '1';
        const typeName = 'Car Mechanic';

        await serviceRepo.createService(
            serviceID,
            userID2,
            typeID,
            typeName,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new booking
        const bookingData = {
            bookingID: bookingID,
            seekerID: userID1,
            serviceID: serviceID,
            bookingStatus: 1,
            dateTimestamp: Date.now(),
            description: 'Test booking',
            cost: '100.50',
            specsID: null,
        };

        // Call the createBooking function
        await bookingRepo.createBooking(
            bookingData.bookingID,
            bookingData.seekerID,
            bookingData.serviceID,
            bookingData.bookingStatus,
            bookingData.dateTimestamp,
            bookingData.description,
            Number(bookingData.cost),
            bookingData.specsID
        );
    });

    afterEach(async () => {
        // Delete booking
        await bookingRepo.deleteBooking(bookingID);
    });

    afterAll(async () => {
        // Delete user
        await userRepo.deleteUser(userID1);
        await userRepo.deleteUser(userID2);
        await db.end();
    });

    describe('getAllBookings', () => {
        it('Test with existing bookings: Ensure that the function retrieves all bookings from the database successfully when there are multiple bookings available. Verify that the returned result matches the expected number of bookings and their attributes.', async () => {
            const result = await bookingRepo.getAllBookings();
            expect(result.length).toBeGreaterThan(0); // Verify that at least one booking is returned
            // Verify the attributes of the returned bookings
            result.forEach((booking) => {
                expect(booking.bookingID).toBeDefined();
                expect(booking.seekerID).toBeDefined();
                expect(booking.serviceID).toBeDefined();
                expect(booking.bookingStatus).toBeDefined();
                expect(booking.dateTimestamp).toBeDefined();
                expect(booking.description).toBeDefined();
                expect(booking.cost).toBeDefined();
                expect(booking.specsID).toBeDefined();
            });
        });

        it('Test with no bookings: Verify the behavior of the function when there are no bookings in the database. Confirm that the function returns an empty array or a suitable response indicating the absence of bookings.', async () => {
            // Delete all existing bookings
            await db.query('DELETE FROM Booking');

            const result = await bookingRepo.getAllBookings();
            expect(result).toEqual([]); // Expect an empty array since there are no bookings
        });

        it('Test error handling: Simulate specific error conditions that can occur during the stored procedure call or database query. For example, test with an incorrect SQL query or a database connection failure. Verify that the function handles these errors appropriately by throwing the expected error or returning an error response.', async () => {
            // Simulate an incorrect SQL query by dropping the stored procedure
            await db.query('DROP PROCEDURE IF EXISTS get_all_bookings');

            // Call the function and expect an error to be thrown
            await expect(bookingRepo.getAllBookings()).rejects.toThrow();

            // Recreate the stored procedure for future tests
            await db.query(`
                CREATE PROCEDURE get_all_bookings()
                BEGIN
                    SELECT 
                        booking_id AS bookingID,
                        seeker_id AS seekerID,
                        service_id AS serviceID,
                        booking_status AS bookingStatus,
                        date_timestamp AS dateTimestamp,
                        description,
                        cost,
                        specs_id AS specsID
                    FROM 
                        Booking;
                END;
            `);
        });
    });
});
