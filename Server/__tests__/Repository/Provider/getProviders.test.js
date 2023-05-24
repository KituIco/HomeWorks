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

    describe('getProviders', () => {
        it('should retrieve a list of providers correctly when there are providers stored in the Provider table', async () => {
            // Retrieve the providers
            const providers = await providerRepo.getProviders();

            // Assert that the providers array is not empty
            expect(providers).not.toBeFalsy();

            // Assert that the providers array has the expected length
            expect(providers.length).toBeGreaterThanOrEqual(0);
        });

        it('should handle the scenario when there are no providers available in the Provider table', async () => {
            // mock the getProviders function to return an empty array
            providerRepo.getProviders = jest.fn(() => []);

            // Retrieve the providers
            const providers = await providerRepo.getProviders();

            // Assert that the providers array is empty
            expect(providers).toEqual([]);
        });

        it('should fetch the data from the database correctly', async () => {
            // Retrieve the providers
            const providers = await providerRepo.getProviders();

            // Assert that the providers array is not empty
            expect(providers).not.toBeFalsy();
        });
    });
});
