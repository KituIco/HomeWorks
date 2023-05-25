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

    describe('getPayoutByID', () => {
        it('should return a payout object when provided a valid payoutID', async () => {
            const payout = await payoutRepo.getPayoutByID(payoutID);
            expect(payout).toBeTruthy();
            expect(payout.payoutID).toEqual(payoutID);
        });

        it('should return undefined when provided a non-existing payoutID', async () => {
            const payout = await payoutRepo.getPayoutByID('invalidID');
            expect(payout).not.toBeDefined();
        });

        it('should throw an error when provided with a payoutID that is too long', async () => {
            await expect(
                payoutRepo.getPayoutByID('12345678901'.repeat(10))
            ).rejects.toThrow();
        });
    });
});
