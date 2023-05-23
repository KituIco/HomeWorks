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

    beforeEach(async () => {});

    afterEach(async () => {
        // Delete the card payment
        await cardPaymentRepo.deleteCardPayment(cardPaymentID);
    });

    afterAll(async () => {
        // Delete the user
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('createCardPayment', () => {
        it('Test with valid input', async () => {
            const cardPaymentData = {
                cardId: cardPaymentID,
                userId: userID,
                cardNum: '1234567890123456',
                expDate: 1671996400000,
                cv: '123',
                merchant: 'Test Merchant',
                cardType: 1,
            };

            await cardPaymentRepo.createCardPayment(
                cardPaymentData.cardId,
                cardPaymentData.userId,
                cardPaymentData.cardNum,
                cardPaymentData.expDate,
                cardPaymentData.cv,
                cardPaymentData.merchant,
                cardPaymentData.cardType
            );

            const createdPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );

            expect(createdPayment).toBeDefined();
            expect(createdPayment.cardID).toBe(cardPaymentID);
            // Add more assertions as needed
        });

        it('Test with invalid input', async () => {
            // Pass invalid or incorrect values for some parameters
            const cardPaymentData = {
                cardId: 'nonExistentCardIDaaaaaaaaaa',
                userId: 'nonExistentUserID',
                cardNum: 'invalidCardNumber',
                expDate: 'invalidExpiryDate',
                cv: 'invalidCVV',
                merchant: 'Test Merchant',
                cardType: 2,
            };

            await expect(
                cardPaymentRepo.createCardPayment(
                    cardPaymentData.cardId,
                    cardPaymentData.userId,
                    cardPaymentData.cardNum,
                    cardPaymentData.expDate,
                    cardPaymentData.cv,
                    cardPaymentData.merchant,
                    cardPaymentData.cardType
                )
            ).rejects.toThrow();
            // Add more assertions as needed
        });

        it('Test with existing card ID', async () => {
            // Create a card payment with a card ID that already exists in the database
            const cardPaymentData = {
                cardId: cardPaymentID, // Use the same card ID as before
                userId: userID,
                cardNum: '6543210987654321',
                expDate: 1738412400000,
                cv: '987',
                merchant: 'Updated Merchant',
                cardType: 2,
            };

            await cardPaymentRepo.createCardPayment(
                cardPaymentData.cardId,
                cardPaymentData.userId,
                cardPaymentData.cardNum,
                cardPaymentData.expDate,
                cardPaymentData.cv,
                cardPaymentData.merchant,
                cardPaymentData.cardType
            );

            await expect(
                cardPaymentRepo.createCardPayment(
                    cardPaymentData.cardId,
                    cardPaymentData.userId,
                    cardPaymentData.cardNum,
                    cardPaymentData.expDate,
                    cardPaymentData.cv,
                    cardPaymentData.merchant,
                    cardPaymentData.cardType
                )
            ).rejects.toThrow();
            // Add more assertions as needed
        });

        it('Test with missing or incomplete required fields', async () => {
            // Omit some of the required parameters or provide empty values for them
            const cardPaymentData = {
                cardId: '', // Empty card ID
                userId: userID,
                cardNum: '1234567890123456',
                expDate: 1671996400000,
                cv: '', // Empty CVV
                merchant: 'Test Merchant',
                cardType: 1,
            };

            await expect(
                cardPaymentRepo.createCardPayment(cardPaymentData)
            ).rejects.toThrow();
            // Add more assertions as needed
        });
    });
});
