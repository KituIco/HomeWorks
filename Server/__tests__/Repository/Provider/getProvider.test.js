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

    beforeEach(async () => {
        // create a new provider
        const newProvider = {
            providerID: userID,
            firstName: 'John',
            lastName: 'Doe',
            birthdate: null,
            gender: null,
            providerDP: null,
            validID: null,
            agencyID: null,
            verified: null,
            rating: null,
        };

        await providerRepo.createProvider(
            newProvider.providerID,
            newProvider.firstName,
            newProvider.lastName,
            newProvider.birthdate,
            newProvider.gender,
            newProvider.providerDP,
            newProvider.validID,
            newProvider.agencyID,
            newProvider.verified,
            newProvider.rating
        );
    });

    afterEach(async () => {
        // Delete the user
        await providerRepo.deleteProvider(userID);
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getProvider', () => {
        it('Test with an existing provider ID', async () => {
            const existingProviderID = userID;

            const result = await providerRepo.getProvider(existingProviderID);

            // Assert that the result is not null or empty
            expect(result).toBeDefined();
            expect(result.providerId || result.providerID).toBe(
                existingProviderID
            );
        });

        it('Test with a non-existent provider ID', async () => {
            const nonExistentProviderID = 'nonexistentid';

            const result = await providerRepo.getProvider(
                nonExistentProviderID
            );

            // Assert that the result is null or empty
            expect(result).not.toBeDefined();
            // Or, if the function returns an empty array instead of null, you can use:
            // expect(result).toHaveLength(0);
        });

        it('Test with invalid input', async () => {
            const invalidProviderID = nanoid(100);

            // Assert that the function throws an error when passed invalid input
            await expect(
                providerRepo.getProvider(invalidProviderID)
            ).rejects.toThrow();

            // Or, if the function returns an error response instead of throwing an error,
            // you can assert the response object properties accordingly
            // const response = await providerRepo.getProvider(invalidProviderID);
            // expect(response.error).toBeDefined();
            // expect(response.errorCode).toBe('INVALID_INPUT');
            // Add more assertions if needed
        });
    });
});
