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
        seekerID = nanoid(10);
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

    beforeEach(async () => {});

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

    describe('createPayout', () => {
        it('should create a new payout when given valid data', async () => {
            // Create a new payout and store the payoutID
            payoutID = nanoid(10);

            await payoutRepo.createPayout(
                payoutID,
                seekerID,
                userID,
                500,
                Date.now(),
                1
            );

            const result = await payoutRepo.getPayoutByID(payoutID);

            expect(result.payoutID).toEqual(payoutID);
            expect(result.seekerID).toEqual(seekerID);
            expect(result.providerID).toEqual(userID);
            expect(result.amount).toEqual(500);
            expect(result.dateTimestamp).toBeDefined();
            expect(result.payoutStatus).toEqual(1);
        });

        it('should throw an error when given invalid data', async () => {
            // Create a new payout and store the payoutID

            await expect(
                payoutRepo.createPayout(
                    nanoid(50),
                    seekerID,
                    userID,
                    500,
                    Date.now(),
                    1
                )
            ).rejects.toThrow();
        });

        it('should throw an error when given a duplicate payoutID', async () => {
            // Create a new payout and store the payoutID
            payoutID = nanoid(10);
            await payoutRepo.createPayout(
                payoutID,
                seekerID,
                userID,
                500,
                Date.now(),
                1
            );

            await expect(
                payoutRepo.createPayout(
                    payoutID,
                    seekerID,
                    userID,
                    500,
                    Date.now(),
                    1
                )
            ).rejects.toThrow();
        });

        it('should throw an error when payoutID, seekerID, or userID is null', async () => {
            // Create a new payout and store the payoutID
            payoutID = nanoid(10);
            let nullPayoutID = null;
            let payoutID2 = nanoid(10);
            await expect(
                payoutRepo.createPayout(
                    payoutID,
                    null,
                    userID,
                    500,
                    Date.now(),
                    1
                )
            ).rejects.toThrow();

            await expect(
                payoutRepo.createPayout(
                    nullPayoutID,
                    seekerID,
                    userID,
                    500,
                    Date.now(),
                    1
                )
            ).rejects.toThrow();

            await expect(
                payoutRepo.createPayout(
                    payoutID,
                    seekerID,
                    null,
                    500,
                    Date.now(),
                    1
                )
            ).rejects.toThrow();
        });
    });
});
