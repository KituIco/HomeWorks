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

    describe('searchProviderInAgency', () => {
        it('Test with valid input: Provide valid values for agencyID and searchQuery parameters', async () => {
            const searchQuery = 'John';

            const result = await agencyRepo.searchProviderInAgency(
                agencyID,
                searchQuery
            );

            let providers = await agencyRepo.getAgencyProviders(agencyID);

            expect(result).toBeDefined();
            expect(result.length).toBe(10);
        });

        it('Test with invalid agency ID: Pass a non-existent agency ID as the agencyID parameter', async () => {
            const nonExistentAgencyID = 'non-existent-agency-id';
            const searchQuery = 'John';

            await expect(
                agencyRepo.searchProviderInAgency(
                    nonExistentAgencyID,
                    searchQuery
                )
            ).rejects.toThrow();
        });

        it('Test with empty search query: Provide an empty string as the searchQuery parameter', async () => {
            const searchQuery = null;

            const result = await agencyRepo.searchProviderInAgency(
                agencyID,
                searchQuery
            );

            expect(result).toBeDefined();
            expect(result.length).toBe(0);
        });
    });
});
