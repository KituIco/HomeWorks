const CardPaymentRepository = require('../../../repositiories/card-payment-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('CardPaymentRepository', () => {
    let cardPaymentRepo;
    let userRepo;
    let userID = nanoid(10);
    let cardPaymentID = nanoid(10);

    beforeAll(async () => {
        // Create a new cardPaymentRepo instance before every test.
        cardPaymentRepo = new CardPaymentRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // Create a new card payment
        const newCardPayment = {
            cardPaymentID: cardPaymentID,
            userID: userID,
            cardNum: '1234567890123456',
            expiryDate: Date.now() + 100000000,
            cvv: '123',
            merchant: 'Test Merchant',
            cardType: 1,
        };

        await cardPaymentRepo.createCardPayment(
            newCardPayment.cardPaymentID,
            newCardPayment.userID,
            newCardPayment.cardNum,
            newCardPayment.expiryDate,
            newCardPayment.cvv,
            newCardPayment.merchant,
            newCardPayment.cardType
        );
    });

    afterEach(async () => {
        // Delete the card payment
        await cardPaymentRepo.deleteCardPayment(cardPaymentID);
    });

    afterAll(async () => {
        // Delete the user
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('deleteCardPayment', () => {
        it('Test with a valid card ID', async () => {
            await expect(
                cardPaymentRepo.deleteCardPayment(cardPaymentID)
            ).resolves.not.toThrow();
            const deletedCardPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );
            expect(deletedCardPayment).toBeUndefined();
        });

        it('Test with an invalid card ID', async () => {
            const invalidCardID = 'a'.repeat(50);
            await expect(
                cardPaymentRepo.deleteCardPayment(invalidCardID)
            ).rejects.toThrow();
            const cardPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );
            expect(cardPayment).toBeDefined();
        });

        test('Test with a card ID that is associated with other data', async () => {
            // Create additional data associated with the card payment (e.g., transactions or user information)
            // ...

            await expect(
                cardPaymentRepo.deleteCardPayment(cardPaymentID)
            ).resolves.not.toThrow();

            const deletedCardPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );
            expect(deletedCardPayment).toBeUndefined();

            // Perform separate queries to check that the associated data remains intact
            // ...
        });
    });
});
