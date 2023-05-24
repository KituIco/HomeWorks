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

    describe('getMessage', () => {
        it('should retrieve the corresponding message for an existing message ID', async () => {
            // Provide a valid message ID that exists in the `Message` table
            const validMessageID = messageID;

            // Call the getMessage function
            const result = await messageRepo.getMessage(validMessageID);

            // Assert that the result is not null and contains the expected properties
            expect(result).toBeDefined();
            expect(result.messageID).toEqual(validMessageID);
            expect(result.bookingID).toEqual(bookingID);
            expect(result.userID).toEqual(userID1);
            expect(result.message).toEqual('test-message');
            expect(result.images).toBeNull();
        });

        it('should return null or an empty result for a non-existent message ID', async () => {
            // Provide a message ID that does not exist in the `Message` table
            const nonExistentMessageID = 'non-id';

            // Call the getMessage function
            const result = await messageRepo.getMessage(nonExistentMessageID);

            // Assert that the result is null or an empty object
            expect(result).not.toBeDefined();
        });

        it('should throw an error or return an error response for invalid input', async () => {
            // Pass invalid or incorrect values for the messageID parameter
            const invalidMessageID = nanoid(50);

            // Call the getMessage function and expect it to throw an error or return an error response
            await expect(
                messageRepo.getMessage(invalidMessageID)
            ).rejects.toThrow();
        });
    });
});
