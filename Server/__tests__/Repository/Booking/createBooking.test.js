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

    beforeEach(async () => {});

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

    describe('createBooking', () => {
        it('Test with valid input', async () => {
            // Provide valid values for all parameters
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

            let booking = await bookingRepo.getBookingByID(bookingID);
            // Check if the booking was created
            expect(booking).toEqual(bookingData);
        });

        it('Test with invalid input', async () => {
            // Pass invalid or incorrect values for some parameters
            const bookingData = {
                bookingID: bookingID,
                seekerID: 'nonexistentID', // Pass a non-existent seeker ID
                serviceID: 'nonexistentID', // Pass a non-existent service ID
                bookingStatus: 1,
                dateTimestamp: Date.now(),
                description: 'Test booking',
                cost: '100.50',
                specsID: null,
            };

            // Call the createBooking function and catch the error
            await expect(
                bookingRepo.createBooking(
                    bookingData.bookingID,
                    bookingData.seekerID,
                    bookingData.serviceID,
                    bookingData.bookingStatus,
                    bookingData.dateTimestamp,
                    bookingData.description,
                    Number(bookingData.cost),
                    bookingData.specsID
                )
            ).rejects.toThrow(); // Verify that the function throws an error
        });

        it('Test with existing booking ID', async () => {
            // Create a booking with an existing booking ID
            const bookingData = {
                bookingID: bookingID, // Use the same booking ID as the previous test case
                seekerID: userID1,
                serviceID: serviceID,
                bookingStatus: 1,
                dateTimestamp: Date.now(),
                description: 'Test booking',
                cost: '100.50',
                specsID: null,
            };

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

            // Call the createBooking function and catch the error
            await expect(
                bookingRepo.createBooking(
                    bookingData.bookingID,
                    bookingData.seekerID,
                    bookingData.serviceID,
                    bookingData.bookingStatus,
                    bookingData.dateTimestamp,
                    bookingData.description,
                    Number(bookingData.cost),
                    bookingData.specsID
                )
            ).rejects.toThrow(); // Verify that the function throws an error indicating the uniqueness constraint violation
        });

        it('Test with missing or incomplete required fields', async () => {
            // Omit some of the required parameters or provide empty values for them
            const bookingData = {
                bookingID: null, // Provide an empty booking ID
                seekerID: userID1,
                serviceID: serviceID,
                bookingStatus: 1,
                dateTimestamp: Date.now(),
                description: 'Test booking',
                cost: '', // Provide an empty cost value
                specsID: null,
            };

            // Call the createBooking function and catch the error
            await expect(
                bookingRepo.createBooking(
                    bookingData.bookingID,
                    bookingData.seekerID,
                    bookingData.serviceID,
                    bookingData.bookingStatus,
                    bookingData.dateTimestamp,
                    bookingData.description,
                    Number(bookingData.cost),
                    bookingData.specsID
                )
            ).rejects.toThrow(); // Verify that the function throws an error indicating the missing fields
        });
    });
});
