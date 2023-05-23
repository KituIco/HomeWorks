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

    beforeEach(async () => {});

    afterEach(async () => {
        // Delete the credentials
        await credentialsRepo.deleteCredentials(credentialsID);
    });

    afterAll(async () => {
        // Delete the user
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('createCredentials', () => {
        it('Test with valid input', async () => {
            const identifier = 'test@example.com';
            const password = 'password123';

            // Create credentials with valid values for all parameters
            await credentialsRepo.createCredentials(
                credentialsID,
                userID,
                identifier,
                password
            );

            // Verify that the credentials are created successfully in the database
            const createdCredentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(createdCredentials).toBeDefined();
            expect(createdCredentials.userID).toBe(userID);
            expect(createdCredentials.identifier).toBe(identifier);
        });

        it('Test with invalid input', async () => {
            const invalidUserID = 'nonexistent_user_id';
            const invalidIdentifier = 'invalid_email';
            const invalidPassword = 'short';

            // Attempt to create credentials with invalid values for some parameters
            await expect(
                credentialsRepo.createCredentials(
                    credentialsID,
                    invalidUserID,
                    invalidIdentifier,
                    invalidPassword
                )
            ).rejects.toThrow();

            // Verify that no credentials were created
            const credentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(credentials).not.toBeDefined();
        });

        it('Test with existing credentials ID', async () => {
            // Create initial credentials with the same credentials ID
            const initialIdentifier = 'initial@example.com';
            const initialPassword = 'initialpassword';
            await credentialsRepo.createCredentials(
                credentialsID,
                userID,
                initialIdentifier,
                initialPassword
            );

            // Update the credentials with new values
            const newIdentifier = 'updated@example.com';
            const newPassword = 'updatedpassword';
            await expect(
                credentialsRepo.createCredentials(
                    credentialsID,
                    userID,
                    newIdentifier,
                    newPassword
                )
            ).rejects.toThrow();
        });

        it('Test with missing or incomplete required fields', async () => {
            const incompleteIdentifier = 'test@example.com';

            // Attempt to create credentials with missing or empty values for some parameters
            await expect(
                credentialsRepo.createCredentials(
                    credentialsID,
                    userID,
                    incompleteIdentifier,
                    null
                )
            ).rejects.toThrow();

            // Verify that no credentials were created
            const credentials = await credentialsRepo.getCredentialsByID(
                credentialsID
            );
            expect(credentials).not.toBeDefined();
        });
    });
});
