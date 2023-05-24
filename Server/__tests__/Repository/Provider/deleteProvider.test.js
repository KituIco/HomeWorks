const ProviderRepository = require('../../../repositiories/provider-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ProviderRepository', () => {
    let providerRepo;
    let userRepo;
    let userID = nanoid(10);

    beforeAll(async () => {
        // Create a new providerRepo instance before every test.
        providerRepo = new ProviderRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {});

    afterEach(async () => {
        // Delete the user
        await providerRepo.deleteProvider(userID);
        await userRepo.deleteUser(userID);
    });

    afterAll(async () => {
        await db.end();
    });

    describe('deleteProvider', () => {
        it('Test with an existing provider ID', async () => {
            // Get the provider ID from the created provider

            // Call the deleteProvider function
            await providerRepo.deleteProvider(userID);

            // Verify that the provider no longer exists in the database
            const deletedProvider = await providerRepo.getProvider(userID);
            expect(deletedProvider).not.toBeDefined();
        });

        it('Test with a non-existent provider ID', async () => {
            const nonExistentProviderID = '';

            // Call the deleteProvider function with a non-existent provider ID

            let beforeDelete = await providerRepo.getProvider(
                nonExistentProviderID
            );

            await providerRepo.deleteProvider(nonExistentProviderID);

            let afterDelete = await providerRepo.getProvider(
                nonExistentProviderID
            );

            // Verify that both cases are not defined
            expect(beforeDelete).not.toBeDefined();
            expect(afterDelete).not.toBeDefined();
        });

        it('Test with invalid input', async () => {
            // Call the deleteProvider function with a provider ID exceeding the maximum limit
            const longProviderID = 'a'.repeat(15);
            await expect(
                providerRepo.deleteProvider(longProviderID)
            ).rejects.toThrow();
        });
    });
});
