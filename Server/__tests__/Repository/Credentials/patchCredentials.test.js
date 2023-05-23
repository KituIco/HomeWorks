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

    describe('patchCredentials', () => {
        it('Test with valid input', async () => {
            // Define the updated values for the credentials
            const updatedIdentifier = 'updated-identifier';
            const updatedPassword = 'updated-password';

            // Patch the credentials with valid values
            await credentialsRepo.patchCredentials(
                credentialsID,
                userID,
                updatedIdentifier,
                updatedPassword
            );

            // Retrieve the patched credentials from the database
            const patchedCredentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(patchedCredentials).toBeDefined();
            expect(patchedCredentials.identifier).toBe(updatedIdentifier);
        });

        it('Test with invalid input', async () => {
            const invalidCredentialsID = 'nonexistent_credentials_id';
            const invalidUserID = 'nonexistent_user_id';

            // Attempt to patch the credentials with invalid input
            await expect(
                credentialsRepo.patchCredentials(
                    invalidCredentialsID,
                    invalidUserID,
                    'updated-identifier',
                    'updated-password'
                )
            ).rejects.toThrow();

            // Retrieve the original credentials from the database
            const originalCredentials =
                await credentialsRepo.getCredentialsByID(credentialsID);
            expect(originalCredentials).toBeDefined();
        });

        it('Test with missing or incomplete required fields', async () => {
            // Attempt to patch the credentials with missing or empty values for required fields
            await expect(
                credentialsRepo.patchCredentials(
                    credentialsID,
                    userID,
                    null,
                    null
                )
            );

            // Retrieve the original credentials from the database
            const originalCredentials =
                await credentialsRepo.getCredentialsByID(credentialsID);
            expect(originalCredentials).toBeDefined();
            expect(originalCredentials.identifier).toBe('test-identifier');
        });
    });
});
