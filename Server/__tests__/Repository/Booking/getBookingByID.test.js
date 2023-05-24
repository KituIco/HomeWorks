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

    describe('getBookingByID', () => {
        it('Test with a valid booking ID', async () => {
            // Provide a valid booking ID that exists in the database
            const validBookingID = bookingID;

            // Call the getBookingByID function
            const result = await bookingRepo.getBookingByID(validBookingID);

            // Verify that the function retrieves the booking correctly
            expect(result.bookingID).toBe(validBookingID);
            expect(result.seekerID).toBe(userID1);
            expect(result.serviceID).toBe(serviceID);
            expect(result.bookingStatus).toBe(1);
            expect(result.description).toBe('Test booking');
            expect(result.cost).toBe('100.50');
            expect(result.specsID).toBeNull();
        });

        it('Test with an invalid booking ID', async () => {
            // Pass an invalid or non-existent booking ID
            const invalidBookingID = 'invalid_id';

            // Call the getBookingByID function
            const result = await bookingRepo.getBookingByID(invalidBookingID);

            // Verify that the function handles the invalid input gracefully
            expect(result).toBeUndefined();
        });

        it('Test error handling', async () => {
            // Simulate specific error conditions that can occur during the stored procedure call or database query

            // For example, testing with an incorrect SQL query
            const invalidBookingID = "'; DROP TABLE Booking;--";

            // Call the getBookingByID function
            try {
                await bookingRepo.getBookingByID(invalidBookingID);
            } catch (error) {
                // Verify that the function throws the expected error or returns an error response
                expect(error).toBeDefined();
                // Add more specific assertions if required
            }
        });
    });
});
