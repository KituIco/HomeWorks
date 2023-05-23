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

    describe('deleteCredentials', () => {
        it('Test with valid credentials ID', async () => {
            // Delete the credentials
            await credentialsRepo.deleteCredentials(credentialsID);

            // Verify that the credentials are no longer present in the database
            const deletedCredentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(deletedCredentials).not.toBeDefined();
        });

        it('Test with invalid credentials ID', async () => {
            const invalidCredentialsID = 'nonexistent_credentials_id';

            // Attempt to delete the credentials with an invalid credentials ID
            await expect(
                credentialsRepo.deleteCredentials(invalidCredentialsID)
            ).rejects.toThrow();

            // Verify that no records were deleted
            const credentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(credentials).toBeDefined();
        });

        it('Test with existing user ID', async () => {
            // Delete the credentials associated with a user ID that exists in the Credentials table
            await credentialsRepo.deleteCredentials(credentialsID);

            // Verify that the user's credentials are no longer present in the database
            const deletedCredentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(deletedCredentials).not.toBeDefined();

            // Perform additional checks to ensure the integrity of the foreign key constraint (e.g., verify the user still exists)
            // ...
        });
    });
});
