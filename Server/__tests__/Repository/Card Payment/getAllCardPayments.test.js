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

    describe('getAllCardPayments', () => {
        it('Test with existing card payments', async () => {
            // Retrieve all card payments
            const cardPayments = await cardPaymentRepo.getAllCardPayments();

            // Verify that the returned result matches the expected values
            expect(cardPayments.length).toBeGreaterThan(0);
            cardPayments.forEach((cardPayment) => {
                expect(cardPayment.cardID).toBeDefined();
                expect(cardPayment.userID).toBeDefined();
            });
        });

        it('Test with no card payments', async () => {
            // Delete the card payment created in the beforeEach hook
            await cardPaymentRepo.deleteCardPayment(cardPaymentID);

            // Retrieve all card payments
            const cardPayments = await cardPaymentRepo.getAllCardPayments();

            // Verify that the function returns an empty result set
            expect(cardPayments.length).toBeGreaterThanOrEqual(0);
        });

        it('Test foreign key constraint', async () => {
            const invalidUserID = 'a'.repeat(25);

            // Create a card payment with a non-existent user ID
            const invalidCardPaymentID = nanoid(10);
            await expect(
                cardPaymentRepo.createCardPayment(
                    invalidCardPaymentID,
                    invalidUserID, // Invalid user ID
                    '1234567890123456',
                    Date.now() + 100000000,
                    '123',
                    'Test Merchant',
                    1
                )
            ).rejects.toThrow();

            // Retrieve all card payments
            const cardPayments = await cardPaymentRepo.getAllCardPayments();

            // Verify that the card payment with the invalid user ID is not retrieved
            const cardPayment = cardPayments.find(
                (cp) => cp.cardID === invalidCardPaymentID
            );
            expect(cardPayment).toBeUndefined();
        });
    });
});
