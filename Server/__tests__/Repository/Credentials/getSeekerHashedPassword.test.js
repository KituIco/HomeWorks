const CredentialsRepository = require('../../../repositiories/credentials-repo');
const UserRepository = require('../../../repositiories/user-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('CredentialsRepository', () => {
    let credentialsRepo;
    let userRepo;
    let seekerRepo;
    let userID = nanoid(10);
    let credentialsID = nanoid(10);

    beforeAll(async () => {
        // Create a new credentialsRepo instance before every test.
        credentialsRepo = new CredentialsRepository(db);
        userRepo = new UserRepository(db);
        seekerRepo = new SeekerRepository(db);

        // create a new user
        await userRepo.createUser(userID);

        // create a new seeker
        await seekerRepo.createSeeker(userID, 'John', 'Doe', null, null, null);
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

    describe('getSeekerHashedPassword', () => {
        it('Test with valid identifier', async () => {
            const identifier = 'test-identifier';
            const expectedHashedPassword = 'test-password';

            // Retrieve the hashed password
            const hashedPassword =
                await credentialsRepo.getSeekerHashedPassword(identifier);

            // Verify that the returned hashed password matches the expected value
            expect(hashedPassword.hashedPassword).toEqual(
                expectedHashedPassword
            );
        });

        it('Test with invalid identifier', async () => {
            const invalidIdentifier = 'nonexistent-identifier';

            // Attempt to retrieve the hashed password with an invalid identifier
            const hashedPassword =
                await credentialsRepo.getSeekerHashedPassword(
                    invalidIdentifier
                );

            // Verify that the hashed password is null (indicating identifier not found)
            expect(hashedPassword).not.toBeDefined();
        });

        it('Test with missing credentials', async () => {
            // Remove the credentials associated with the provided identifier
            await credentialsRepo.deleteCredentials(credentialsID);

            // Attempt to retrieve the hashed password for the missing credentials
            const hashedPassword =
                await credentialsRepo.getSeekerHashedPassword(
                    'test-identifier'
                );

            // Verify that the function handles this scenario and either returns null or throws an error indicating the missing credentials
            expect(hashedPassword).not.toBeDefined();
        });
    });
});
