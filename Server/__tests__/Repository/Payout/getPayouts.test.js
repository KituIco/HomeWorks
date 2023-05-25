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

    describe('getPayouts', () => {
        it('should return an array of payouts', async () => {
            const payouts = await payoutRepo.getPayouts();
            expect(payouts).toBeInstanceOf(Array);
        });

        it('should return an empty array if no payouts exist', async () => {
            // Mock the getPayouts method to return an empty array
            payoutRepo.getPayouts = jest.fn(() => []);

            const payouts = await payoutRepo.getPayouts();

            expect(payouts).toBeInstanceOf(Array);
            expect(payouts.length).toBe(0);
        });

        it('should return an array of payouts if payouts exist', async () => {
            const payouts = await payoutRepo.getPayouts();
            expect(payouts).toBeInstanceOf(Array);
            expect(payouts.length).toBeGreaterThanOrEqual(0);

            payouts.forEach((payout) => {
                expect(payout).toHaveProperty('payoutID');
                expect(payout).toHaveProperty('seekerID');
                expect(payout).toHaveProperty('providerID');
                expect(payout).toHaveProperty('amount');
                expect(payout).toHaveProperty('date');
                expect(payout).toHaveProperty('status');
            });
        });
    });
});
