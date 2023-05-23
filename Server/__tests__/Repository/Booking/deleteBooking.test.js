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

    describe('deleteBooking', () => {
        it('Test with a valid booking ID', async () => {
            // Call the deleteBooking function with a valid booking ID
            await expect(
                bookingRepo.deleteBooking(bookingID)
            ).resolves.not.toThrow();

            // Verify that the booking is deleted by checking if it exists in the database
            const deletedBooking = await bookingRepo.getBookingByID(bookingID);
            expect(deletedBooking).toBeUndefined();
        });

        it('Test with an invalid booking ID', async () => {
            const invalidBookingID = 'nonexistent_booking_id';

            // Call the deleteBooking function with an invalid booking ID
            await expect(
                bookingRepo.deleteBooking(invalidBookingID)
            ).rejects.toThrow();
        });

        it('Test with a booking ID that is referenced by other tables', async () => {
            // Create a new booking that is referenced by the Service and Seeker tables
            const referencedBookingID = nanoid(10);

            // Create a new service and associate it with the referenced booking
            const referencedServiceID = nanoid(10);
            await serviceRepo.createService(
                referencedServiceID,
                userID2,
                '1',
                'Referenced Service',
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                referencedBookingID
            );

            // Call the deleteBooking function with the referenced booking ID
            await expect(
                bookingRepo.deleteBooking(referencedBookingID)
            ).resolves.not.toThrow();

            // Verify that the booking and its associated records are deleted
            const deletedBooking = await bookingRepo.getBookingByID(
                referencedBookingID
            );
            const deletedService = await serviceRepo.getService(
                referencedServiceID
            );

            expect(deletedBooking).toBeUndefined();
        });
    });
});
