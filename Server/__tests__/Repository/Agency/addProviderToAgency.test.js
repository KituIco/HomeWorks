const AgencyRepository = require('../../../repositiories/agency-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
var { nanoid } = require('nanoid');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = nanoid(10);
    let userIDs = new Array();

    beforeAll(async () => {
        // Create a new agencyRepo instance before every test.
        agencyRepo = new AgencyRepository(db);
        providerRepo = new ProviderRepository(db);
        userRepo = new UserRepository(db);
    });

    beforeEach(async () => {
        // create a new agency
        const agencyName = 'Test Agency';
        const agencyDesc = 'This is a test agency.';
        const agencyDP = 'path/to/agency-dp';
        const agencyImages = 'path/to/agency-images';
        const agencyServiceTypes = 'Service Type 1, Service Type 2';
        const agencyRating = 4.5;

        await agencyRepo.createAgency(
            agencyID,
            agencyName,
            agencyDesc,
            agencyDP,
            agencyImages,
            agencyServiceTypes,
            agencyRating
        );

        // Create 10 users and 10 providers in the database
        for (let i = 0; i < 10; i++) {
            const userID = nanoid(10);

            // create a new user
            await userRepo.createUser(userID);

            // create a new provider
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
                null
            );

            userIDs.push(userID);
        }
    });

    afterEach(async () => {
        // delete the agency
        await agencyRepo.deleteAgency(agencyID);

        // delete the users
        userIDs.forEach(async (userID) => {
            await userRepo.deleteUser(userID);
        });
    });

    afterAll(async () => {
        // delete the agency
        await agencyRepo.deleteAgency(agencyID);
        await db.end();
    });

    describe('addProviderToAgency', () => {
        it('adds provider to agency with valid input', async () => {
            // Choose a random provider and user ID
            const randomIndex = Math.floor(Math.random() * userIDs.length);
            const providerID = userIDs[randomIndex];

            // Execute the function
            await agencyRepo.addProviderToAgency(agencyID, providerID);

            // Get the updated provider details
            const updatedProvider = await providerRepo.getProvider(providerID);

            // Verify that the provider has been successfully added to the agency
            expect(updatedProvider.agencyID).toBe(agencyID);
        });

        it('handles invalid input gracefully', async () => {
            const nonExistentAgencyID = 'non-existent-agency';
            const nonExistentProviderID = 'non-existent-provider';

            // Execute the function with non-existent agency and provider IDs
            await expect(
                agencyRepo.addProviderToAgency(
                    nonExistentAgencyID,
                    nonExistentProviderID
                )
            ).rejects.toThrow();

            // Verify that the function throws an appropriate error or returns an error response
            // You can customize this expectation based on your implementation
        });

        it('handles missing parameters gracefully', async () => {
            // Omit the agencyID parameter
            await expect(
                agencyRepo.addProviderToAgency(
                    'aaaaaaaaaaaaaaaaaaa',
                    'provider-id'
                )
            ).rejects.toThrow();

            // Omit the providerID parameter
            await expect(
                agencyRepo.addProviderToAgency(
                    'agency-id',
                    'aaaaaaaaaaaaaaaaaaaa'
                )
            ).rejects.toThrow();

            // Omit both agencyID and providerID parameters
            await expect(
                agencyRepo.addProviderToAgency(
                    'aaaaaaaaaaaaaaaaaaaa',
                    'aaaaaaaaaaaaaaaaaaaa'
                )
            ).rejects.toThrow();

            // Verify that the function validates the input and throws an error or returns an error response indicating the missing fields
            // You can customize this expectation based on your implementation
        });
    });
});
