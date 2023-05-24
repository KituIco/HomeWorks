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

    beforeEach(async () => {});

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

    describe('createMessage', () => {
        it('Test with valid input: Provide valid values for all parameters and ensure that the function executes without throwing an error. Verify that the message is created successfully in the database.', async () => {
            await messageRepo.createMessage(
                messageID,
                bookingID,
                userID1,
                Date.now(),
                'Test message',
                'image1.jpg'
            );

            const result = await messageRepo.getMessage(messageID);

            expect(result).toBeTruthy();

            const message = await messageRepo.getMessage(messageID);
            expect(message).toBeDefined();
            expect(message.messageID).toEqual(messageID);
            expect(message.bookingID).toEqual(bookingID);
            expect(message.userID).toEqual(userID1);
            expect(message.message).toEqual('Test message');
            expect(message.images).toEqual('image1.jpg');
        });

        it('Test with invalid input: Pass invalid or incorrect values for some parameters, such as providing a non-existent booking ID or user ID. Verify that the function handles the invalid input gracefully and throws an appropriate error or returns an error response.', async () => {
            await expect(
                messageRepo.createMessage(
                    messageID,
                    'invalidBookingID',
                    userID1,
                    Date.now(),
                    'Test message',
                    'image1.jpg'
                )
            ).rejects.toThrow();

            await expect(
                messageRepo.createMessage(
                    messageID,
                    bookingID,
                    'invalidUserID',
                    Date.now(),
                    'Test message',
                    'image1.jpg'
                )
            ).rejects.toThrow();
        });

        it('Test with existing message ID: Create a message with a message ID that already exists in the database. Verify that the function handles this situation correctly, such as throwing an error indicating the uniqueness constraint violation or updating the existing message with the new values.', async () => {
            // Create a message with the initial message ID
            await messageRepo.createMessage(
                messageID,
                bookingID,
                userID1,
                Date.now(),
                'Initial message',
                'image1.jpg'
            );

            // Try to create another message with the same message ID
            await expect(
                messageRepo.createMessage(
                    messageID,
                    bookingID,
                    userID1,
                    Date.now(),
                    'Updated message',
                    'image2.jpg'
                )
            ).rejects.toThrow();

            // Verify that the existing message is not updated
            const message = await messageRepo.getMessage(messageID);
            expect(message).toBeDefined();
            expect(message.messageID).toEqual(messageID);
            expect(message.bookingID).toEqual(bookingID);
            expect(message.userID).toEqual(userID1);
            expect(message.message).toEqual('Initial message');
            expect(message.images).toEqual('image1.jpg');
        });

        it('Test with missing or incomplete required fields: Omit some of the required parameters or provide empty values for them. Verify that the function validates the input and throws an error or returns an error response indicating the missing fields.', async () => {
            await expect(
                messageRepo.createMessage(
                    messageID,
                    null,
                    userID1,
                    Date.now(),
                    'Test message',
                    'image1.jpg'
                )
            ).rejects.toThrow();

            await expect(
                messageRepo.createMessage(
                    null,
                    bookingID,
                    userID1,
                    Date.now(),
                    'Test message',
                    'image1.jpg'
                )
            ).rejects.toThrow();
        });
    });
});
