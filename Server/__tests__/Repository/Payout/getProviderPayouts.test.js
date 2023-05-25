const PayoutRepository = require('../../../repositiories/payout-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('PayoutRepository', () => {
    let payoutRepo;
    let userRepo;
    let providerRepo;
    let userID;
    let payoutID;
    let seekerID;

    beforeAll(async () => {
        // Create a new payoutRepo instance before every test.
        payoutRepo = new PayoutRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);

        // Create a new user and store the userID
        userID = nanoid(10);
        await userRepo.createUser(userID);
        await providerRepo.createProvider(
            userID,
            'Test',
            'User',
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // Create a new payout and store the payoutID
        payoutID = nanoid(10);
        seekerID = nanoid(10);

        await payoutRepo.createPayout(
            payoutID,
            seekerID,
            userID,
            500,
            Date.now(),
            1
        );
    });

    afterEach(async () => {
        // Delete the created payout
        await payoutRepo.deletePayout(payoutID);
    });

    afterAll(async () => {
        // Delete the created user
        await providerRepo.deleteProvider(userID);
        await userRepo.deleteUser(userID);
        // Close the database connection after all tests
        await db.end();
    });

    describe('getProviderPayouts', () => {
        it('should return an array of payouts if providerID is valid', async () => {
            // Call the getSeekerPayouts function
            const payouts = await payoutRepo.getProviderPayouts(userID);

            // Expect the returned value to be an array
            expect(payouts).toBeInstanceOf(Array);
            payouts.forEach((payout) => {
                // Expect each payout to have the correct properties
                expect(payout).toHaveProperty('payoutID');
                expect(payout).toHaveProperty('seekerID');
                expect(payout).toHaveProperty('providerID');
                expect(payout).toHaveProperty('amount');
                expect(payout).toHaveProperty('dateTimestamp');
                expect(payout).toHaveProperty('payoutStatus');
            });
        });

        it('should return an empty array if seekerID is invalid', async () => {
            // Call the getSeekerPayouts function
            const payouts = await payoutRepo.getProviderPayouts('invalid');

            // Expect the returned value to be an array
            expect(payouts).toBeInstanceOf(Array);
            // Expect the array to be empty
            expect(payouts).toHaveLength(0);
        });

        it('should return an error if seekerID length is greater than 14', async () => {
            // Call the getSeekerPayouts function
            await expect(
                payoutRepo.getProviderPayouts('invalidinvalidinvalid')
            ).rejects.toThrow();
        });
    });
});
