const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = 'test-agency-id';

    beforeAll(async () => {
        // Create a new agencyRepo instance before every test.
        agencyRepo = new AgencyRepository(db);
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

    describe('createAgency', () => {
        it('handles valid input and creates an agency successfully', async () => {
            const agencyData = {
                agencyID: agencyID,
                agencyName: 'Test Agency',
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: 'path/to/agency-images',
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            let error;

            try {
                await agencyRepo.createAgency(
                    agencyData.agencyID,
                    agencyData.agencyName,
                    agencyData.agencyDesc,
                    agencyData.agencyDP,
                    agencyData.agencyImages,
                    agencyData.agencyServiceTypes,
                    agencyData.agencyRating
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeUndefined(); // Verify that no error is thrown or returned

            // Verify that the agency is created successfully in the database
            const agency = await agencyRepo.getAgencyByID(agencyData.agencyID);
            expect(agency).toBeDefined();
            expect(agency.agencyID).toBe(agencyData.agencyID);
            expect(agency.agencyName).toBe(agencyData.agencyName);
            expect(agency.agencyDesc).toBe(agencyData.agencyDesc);
            expect(agency.agencyDP).toBe(agencyData.agencyDP);
            expect(agency.agencyImages).toBe(agencyData.agencyImages);
            expect(agency.agencyServiceTypes).toBe(
                agencyData.agencyServiceTypes
            );
            expect(agency.agencyRating).toBe(agencyData.agencyRating);
        });

        it('handles invalid input and throws an appropriate error', async () => {
            const invalidAgencyData = {
                agencyID: '',
                agencyName: 'A'.repeat(129), // Exceeding the allowed name length
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: 'path/to/agency-images',
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            let error;

            try {
                await agencyRepo.createAgency(invalidAgencyData);
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });

        it('handles existing agency ID correctly', async () => {
            const agencyData = {
                agencyID: agencyID,
                agencyName: 'Test Agency',
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: 'path/to/agency-images',
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            // Create an agency with the same ID before running the test
            await agencyRepo.createAgency(
                agencyData.agencyID,
                'Existing Agency',
                'Existing agency description.',
                'path/to/agency-dp',
                'path/to/agency-images',
                'Existing Service Types',
                3.5
            );

            let error;

            try {
                await agencyRepo.createAgency(
                    agencyData.agencyID,
                    agencyData.agencyName,
                    agencyData.agencyDesc,
                    agencyData.agencyDP,
                    agencyData.agencyImages,
                    agencyData.agencyServiceTypes,
                    agencyData.agencyRating
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned

            // Verify that the existing agency remains unchanged
            const existingAgency = await agencyRepo.getAgencyByID(
                agencyData.agencyID
            );
            expect(existingAgency).toBeDefined();
            expect(existingAgency.agencyName).not.toBe(agencyData.agencyName);
            expect(existingAgency.agencyDesc).not.toBe(agencyData.agencyDesc);
            expect(existingAgency.agencyDP).toBe(agencyData.agencyDP);
            expect(existingAgency.agencyImages).toBe(agencyData.agencyImages);
            expect(existingAgency.agencyServiceTypes).not.toBe(
                agencyData.agencyServiceTypes
            );
            expect(existingAgency.agencyRating).not.toBe(
                agencyData.agencyRating
            );
        });

        it('handles missing or incomplete required fields correctly', async () => {
            const invalidAgencyData = {
                agencyName: '', // Empty agency name
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: '', // Empty agency images
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            let error;

            try {
                await agencyRepo.createAgency(
                    invalidAgencyData.agencyID,
                    invalidAgencyData.agencyName,
                    invalidAgencyData.agencyDesc,
                    invalidAgencyData.agencyDP,
                    invalidAgencyData.agencyImages,
                    invalidAgencyData.agencyServiceTypes,
                    invalidAgencyData.agencyRating
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });

        it('handles valid input and creates an agency successfully', async () => {
            const agencyData = {
                agencyID: agencyID,
                agencyName: 'Test Agency',
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: 'path/to/agency-images',
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            let error;

            try {
                await agencyRepo.createAgency(
                    agencyData.agencyID,
                    agencyData.agencyName,
                    agencyData.agencyDesc,
                    agencyData.agencyDP,
                    agencyData.agencyImages,
                    agencyData.agencyServiceTypes,
                    agencyData.agencyRating
                );
            } catch (err) {
                error = err;
            }

            expect(error).toBeUndefined(); // Verify that no error is thrown or returned

            // Verify that the agency is created successfully in the database
            const agency = await agencyRepo.getAgencyByID(agencyData.agencyID);
            expect(agency).toBeDefined();
            expect(agency.agencyID).toBe(agencyData.agencyID);
            expect(agency.agencyName).toBe(agencyData.agencyName);
            expect(agency.agencyDesc).toBe(agencyData.agencyDesc);
            expect(agency.agencyDP).toBe(agencyData.agencyDP);
            expect(agency.agencyImages).toBe(agencyData.agencyImages);
            expect(agency.agencyServiceTypes).toBe(
                agencyData.agencyServiceTypes
            );
            expect(agency.agencyRating).toBe(agencyData.agencyRating);
        });

        it('handles invalid input and throws an appropriate error', async () => {
            const invalidAgencyData = {
                agencyID: '',
                agencyName: 'A'.repeat(129), // Exceeding the allowed name length
                agencyDesc: 'This is a test agency.',
                agencyDP: 'path/to/agency-dp',
                agencyImages: 'path/to/agency-images',
                agencyServiceTypes: 'Service Type 1, Service Type 2',
                agencyRating: 4.5,
            };

            let error;

            try {
                await agencyRepo.createAgency(invalidAgencyData);
            } catch (err) {
                error = err;
            }

            expect(error).toBeDefined(); // Verify that an error is thrown or returned
        });
    });
});
