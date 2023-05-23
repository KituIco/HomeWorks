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

    describe('getCredentialsByIdentifier', () => {
        it('Test with an existing identifier', async () => {
            // Provide a valid identifier that exists in the Credentials table
            const existingIdentifier = 'test-identifier';

            // Retrieve the credentials using the getCredentialsByIdentifier function
            const credentials =
                await credentialsRepo.getCredentialsByIdentifier(
                    existingIdentifier
                );

            // Verify that the function retrieves the corresponding credentials correctly
            expect(credentials).toBeDefined();
            expect(credentials.credentialsID).toEqual(credentialsID);
            expect(credentials.userID).toEqual(userID);
            expect(credentials.identifier).toEqual(existingIdentifier);
        });

        it('Test with a non-existent identifier', async () => {
            // Provide an identifier that does not exist in the Credentials table
            const nonExistentIdentifier = 'non-existent-identifier';

            // Retrieve the credentials using the getCredentialsByIdentifier function
            const credentials =
                await credentialsRepo.getCredentialsByIdentifier(
                    nonExistentIdentifier
                );

            // Verify that the function returns an appropriate response, such as null or an empty result
            expect(credentials).not.toBeDefined();
        });

        it('Test with invalid input', async () => {
            // Pass invalid or incorrect values for the identifier parameter\
            const invalidIdentifier2 = 'a'.repeat(321); // Exceeds the maximum allowed limit (320 characters)
            await expect(
                credentialsRepo.getCredentialsByIdentifier(invalidIdentifier2)
            ).rejects.toThrow();
        });
    });
});
