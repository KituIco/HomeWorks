const CredentialsRepository = require('../../../repositiories/credentials-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('CredentialsRepository', () => {
    let credentialsRepo;
    let userRepo;
    let userID = nanoid(10);
    let credentialsID = nanoid(10);

    beforeAll(async () => {
        // Create a new credentialsRepo instance before every test.
        credentialsRepo = new CredentialsRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
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

    describe('getCredentialsByID', () => {
        test('Test with a valid credentials ID', async () => {
            // Retrieve the credentials by ID
            const credentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );

            // Verify that the function retrieves the corresponding credentials correctly
            expect(credentials).toBeDefined();
            expect(credentials.credentialsID).toBe(credentialsID);
            expect(credentials.userID).toBe(userID);
            expect(credentials.identifier).toBe('test-identifier');
        });

        test('Test with an invalid credentials ID', async () => {
            const invalidCredentialsID = 'nonexistent_credentials_id';

            // Retrieve the credentials by an invalid credentials ID
            await expect(
                credentialsRepo.getCredentialsByID(invalidCredentialsID)
            ).rejects.toThrow();
        });

        test('Test with a valid credentials ID and existing user', async () => {
            // Create additional credentials associated with an existing user
            // ...

            // Retrieve the credentials by ID
            const credentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );

            // Verify that the function retrieves the credentials associated with the given credentials ID correctly
            expect(credentials).toBeDefined();
            expect(credentials.credentialsID).toBe(credentialsID);
            expect(credentials.userID).toBe(userID);
            expect(credentials.identifier).toBe('test-identifier');

            // Perform additional verification for the associated user
            // ...
        });
    });
});
