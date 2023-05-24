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

    describe('deleteMessage', () => {
        it('Test with an existing message ID', async () => {
            // Call the deleteMessage function with an existing message ID
            await messageRepo.deleteMessage(messageID);

            // Perform a separate query to ensure that the message is no longer present in the table
            const deletedMessage = await messageRepo.getMessage(messageID);

            expect(deletedMessage).not.toBeDefined();
        });

        it('Test with a non-existent message ID', async () => {
            const nonExistentMessageID = nanoid(10);

            let beforeDelete = await messageRepo.getMessage(
                nonExistentMessageID
            );

            // Call the deleteMessage function with a non-existent message ID
            await messageRepo.deleteMessage(nonExistentMessageID);

            // Perform a separate query to ensure that the table remains unchanged
            let afterDelete = await messageRepo.getMessage(
                nonExistentMessageID
            );

            expect(beforeDelete).toBe(afterDelete);
        });

        it('Test with invalid input', async () => {
            const invalidMessageID = 'a'.repeat(50);

            // Call the deleteMessage function with an invalid message ID
            try {
                await messageRepo.deleteMessage(invalidMessageID);
            } catch (error) {
                expect(error).toBeDefined();
            }
        });
    });
});
