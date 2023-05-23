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

    describe('getProviderBookings', () => {
        it("should retrieve the provider's bookings correctly", async () => {
            const providerID = userID2;

            // Call the getProviderBookings function
            const bookings = await bookingRepo.getProviderBookings(providerID);

            // Assert that the bookings array is not empty and contains the expected booking
            expect(Array.isArray(bookings)).toBe(true);
            expect(bookings.length).toBeGreaterThan(0);
            expect(bookings[0].bookingID).toBe(bookingID);
        });

        it('should return an empty array for a provider with no bookings', async () => {
            const providerID = userID2;

            // Delete the previously created booking for the provider
            await bookingRepo.deleteBooking(bookingID);

            // Call the getProviderBookings function
            const bookings = await bookingRepo.getProviderBookings(providerID);

            // Assert that the bookings array is empty
            expect(Array.isArray(bookings)).toBe(true);
            expect(bookings.length).toBe(0);
        });

        it('should throw an error for an invalid provider ID', async () => {
            const invalidProviderID = 'invalid_idaaaaaaaaaaaaaa';

            // Call the getProviderBookings function with an invalid provider ID
            await expect(
                bookingRepo.getProviderBookings(invalidProviderID)
            ).rejects.toThrow();
        });
    });
});
