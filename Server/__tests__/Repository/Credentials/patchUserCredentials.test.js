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

    describe('patchUserCredentials', () => {
        it('Test with valid input', async () => {
            const newIdentifier = 'new-test-identifier';
            const newPassword = 'new-test-password';

            // Update the user's credentials
            await credentialsRepo.patchUserCredentials(
                userID,
                newIdentifier,
                newPassword
            );

            // Verify that the credentials are updated correctly in the database
            const updatedCredentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(updatedCredentials).toBeDefined();
            expect(updatedCredentials.identifier).toBe(newIdentifier);
        });

        it('Test with non-existent user ID', async () => {
            const nonExistentUserID = 'nonexistent_user_id';
            const identifier = 'test-identifier';
            const password = 'test-password';

            // Attempt to update the credentials with a non-existent user ID
            await expect(
                credentialsRepo.patchUserCredentials(
                    nonExistentUserID,
                    identifier,
                    password
                )
            ).rejects.toThrow();
        });

        it('Test with invalid identifier', async () => {
            const invalidIdentifier = 'invalid-email-address'.repeat(100);
            const password = 'test-password';

            // Attempt to update the credentials with an invalid identifier
            await expect(
                credentialsRepo.patchUserCredentials(
                    userID,
                    invalidIdentifier,
                    password
                )
            ).rejects.toThrow();
        });
    });
});
