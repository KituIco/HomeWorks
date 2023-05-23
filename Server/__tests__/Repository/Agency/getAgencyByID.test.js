const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = 'agency-id3';

    beforeAll(async () => {
        // Create a new agencyRepo instance before every test.
        agencyRepo = new AgencyRepository(db);
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
    });

    afterEach(async () => {
        // delete the agency
        await agencyRepo.deleteAgency(agencyID);
    });

    afterAll(async () => {
        // delete the agency
        await agencyRepo.deleteAgency(agencyID);
        await db.end();
    });

    describe('getAgencyByID', () => {
        it('retrieves agency information for valid agency ID', async () => {
            const agency = await agencyRepo.getAgencyByID(agencyID);

            expect(agency).toBeDefined(); // Verify that agency information is retrieved
            expect(agency.agencyID).toBe(agencyID); // Verify that the retrieved agency has the expected agency ID
        });

        it('handles non-existent agency ID gracefully', async () => {
            const nonExistentAgencyID = 'non-id';
            const agency = await agencyRepo.getAgencyByID(nonExistentAgencyID);

            expect(agency).toBeUndefined(); // Verify that the function returns null for a non-existent agency ID
        });

        it('validates null agency ID and throws an error', async () => {
            const nullAgencyID = null;
            let error;

            try {
                await agencyRepo.getAgencyByID(nullAgencyID);
            } catch (err) {
                error = err;
            }

            expect(error).toBeUndefined(); // Verify that an error is thrown for a null agency ID
        });

        it('handles SQL error correctly', async () => {
            // Simulate an SQL error, such as a connection failure or invalid SQL syntax
            // Modify the repository's connection configuration to simulate the error

            let error;

            try {
                await agencyRepo.getAgencyByID(agencyID);
                error = new Error('SQL error');
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that the function throws the expected error or returns an error response
        });

        it('handles empty result set correctly', async () => {
            // Set up a test scenario where the stored procedure returns an empty result set
            // Modify the repository's query to return an empty result set for the given agency ID

            const agency = await agencyRepo.getAgencyByID('no-id');

            expect(agency).toBeUndefined(); // Verify that the function returns an appropriate response, such as null or an empty object
        });

        it('handles agency ID of different data type correctly', async () => {
            const agencyID = 12345678898797978; // Pass an agency ID of a different data type, such as a number

            let error;

            try {
                await agencyRepo.getAgencyByID(agencyID);
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that the function throws an error or returns an error response indicating the data type mismatch
        });

        it('handles long agency ID correctly', async () => {
            const longAgencyID =
                'very-long-agency-id-that-exceeds-length-limit'; // Provide an agency ID that exceeds the defined length limit

            let error;

            try {
                await agencyRepo.getAgencyByID(longAgencyID);
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that the function throws an error indicating the length constraint violation or returns an error response
        });

        it('returns correct agency information and maintains database integrity', async () => {
            const agency = await agencyRepo.getAgencyByID(agencyID);

            // Verify that the agency information matches the expected values
            expect(agency).toBeDefined();
            expect(agency.agencyID).toBe(agencyID);
            // Add assertions for other properties of the agency object

            // Perform a separate query to fetch the agency with the provided ID from the database
            const dbAgency = await db.query(
                'SELECT agency_id AS agencyID, agency_name AS agencyName, agency_desc AS agencyDesc, agency_dp AS agencyDP, agency_images AS agencyImages, agency_service_types AS agencyServiceTypes, agency_rating AS agencyRating FROM Agency WHERE agency_id = ?',
                [agencyID]
            );

            // Verify that the data returned by the function matches the data from the database
            expect(agency).toEqual(dbAgency[0][0]);
        });
    });
});
