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

    describe('deletePayout', () => {
        it('should delete a payout when given a valid payoutID', async () => {
            // Delete the created payout
            await payoutRepo.deletePayout(payoutID);

            // Check if the payout exists
            const payout = await payoutRepo.getPayoutByID(payoutID);
            expect(payout).toBeUndefined();
        });

        it('should result in no changes for deleting non-existent payoutID', async () => {
            let nonExistentPayoutID = nanoid(10);

            // get before delete
            const payoutBefore = await payoutRepo.getPayoutByID(
                nonExistentPayoutID
            );

            // Delete the non existent payout
            await payoutRepo.deletePayout(nonExistentPayoutID);

            // get after delete
            const payoutAfter = await payoutRepo.getPayoutByID(
                nonExistentPayoutID
            );

            // both should be undefined

            expect(payoutBefore).toBeUndefined();
            expect(payoutAfter).toBeUndefined();
        });

        it('should throw an error when given an invalid payoutID', async () => {
            // Delete the created payout
            await expect(
                payoutRepo.deletePayout('invalidPayoutID'.repeat(10))
            ).rejects.toThrow();
        });
    });
});
