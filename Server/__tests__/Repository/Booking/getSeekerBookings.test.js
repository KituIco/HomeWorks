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

    describe('getSeekerBookings', () => {
        it('Test with a valid seeker ID', async () => {
            // Provide a valid seeker ID that exists in the database and has associated bookings
            const validSeekerID = userID1;

            // Call the getSeekerBookings function
            const bookings = await bookingRepo.getSeekerBookings(validSeekerID);

            // Verify that the function retrieves the seeker's bookings correctly
            expect(bookings).toBeDefined();
            expect(Array.isArray(bookings)).toBe(true);
            expect(bookings.length).toBeGreaterThan(0);
            // Add additional assertions based on the expected result
            // For example, you can check if the returned bookings contain the expected booking IDs or other properties.
        });

        it('Test with no bookings for the seeker', async () => {
            // Provide a valid seeker ID that exists in the database but has no associated bookings
            const seekerIDWithNoBookings = userID2;

            // Call the getSeekerBookings function
            const bookings = await bookingRepo.getSeekerBookings(
                seekerIDWithNoBookings
            );

            // Verify that the function returns an empty array or a suitable response indicating the absence of bookings
            expect(bookings).toBeDefined();
            expect(Array.isArray(bookings)).toBe(true);
            expect(bookings.length).toBe(0);
            // Add additional assertions if needed
        });

        it('Test with an invalid seeker ID', async () => {
            // Pass an invalid or non-existent seeker ID
            const invalidSeekerID = 'invalidIDaaaaaaaaa';

            // Call the getSeekerBookings function and verify that it throws an appropriate error or returns an error response
            await expect(
                bookingRepo.getSeekerBookings(invalidSeekerID)
            ).rejects.toThrow();
            // Add additional assertions if needed
        });
    });
});
