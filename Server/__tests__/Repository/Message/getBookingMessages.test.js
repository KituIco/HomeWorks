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

    describe('getBookingMessages', () => {
        it('should retrieve the corresponding messages for an existing booking ID', async () => {
            const result = await messageRepo.getBookingMessages(bookingID);
            expect(result).toBeDefined();
            expect(result.length).toBeGreaterThan(0);
            // Add additional assertions to verify the correctness of the retrieved messages
        });

        it('should return an empty array for a non-existent booking ID', async () => {
            const nonExistentBookingID = 'booking-id';
            const result = await messageRepo.getBookingMessages(
                nonExistentBookingID
            );
            expect(result).toBeDefined();
            expect(result.length).toBe(0);
        });

        it('should handle invalid input and throw an error or return an error response', async () => {
            // Test with an empty string for bookingID
            await expect(
                messageRepo.getBookingMessages(nanoid(50))
            ).rejects.toThrow();

            // Test with a bookingID exceeding the maximum allowed limit (14 characters)
            const invalidBookingID =
                'invalid-booking-id-that-exceeds-max-length';
            await expect(
                messageRepo.getBookingMessages(invalidBookingID)
            ).rejects.toThrow();

            // Add additional test cases to cover other invalid input scenarios
        });
    });
});
