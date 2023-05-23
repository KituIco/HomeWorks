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
                agencyID,
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

    describe('getAgencyProviders', () => {
        it('handles a valid agency ID', async () => {
            // Execute the function
            const result = await agencyRepo.getAgencyProviders(agencyID);

            // Verify that the function executes without throwing an error
            expect(result).toBeDefined();

            // Verify that the result is an array of agency providers
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(10); // Number of providers created in beforeEach
        });

        it('handles an invalid agency ID', async () => {
            // Execute the function with an invalid agency ID
            const invalidAgencyID = 'invalid-agency-id';

            // Verify that the function throws an error or returns an error response
            await expect(
                agencyRepo.getAgencyProviders(invalidAgencyID)
            ).rejects.toThrow();
        });

        it('handles an agency ID with no providers', async () => {
            // Create an agency with no associated providers
            const emptyAgencyID = nanoid(10);

            await agencyRepo.createAgency(
                emptyAgencyID,
                'Empty Agency',
                'This agency has no providers.',
                null,
                null,
                null,
                null
            );

            // Execute the function with the agency ID
            const result = await agencyRepo.getAgencyProviders(emptyAgencyID);

            // Verify that the function returns an empty array
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(0);
        });
    });
});
