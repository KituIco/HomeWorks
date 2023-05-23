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

    describe('patchBooking', () => {
        it('Test with valid input', async () => {
            // Prepare valid input
            const updatedBookingData = {
                seekerID: userID1,
                serviceID: serviceID,
                bookingStatus: 2,
                dateTimestamp: Date.now(),
                description: 'Updated booking',
                cost: '150.75',
                specsID: null,
            };

            // Call the patchBooking function
            await bookingRepo.patchBooking(
                bookingID,
                updatedBookingData.seekerID,
                updatedBookingData.serviceID,
                updatedBookingData.bookingStatus,
                updatedBookingData.dateTimestamp,
                updatedBookingData.description,
                Number(updatedBookingData.cost),
                updatedBookingData.specsID
            );

            // Verify that the booking is patched successfully in the database
            const patchedBooking = await bookingRepo.getBookingByID(bookingID);
            expect(patchedBooking.seekerID).toBe(updatedBookingData.seekerID);
            expect(patchedBooking.serviceID).toBe(updatedBookingData.serviceID);
            expect(patchedBooking.bookingStatus).toBe(
                updatedBookingData.bookingStatus
            );
            expect(patchedBooking.dateTimestamp).toBe(
                updatedBookingData.dateTimestamp
            );
            expect(patchedBooking.description).toBe(
                updatedBookingData.description
            );
            expect(patchedBooking.cost).toBe(updatedBookingData.cost);
            expect(patchedBooking.specsID).toBe(updatedBookingData.specsID);
        });

        it('Test with invalid input', async () => {
            // Prepare invalid input
            const invalidBookingData = {
                seekerID: 'invalidUserID',
                serviceID: 'invalidServiceID',
                bookingStatus: 2,
                dateTimestamp: Date.now(),
                description: 'Updated booking',
                cost: '150.75',
                specsID: null,
            };

            // Call the patchBooking function with invalid input
            await expect(
                bookingRepo.patchBooking(
                    bookingID,
                    invalidBookingData.seekerID,
                    invalidBookingData.serviceID,
                    invalidBookingData.bookingStatus,
                    invalidBookingData.dateTimestamp,
                    invalidBookingData.description,
                    Number(invalidBookingData.cost),
                    invalidBookingData.specsID
                )
            ).rejects.toThrow();

            // Alternatively, you can check for a specific error message
            // await expect(
            //   bookingRepo.patchBooking(/*...*/)
            // ).rejects.toThrow('Invalid input');
        });

        it('Test with non-existent booking ID', async () => {
            const nonExistentBookingID = 'nonExistentBookingID';

            // Call the patchBooking function with non-existent booking ID
            await expect(
                bookingRepo.patchBooking(
                    nonExistentBookingID
                    /*...*/
                )
            ).rejects.toThrow();
        });
    });
});
