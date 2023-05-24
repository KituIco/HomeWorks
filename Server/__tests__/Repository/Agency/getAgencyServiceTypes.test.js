const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID;

    beforeAll(async () => {
        // Create a new agencyRepo instance before every test.
        agencyRepo = new AgencyRepository(db);
    });

    beforeEach(async () => {
        // Create a new agency and store the agencyID
        agencyID = nanoid(10);

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
    });

    afterEach(async () => {
        // Delete the created agency
        await agencyRepo.deleteAgency(agencyID);
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await db.end();
    });

    describe('getAgencyServiceTypes', () => {
        it('handles a valid agency ID and returns the expected result', async () => {
            // Execute the function with a valid agency ID
            const result = await agencyRepo.getAgencyServiceTypes(agencyID);

            // Verify that the function executes without throwing an error and returns the expected result
            expect(result.agencyServiceTypes).toBe(
                'Service Type 1, Service Type 2'
            );
        });

        it('handles an invalid agency ID and throws an appropriate error or returns an error response', async () => {
            // Provide an invalid agency ID, such as a non-existent ID or an ID of a different data type
            const invalidAgencyID = 'asdasdasdasdinvalid-id';

            // Execute the function with an invalid agency ID and verify that it throws an error or returns an error response
            await expect(
                agencyRepo.getAgencyServiceTypes(invalidAgencyID)
            ).rejects.toThrow();
        });

        it('handles an agency ID with no service types and returns null or an empty result', async () => {
            // Create an agency with no associated service types
            const newAgencyID = nanoid(10);
            await agencyRepo.createAgency(
                newAgencyID,
                'Test Agency',
                'This is a test agency.',
                'path/to/agency-dp',
                'path/to/agency-images',
                null, // Set agencyServiceTypes to null
                4.5
            );

            // Execute the function with the agency ID
            const result = await agencyRepo.getAgencyServiceTypes(newAgencyID);

            // Verify that the function returns null or an empty result for an agency with no service types
            expect(result.agencyServiceTypes).toBeNull();

            // Delete the agency
            await agencyRepo.deleteAgency(newAgencyID);
        });
    });
});
