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

    describe('createProvider', () => {
        it('Test with valid input', async () => {
            // Prepare valid input values

            // Call the createProvider function
            await providerRepo.createProvider(
                userID,
                'John',
                'Doe',
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            let createdProvider = await providerRepo.getProvider(userID);

            // Assert that the provider is created successfully in the database
            expect(createdProvider).toBeTruthy();

            // Optionally, you can verify the provider's values in the database using assertions
        });

        it('Test with invalid input', async () => {
            // Prepare invalid input values

            // Call the createProvider function
            await expect(
                providerRepo.createProvider(
                    null,
                    'John',
                    'Doe',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();

            // Optionally, you can verify the error message or error response
        });

        it('Test with existing provider ID', async () => {
            // Create a provider with the existing provider ID in the database

            await expect(
                providerRepo.createProvider(
                    userID,
                    'John',
                    'Doe',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('Test with missing or incomplete required fields', async () => {
            // Prepare input values with missing required fields

            // Call the createProvider function with incomplete input
            await expect(
                providerRepo.createProvider(null, null, null)
            ).rejects.toThrow();

            // Optionally, you can verify the error message or error response
        });
    });
});
