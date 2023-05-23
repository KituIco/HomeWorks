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

    describe('getUserCardPayments', () => {
        it('Test with a valid user ID', async () => {
            // Retrieve card payments associated with the user
            const userCardPayments = await cardPaymentRepo.getUserCardPayments(
                userID
            );

            // Verify that the function retrieves the expected results
            expect(userCardPayments).toHaveLength(1);
            expect(userCardPayments[0].userID).toBe(userID);
            // Add additional assertions as needed
        });

        it('Test with an invalid user ID', async () => {
            const invalidUserID = 'nonexistent_user_id';

            await expect(
                cardPaymentRepo.getUserCardPayments(invalidUserID)
            ).rejects.toThrow();
        });

        it('Test with different card payments', async () => {
            // Create multiple card payments for the same user and different users
            const user2ID = nanoid(10);

            // Create a new user
            await userRepo.createUser(user2ID);

            const cardPayment1 = {
                cardPaymentID: nanoid(10),
                userID: userID,
                cardNum: '1234567890123456',
                expiryDate: Date.now() + 100000000,
                cvv: '123',
                merchant: 'Test Merchant 1',
                cardType: 1,
            };

            const cardPayment2 = {
                cardPaymentID: nanoid(10),
                userID: userID,
                cardNum: '9876543210987654',
                expiryDate: Date.now() + 200000000,
                cvv: '456',
                merchant: 'Test Merchant 2',
                cardType: 2,
            };

            const cardPayment3 = {
                cardPaymentID: nanoid(10),
                userID: user2ID,
                cardNum: '1111111111111111',
                expiryDate: Date.now() + 300000000,
                cvv: '789',
                merchant: 'Test Merchant 3',
                cardType: 3,
            };

            await cardPaymentRepo.createCardPayment(
                cardPayment1.cardPaymentID,
                cardPayment1.userID,
                cardPayment1.cardNum,
                cardPayment1.expiryDate,
                cardPayment1.cvv,
                cardPayment1.merchant,
                cardPayment1.cardType
            );

            await cardPaymentRepo.createCardPayment(
                cardPayment2.cardPaymentID,
                cardPayment2.userID,
                cardPayment2.cardNum,
                cardPayment2.expiryDate,
                cardPayment2.cvv,
                cardPayment2.merchant,
                cardPayment2.cardType
            );

            await cardPaymentRepo.createCardPayment(
                cardPayment3.cardPaymentID,
                cardPayment3.userID,
                cardPayment3.cardNum,
                cardPayment3.expiryDate,
                cardPayment3.cvv,
                cardPayment3.merchant,
                cardPayment3.cardType
            );

            // Retrieve card payments associated with the user
            const userCardPayments = await cardPaymentRepo.getUserCardPayments(
                userID
            );

            userCardPayments.forEach((cardPayment) => {
                expect(cardPayment.userID).toBe(userID);
            });

            // Delete the user
            await userRepo.deleteUser(user2ID);
        });
    });
});
