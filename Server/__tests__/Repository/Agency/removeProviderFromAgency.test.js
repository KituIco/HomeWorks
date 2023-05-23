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

    describe('removeProviderFromAgency', () => {
        it('removes a provider from the agency with a valid provider ID', async () => {
            // Select a valid provider ID from the agency's provider list
            const providerID = userIDs[0];

            // Execute the function
            await agencyRepo.removeProviderFromAgency(providerID);

            // Fetch the agency's provider list
            const agencyProviders = await agencyRepo.getAgencyProviders(
                agencyID
            );

            // Verify that the specified provider ID is no longer present in the agency's provider list
            expect(agencyProviders).not.toContain(providerID);
        });

        it('does not make any changes to the agency with an invalid provider ID', async () => {
            // Provide an invalid provider ID that does not exist in the agency's provider list
            const providerID = 'invalid-provider-id';

            // Execute the function
            await expect(
                agencyRepo.removeProviderFromAgency(providerID)
            ).rejects.toThrow();
        });

        it('handles missing provider ID gracefully', async () => {
            // Provide an empty value or null for the provider ID parameter
            const providerID = '';

            // Execute the function and expect it to throw an error or return an error response
            await agencyRepo.removeProviderFromAgency(providerID);

            // Fetch the agency's provider list
            const agencyProviders = await agencyRepo.getAgencyProviders(
                agencyID
            );

            // Verify '' or null is not present in the agency's provider list
            expect(agencyProviders).not.toContain(providerID);
        });
    });
});
