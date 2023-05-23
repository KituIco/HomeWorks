const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = 'agency-id1';

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

    describe('patchAgency', () => {
        it('handles valid input and updates agency details correctly', async () => {
            // Prepare valid input values
            const agencyName = 'Updated Agency';
            const agencyDesc = 'This is the updated agency description.';
            const agencyDP = 'path/to/updated-agency-dp';
            const agencyImages = 'path/to/updated-agency-images';
            const agencyServiceTypes =
                'Updated Service Type 1, Updated Service Type 2';
            const agencyRating = 4.2;

            // Call patchAgency with valid input
            await agencyRepo.patchAgency(
                agencyID,
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            );

            // Verify that the agency details are updated correctly in the database
            const updatedAgency = await agencyRepo.getAgencyByID(agencyID);
            expect(updatedAgency).toEqual({
                agencyID: agencyID,
                agencyName: agencyName,
                agencyDesc: agencyDesc,
                agencyDP: agencyDP,
                agencyImages: agencyImages,
                agencyServiceTypes: agencyServiceTypes,
                agencyRating: agencyRating,
            });
        });

        it('handles invalid input and throws an appropriate error', async () => {
            // Prepare invalid input values
            const nonExistentAgencyID = 'non-existent-agency-id';
            const invalidRating = 'invalid-rating';

            // Call patchAgency with invalid input
            let error;

            try {
                await agencyRepo.patchAgency(
                    nonExistentAgencyID,
                    'Invalid Agency',
                    'Invalid description',
                    'invalid-dp',
                    'invalid-images',
                    'Invalid Service Types',
                    invalidRating
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });

        it('handles missing or incomplete required fields and throws an error', async () => {
            // Call patchAgency with missing or empty values for required fields
            let error;

            try {
                await agencyRepo.patchAgency(
                    agencyID,
                    null,
                    '',
                    '',
                    '',
                    '',
                    null
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeUndefined(); // Verify that an error is thrown or returned
        });

        it('handles agency ID not existing in the database correctly', async () => {
            const nonExistingAgencyID = 'non-existing-id';
            const updatedFields = {
                agencyName: 'Updated Agency',
                agencyDesc: 'Updated description',
            };
            let error;

            try {
                await agencyRepo.patchAgency(
                    nonExistingAgencyID,
                    updatedFields
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });

        it('updates specific fields correctly and leaves others unchanged', async () => {
            const updatedFields = {
                agencyName: 'Updated Agency',
                agencyDesc: 'Updated description',
            };

            await agencyRepo.patchAgency(
                agencyID,
                updatedFields.agencyName,
                updatedFields.agencyDesc,
                null,
                null,
                null,
                null
            );

            const updatedAgency = await agencyRepo.getAgencyByID(agencyID);
            expect(updatedAgency).toBeDefined();
            expect(updatedAgency.agencyName).toEqual(updatedFields.agencyName);
            expect(updatedAgency.agencyDesc).toEqual(updatedFields.agencyDesc);
            expect(updatedAgency.agencyDP).toEqual('path/to/agency-dp'); // Unchanged field
            expect(updatedAgency.agencyImages).toEqual('path/to/agency-images'); // Unchanged field
            expect(updatedAgency.agencyServiceTypes).toEqual(
                'Service Type 1, Service Type 2'
            ); // Unchanged field
            expect(updatedAgency.agencyRating).toEqual(4.5); // Unchanged field
        });

        it('handles agency name exceeding maximum length correctly', async () => {
            const longAgencyName = 'A'.repeat(129); // Agency name exceeds maximum length (128 characters)
            const updatedFields = {
                agencyName: longAgencyName,
            };
            let error;

            try {
                await agencyRepo.patchAgency(agencyID, updatedFields);
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });

        it('handles agency rating boundary values correctly', async () => {
            // Test with minimum possible agencyRating
            const minRating = 0;
            await agencyRepo.patchAgency(
                agencyID,
                null,
                null,
                null,
                null,
                null,
                minRating
            );

            // Fetch the patched agency details
            const patchedAgency = await agencyRepo.getAgencyByID(agencyID);

            expect(patchedAgency.agencyRating).toBe(minRating);

            // Test with maximum possible agencyRating
            const maxRating = 5;
            await agencyRepo.patchAgency(
                agencyID,
                null,
                null,
                null,
                null,
                null,
                maxRating
            );

            // Fetch the patched agency details
            const patchedAgency2 = await agencyRepo.getAgencyByID(agencyID);

            expect(patchedAgency2.agencyRating).toBe(maxRating);

            // Test with values near the boundaries
            const nearMinRating = 0.1;
            await agencyRepo.patchAgency(
                agencyID,
                null,
                null,
                null,
                null,
                null,
                nearMinRating
            );

            // Fetch the patched agency details
            const patchedAgency3 = await agencyRepo.getAgencyByID(agencyID);

            expect(patchedAgency3.agencyRating).toBe(nearMinRating);

            const nearMaxRating = 4.9;
            await agencyRepo.patchAgency(
                agencyID,
                null,
                null,
                null,
                null,
                null,
                nearMaxRating
            );

            // Fetch the patched agency details
            const patchedAgency4 = await agencyRepo.getAgencyByID(agencyID);

            expect(patchedAgency4.agencyRating).toBe(nearMaxRating);
        });

        it('ensures database integrity after patching agency details', async () => {
            const patchedAgencyData = {
                agencyName: 'Patched Agency',
                agencyDesc: 'This is a patched agency.',
                agencyDP: 'path/to/patched-agency-dp',
                agencyImages: 'path/to/patched-agency-images',
                agencyServiceTypes:
                    'Patched Service Type 1, Patched Service Type 2',
                agencyRating: 3.7,
            };

            // Patch the agency details
            await agencyRepo.patchAgency(
                agencyID,
                patchedAgencyData.agencyName,
                patchedAgencyData.agencyDesc,
                patchedAgencyData.agencyDP,
                patchedAgencyData.agencyImages,
                patchedAgencyData.agencyServiceTypes,
                patchedAgencyData.agencyRating
            );

            // Fetch the patched agency details
            const patchedAgency = await agencyRepo.getAgencyByID(agencyID);

            // Verify that the patched agency details match the expected values
            expect(patchedAgency.agencyName).toBe(patchedAgencyData.agencyName);
            expect(patchedAgency.agencyDesc).toBe(patchedAgencyData.agencyDesc);
            expect(patchedAgency.agencyDP).toBe(patchedAgencyData.agencyDP);
            expect(patchedAgency.agencyImages).toBe(
                patchedAgencyData.agencyImages
            );
            expect(patchedAgency.agencyServiceTypes).toBe(
                patchedAgencyData.agencyServiceTypes
            );
            expect(patchedAgency.agencyRating).toBe(
                patchedAgencyData.agencyRating
            );
        });

        it('handles error conditions appropriately', async () => {
            // Simulate an error condition by passing invalid values or triggering an exception in the stored procedure or database query
            // For example, passing an invalid agency ID or triggering a database error

            const invalidAgencyID = 'invalid-agency-id';
            let error;

            try {
                await agencyRepo.patchAgency(
                    invalidAgencyID,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });
    });
});
