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

    describe('getUserCredentials', () => {
        it('Test with a valid user ID', async () => {
            // Get the user credentials
            const userCredentials = await credentialsRepo.getUserCredentials(
                userID
            );

            // Verify that the function retrieves the user credentials without throwing an error
            expect(userCredentials).toBeDefined();

            // check if userID in user credentials are correct
            userCredentials.forEach((userCredential) => {
                expect(userCredential.userID).toBe(userID);
            });
        });

        it('Test with an invalid user ID', async () => {
            const invalidUserID = 'nonexistent_user_id';

            // Attempt to get user credentials with an invalid user ID
            await expect(
                credentialsRepo.getUserCredentials(invalidUserID)
            ).rejects.toThrow();

            // Verify that an error is thrown or an appropriate error response is returned
            // You can customize this expectation based on the actual behavior of your code
        });

        it('Test with missing user credentials', async () => {
            // Delete the credentials associated with the user
            await credentialsRepo.deleteCredentials(credentialsID);

            // Get the user credentials
            const userCredentials = await credentialsRepo.getUserCredentials(
                userID
            );

            // Verify that the function handles the scenario correctly
            userCredentials.forEach((userCredential) => {
                expect(userCredential.credentialsID).not.toBe(credentialsID);
            });
        });
    });
});
