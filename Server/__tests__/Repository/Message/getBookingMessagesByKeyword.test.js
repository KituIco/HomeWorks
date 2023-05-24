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

    describe('getBookingMessagesByKeyword', () => {
        it('Test with valid input: Retrieve messages with a valid booking ID and keyword', async () => {
            const bookingId = bookingID; // Use the valid booking ID created in beforeAll
            const keyword = 'test-message'; // Use a valid keyword that exists in the Message table

            // Call the getBookingMessagesByKeyword function
            const result = await messageRepo.getBookingMessagesByKeyword(
                bookingId,
                keyword
            );

            // Verify that the result is not empty and contains the expected messages
            expect(result.length).toBeGreaterThan(0);
            // Add additional assertions to verify the content of the messages if needed
        });

        it('Test with a non-existent booking ID: Return an empty result', async () => {
            const nonExistentBookingId = 'booking-id';

            // Call the getBookingMessagesByKeyword function with a non-existent booking ID
            const result = await messageRepo.getBookingMessagesByKeyword(
                nonExistentBookingId,
                'keyword'
            );

            // Verify that the result is empty
            expect(result.length).toBe(0);
        });

        it('Test with a non-existent keyword: Return an empty result', async () => {
            const bookingId = bookingID; // Use a valid booking ID
            const nonExistentKeyword = 'non-existent-keyword';

            // Call the getBookingMessagesByKeyword function with a non-existent keyword
            const result = await messageRepo.getBookingMessagesByKeyword(
                bookingId,
                nonExistentKeyword
            );

            // Verify that the result is empty
            expect(result.length).toBe(0);
        });
    });
});
