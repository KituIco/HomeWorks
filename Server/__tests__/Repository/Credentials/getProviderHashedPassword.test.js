const CredentialsRepository = require('../../../repositiories/credentials-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('CredentialsRepository', () => {
    let credentialsRepo;
    let userRepo;
    let providerRepo;
    let userID = nanoid(10);
    let credentialsID = nanoid(10);

    beforeAll(async () => {
        // Create a new credentialsRepo instance before every test.
        credentialsRepo = new CredentialsRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);

        // create a new user
        await userRepo.createUser(userID);

        // create a new seeker
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
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new credentials
        const newCredentials = {
            credentialsID: credentialsID,
            userID: userID,
            identifier: 'test-identifier',
            password: 'test-password',
        };

        await credentialsRepo.createCredentials(
            newCredentials.credentialsID,
            newCredentials.userID,
            newCredentials.identifier,
            newCredentials.password
        );
    });

    afterEach(async () => {
        // Delete the credentials
        await credentialsRepo.deleteCredentials(credentialsID);
    });

    afterAll(async () => {
        // Delete the user
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getProviderHashedPassword', () => {
        it('Test with valid identifier', async () => {
            const validIdentifier = 'test-identifier';

            // Retrieve the hashed password associated with the given identifier
            const hashedPassword =
                await credentialsRepo.getProviderHashedPassword(
                    validIdentifier
                );

            // Verify that the function returns the hashed password
            expect(hashedPassword).toBeDefined();
            expect(typeof hashedPassword.hashedPassword).toBe('string');
        });

        it('Test with non-existent identifier', async () => {
            const nonExistentIdentifier = 'non-existent-identifier';

            // Retrieve the hashed password for a non-existent identifier
            const hashedPassword =
                await credentialsRepo.getProviderHashedPassword(
                    nonExistentIdentifier
                );

            // Verify that the function returns null or an appropriate response indicating that the identifier was not found
            expect(hashedPassword).not.toBeDefined();
        });

        it('Test with empty identifier', async () => {
            const emptyIdentifier = '';

            // Attempt to retrieve the hashed password with an empty identifier
            const hashedPassword =
                await credentialsRepo.getProviderHashedPassword(
                    emptyIdentifier
                );

            expect(hashedPassword).not.toBeDefined();

            // Verify that the function throws an error or returns an error response indicating the missing identifier
            // ...
        });
    });
});
