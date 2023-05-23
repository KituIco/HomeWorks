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

    describe('patchCardPayment', () => {
        it('Test with valid input', async () => {
            // Provide valid values for all parameters
            const updatedCardPayment = {
                cardPaymentID: cardPaymentID,
                userID: userID,
                cardNum: '9876543210987654',
                expiryDate: Date.now() + 200000000,
                cvv: '456',
                merchant: 'Updated Merchant',
                cardType: 2,
            };

            await expect(
                cardPaymentRepo.patchCardPayment(
                    updatedCardPayment.cardPaymentID,
                    updatedCardPayment.userID,
                    updatedCardPayment.cardNum,
                    updatedCardPayment.expiryDate,
                    updatedCardPayment.cvv,
                    updatedCardPayment.merchant,
                    updatedCardPayment.cardType
                )
            ).resolves.not.toThrow();

            // Verify that the card payment details are updated successfully in the database
            const patchedCardPayment = await cardPaymentRepo.getCardPaymentByID(
                cardPaymentID
            );
            expect(patchedCardPayment.cardNum).toBe(updatedCardPayment.cardNum);
            expect(patchedCardPayment.expiryDate).toBe(
                updatedCardPayment.expiryDate
            );
            expect(patchedCardPayment.cvv).toBe(updatedCardPayment.cvv);
            expect(patchedCardPayment.merchant).toBe(
                updatedCardPayment.merchant
            );
            expect(patchedCardPayment.cardType).toBe(
                updatedCardPayment.cardType
            );
        });

        it('Test with invalid input', async () => {
            // Pass invalid or incorrect values for some parameters
            const invalidCardPayment = {
                cardPaymentID: 'invalidCardPaymentID',
                userID: 'nonExistentUserID',
                cardNum: '9876543210', // Invalid card number
                expiryDate: Date.now() - 100000000, // Expired expiry date
                cvv: 'abc', // Invalid CVV
                merchant: 'Unknown Merchant',
                cardType: 5, // Invalid card type
            };

            await expect(
                cardPaymentRepo.patchCardPayment(
                    invalidCardPayment.cardPaymentID,
                    invalidCardPayment.userID,
                    invalidCardPayment.cardNum,
                    invalidCardPayment.expiryDate,
                    invalidCardPayment.cvv,
                    invalidCardPayment.merchant,
                    invalidCardPayment.cardType
                )
            ).rejects.toThrow();

            // Alternatively, you can also check the returned error response
            // and verify that it indicates the error appropriately.
        });

        it('Test with missing or incomplete required fields', async () => {
            // Omit some of the required parameters or provide empty values for them
            const incompleteCardPayment = {
                cardPaymentID: cardPaymentID,
                userID: '', // Missing userID
                cardNum: '9876543210987654',
                expiryDate: Date.now() + 200000000,
                cvv: '', // Missing cvv
                merchant: 'Updated Merchant',
                cardType: 2,
            };

            await expect(
                cardPaymentRepo.patchCardPayment(
                    incompleteCardPayment.cardPaymentID,
                    incompleteCardPayment.userID,
                    incompleteCardPayment.cardNum,
                    incompleteCardPayment.expiryDate,
                    incompleteCardPayment.cvv,
                    incompleteCardPayment.merchant,
                    incompleteCardPayment.cardType
                )
            ).rejects.toThrow();

            // Alternatively, you can also check the returned error response
            // and verify that it indicates the missing fields appropriately.
        });
    });
});
