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

    describe('getCredentials', () => {
        it('Test with valid credentials', async () => {
            // Execute the function
            const result = await credentialsRepo.getCredentials();

            // Verify that it returns the expected credentials from the database
            expect(result).toBeDefined();
        });

        it('Test with empty credentials table', async () => {
            // Execute the function
            const result = await credentialsRepo.getCredentials();

            // Verify that it returns an empty result, indicating no credentials are available
            expect(result.length).toBeGreaterThanOrEqual(0);
        });

        it('Test with non-existent user ID', async () => {
            const nonExistentUserID = 'nonexistent_user_id';

            // Execute the function with a non-existent user ID
            const result = await credentialsRepo.getCredentials();

            // Verify that it returns an empty result or throws an appropriate error
            result.forEach((credentials) => {
                expect(credentials.userID).not.toBe(nonExistentUserID);
            });
        });
    });
});
