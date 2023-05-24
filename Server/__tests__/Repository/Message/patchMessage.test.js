const MessageRepository = require('../../../repositiories/message-repo');
const UserRepository = require('../../../repositiories/user-repo');
const BookingRepository = require('../../../repositiories/booking-repo');
const ServiceRepository = require('../../../repositiories/service-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('MessageRepository', () => {
    let messageRepo;
    let userRepo;
    let bookingRepo;
    let serviceRepo;
    let seekerRepo;
    let providerRepo;
    let userID1 = nanoid(10);
    let userID2 = nanoid(10);
    let serviceID = nanoid(10);
    let bookingID = nanoid(10);
    let messageID = nanoid(10);

    beforeAll(async () => {
        // Create a new messageRepo instance before every test.
        messageRepo = new MessageRepository(db);
        userRepo = new UserRepository(db);
        bookingRepo = new BookingRepository(db);
        serviceRepo = new ServiceRepository(db);
        seekerRepo = new SeekerRepository(db);
        providerRepo = new ProviderRepository(db);

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
            null,
            null
        );

        // create a new service
        await serviceRepo.createService(
            serviceID,
            userID2,
            '1',
            'Car Mechanic',
            0,
            0,
            0,
            0,
            0,
            0,
            0
        );

        // create a new booking
        await bookingRepo.createBooking(
            bookingID,
            userID1,
            serviceID,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new message
        const newMessage = {
            messageID: messageID,
            bookingID: bookingID,
            userID: userID1,
            dateTimestamp: Date.now(),
            message: 'test-message',
            images: null,
        };

        await messageRepo.createMessage(
            newMessage.messageID,
            newMessage.bookingID,
            newMessage.userID,
            newMessage.dateTimestamp,
            newMessage.message,
            newMessage.images
        );
    });

    afterEach(async () => {
        // Delete the message
        await messageRepo.deleteMessage(messageID);
    });

    afterAll(async () => {
        // Delete the booking
        await bookingRepo.deleteBooking(bookingID);

        // Delete the service
        await serviceRepo.deleteService(serviceID);

        // Delete the user
        await userRepo.deleteUser(userID1);
        await userRepo.deleteUser(userID2);
        await db.end();
    });

    describe('patchMessage', () => {
        test('Test with valid input: Provide valid values for all parameters and ensure that the function executes without throwing an error. Verify that the message is successfully patched in the database.', async () => {
            // Prepare valid input values
            const newDateTimestamp = Date.now();
            const newMessage = 'updated-message';
            const newImages = null;

            // Call the patchMessage function
            await messageRepo.patchMessage(
                messageID,
                null,
                null,
                newDateTimestamp,
                newMessage,
                newImages
            );

            // Retrieve the patched message from the database
            const patchedMessage = await messageRepo.getMessage(messageID);

            // Verify that the message is successfully patched
            expect(patchedMessage.dateTimestamp).toBe(newDateTimestamp);
            expect(patchedMessage.message).toBe(newMessage);
            expect(patchedMessage.images).toBe(newImages);
        });

        test('Test with invalid input: Pass invalid or incorrect values for some parameters, such as providing a non-existent message ID, booking ID, or user ID. Verify that the function handles the invalid input gracefully and throws an appropriate error or returns an error response.', async () => {
            // Prepare invalid input values
            const invalidMessageID = 'invalid-message-id';
            const invalidBookingID = 'invalid-booking-id';
            const invalidUserID = 'invalid-user-id';

            // Call the patchMessage function with invalid input
            await expect(
                messageRepo.patchMessage(
                    invalidMessageID,
                    invalidBookingID,
                    invalidUserID,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow(/* Specify the expected error message or error type */);
        });

        test('Test with missing or incomplete required fields: Omit some of the required parameters or provide empty values for them. Verify that the function validates the input and throws an error or returns an error response indicating the missing fields.', async () => {
            // Call the patchMessage function with missing or incomplete required fields
            let beforePatch = await messageRepo.getMessage(messageID);
            await messageRepo.patchMessage(
                messageID,
                null,
                null,
                null,
                null,
                null
            );
            let afterPatch = await messageRepo.getMessage(messageID);

            // Verify that the message is not patched
            expect(beforePatch).toEqual(afterPatch);
        });
    });
});
