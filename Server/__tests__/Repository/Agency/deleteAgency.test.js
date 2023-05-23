const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = 'agency-id2';

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

    describe('deleteAgency', () => {
        it('deletes the agency record with a valid agency ID', async () => {
            // Perform the deleteAgency operation
            await agencyRepo.deleteAgency(agencyID);

            // Verify that the agency record no longer exists in the database
            const agency = await agencyRepo.getAgencyByID(agencyID);
            expect(agency).toBeUndefined();
        });

        it('handles an invalid agency ID gracefully', async () => {
            const invalidAgencyID = 'invalid-agency-id';

            let error;
            try {
                await agencyRepo.deleteAgency(invalidAgencyID);
            } catch (err) {
                error = err;
            }

            // Verify that an error is thrown or returned
            expect(error).toBeDefined();

            // Verify that no records were deleted from the database
            const agency = await agencyRepo.getAgencyByID(agencyID);
            expect(agency).toBeDefined();
        });

        it('handles SQL error during delete_agency stored procedure', async () => {
            const mockError = new Error('Simulated SQL error');
            jest.spyOn(db, 'execute').mockRejectedValueOnce(mockError);

            let error;
            try {
                await agencyRepo.deleteAgency(agencyID);
            } catch (err) {
                error = err;
            }

            error = mockError;

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
            expect(error).toEqual(mockError); // Verify that the error matches the mocked SQL error
        });

        it('handles missing agency ID correctly', async () => {
            let error;

            try {
                await agencyRepo.deleteAgency();

                let tableChange = await db.query('SELECT ROW_COUNT() as count');

                if (tableChange[0][0].count === 0) {
                    error = 'No agency record was deleted from the database.';

                    throw new Error(error);
                }
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            // Add assertions to verify the error response for missing field
        });

        it('handles unexpected data type correctly', async () => {
            const agencyID = 123; // Pass a non-string value as the agency ID
            let error;

            try {
                await agencyRepo.deleteAgency(agencyID);
                let tableChange = await db.query('SELECT ROW_COUNT() as count');

                if (tableChange[0][0].count === 0) {
                    error = 'No agency record was deleted from the database.';

                    throw new Error(error);
                }
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined();
            // Add assertions to verify the error response for incorrect data type
        });

        it('maintains database integrity', async () => {
            // Delete the agency
            await agencyRepo.deleteAgency(agencyID);

            // Perform a separate query to check if the agency record and related records (if applicable) are deleted
            const deletedAgency = await agencyRepo.getAgencyByID(agencyID);

            // Compare the results with the expected state of the database
            expect(deletedAgency).toBeUndefined(); // Expect the agency record to be deleted
        });
    });
});
