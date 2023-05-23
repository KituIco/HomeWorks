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

    describe('getCardPaymentByID', () => {
        it('Test with valid card ID', async () => {
            // Retrieve the card payment using a valid card ID
            const cardPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );

            // Verify that the card payment information is retrieved correctly
            expect(cardPayment).toEqual({
                cardID: cardPaymentID,
                userID: userID,
                cardNum: '1234567890123456',
                expiryDate: expect.any(Number),
                cvv: '123',
                merchant: 'Test Merchant',
                cardType: 1,
            });
        });

        it('Test with invalid card ID', async () => {
            const invalidCardID = 'nonexistent_card_id';

            // Attempt to retrieve the card payment with an invalid card ID
            await expect(
                cardPaymentRepo.getCardPaymentByID(invalidCardID)
            ).rejects.toThrow();
        });

        it('Test with empty result', async () => {
            // Create a card payment with no associated payment information
            const emptyCardPaymentID = nanoid(10);

            // Retrieve the card payment with empty result
            const emptyCardPayment = await cardPaymentRepo.getCardPaymentByID(
                emptyCardPaymentID
            );

            // Verify that the result is empty
            expect(emptyCardPayment).toBeUndefined();

            // Clean up the empty card payment
            await cardPaymentRepo.deleteCardPayment(emptyCardPaymentID);
        });
    });
});
