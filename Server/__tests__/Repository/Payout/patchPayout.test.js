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

    describe('patchPayout', () => {
        it('should update a payout when given valid data', async () => {
            // Update the payout
            await payoutRepo.patchPayout(
                payoutID,
                null,
                null,
                1000,
                null,
                null
            );

            // Get the payout
            const payout = await payoutRepo.getPayoutByID(payoutID);

            // Check if the payout was updated
            expect(payout.amount).toEqual(1000);
        });

        it('should throw an error when given an invalid payoutID', async () => {
            // Update the payout
            await expect(
                payoutRepo.patchPayout(
                    'invalid'.repeat(10),
                    null,
                    null,
                    1000,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should not change anything when missing values are passed', async () => {
            // Update the payout
            await payoutRepo.patchPayout(
                payoutID,
                null,
                null,
                null,
                null,
                null
            );

            // Get the payout
            const payout = await payoutRepo.getPayoutByID(payoutID);

            // Check if the payout was updated
            expect(payout.amount).toEqual(500);
        });
    });
});
