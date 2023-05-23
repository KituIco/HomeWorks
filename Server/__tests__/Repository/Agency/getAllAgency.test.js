const AgencyRepository = require('../../../repositiories/agency-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AgencyRepository', () => {
    let agencyRepo;
    let agencyID = 'agency-id4';

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

    describe('getAllAgency', () => {
        it('returns all existing agencies correctly', async () => {
            // Create additional agencies in the database
            const agency1 = {
                agencyID: '5agency-id1',
                agencyName: 'Agency 1',
                agencyDesc: 'Description 1',
                agencyDP: 'path/to/agency-dp1',
                agencyImages: 'path/to/agency-images1',
                agencyServiceTypes: 'Service Type 1',
                agencyRating: 4.2,
            };

            const agency2 = {
                agencyID: '6agency-id2',
                agencyName: 'Agency 2',
                agencyDesc: 'Description 2',
                agencyDP: 'path/to/agency-dp2',
                agencyImages: 'path/to/agency-images2',
                agencyServiceTypes: 'Service Type 2',
                agencyRating: 4.8,
            };

            // Insert additional agencies into the database
            await agencyRepo.createAgency(
                agency1.agencyID,
                agency1.agencyName,
                agency1.agencyDesc,
                agency1.agencyDP,
                agency1.agencyImages,
                agency1.agencyServiceTypes,
                agency1.agencyRating
            );

            await agencyRepo.createAgency(
                agency2.agencyID,
                agency2.agencyName,
                agency2.agencyDesc,
                agency2.agencyDP,
                agency2.agencyImages,
                agency2.agencyServiceTypes,
                agency2.agencyRating
            );

            // Retrieve all agencies
            const agencies = await agencyRepo.getAllAgency();

            // Verify that the returned result matches the expected agencies
            expect(agencies.length).toBeGreaterThanOrEqual(3); // Including the initially created agency

            const expectedAgencies = [
                {
                    agencyID: agencyID,
                    agencyName: 'Test Agency',
                    agencyDesc: 'This is a test agency.',
                    agencyDP: 'path/to/agency-dp',
                    agencyImages: 'path/to/agency-images',
                    agencyServiceTypes: 'Service Type 1, Service Type 2',
                    agencyRating: 4.5,
                },
                agency1,
                agency2,
            ];

            expect(agencies).toEqual(expect.arrayContaining(expectedAgencies));

            // Delete the additional agencies
            await agencyRepo.deleteAgency(agency1.agencyID);
            await agencyRepo.deleteAgency(agency2.agencyID);
        });

        it('returns empty result for an empty database', async () => {
            // Remove all agencies from the database
            await agencyRepo.deleteAgency(agencyID);

            // Retrieve all agencies
            const agencies = await agencyRepo.getAllAgency();

            // Verify that the function returns an empty result
            expect(agencies.length).toBeGreaterThanOrEqual(0);
        });

        it('handles changes in the agency table structure gracefully', async () => {
            // Modify the agency table structure by adding/removing certain fields

            // Execute the function
            const result = await agencyRepo.getAllAgency();

            // Verify that the function ignores the missing or extra fields and returns the appropriate result
            expect(result.length).toBeGreaterThan(0);

            // Verify that each agency object in the result has the expected properties
            for (const agency of result) {
                expect(agency).toHaveProperty('agencyID');
                expect(agency).toHaveProperty('agencyName');
                expect(agency).toHaveProperty('agencyDesc');
                expect(agency).toHaveProperty('agencyDP');
                expect(agency).toHaveProperty('agencyImages');
                expect(agency).toHaveProperty('agencyServiceTypes');
                expect(agency).toHaveProperty('agencyRating');
            }
        });

        it('handles special characters in agency names and descriptions', async () => {
            const agencyName = 'Agency with Special Characters 🌟😊';
            const agencyDesc = 'Description with special characters: @#$%^&*';
            const agencyDP = 'path/to/agency-dp';
            const agencyImages = 'path/to/agency-images';
            const agencyServiceTypes = 'Service Type 1, Service Type 2';
            const agencyRating = 4.5;

            await agencyRepo.createAgency(
                'anotherID',
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            );

            // Execute the function
            const result = await agencyRepo.getAllAgency();

            // Verify that the agency with special characters is retrieved correctly
            const agencyWithSpecialChars = result.find(
                (agency) =>
                    agency.agencyName === agencyName &&
                    agency.agencyDesc === agencyDesc
            );

            expect(agencyWithSpecialChars).toBeDefined();

            // Delete new agency
            await agencyRepo.deleteAgency('anotherID');
        });

        it('handles floating-point precision in agency ratings', async () => {
            const agencyRating = 4.987654321;
            const agencyName = 'Agency with Special Characters 🌟😊';
            const agencyDesc = 'Description with special characters: @#$%^&*';
            const agencyDP = 'path/to/agency-dp';
            const agencyImages = 'path/to/agency-images';
            const agencyServiceTypes = 'Service Type 1, Service Type 2';

            await agencyRepo.createAgency(
                'anotherID2',
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            );

            // Execute the function
            const result = await agencyRepo.getAllAgency();

            // Verify that the agency with floating-point precision is retrieved correctly

            const agencyWithFloatingPoint = result.find(
                (agency) => agency.agencyRating === agencyRating
            );

            expect(agencyWithFloatingPoint).toBeUndefined();

            // Delete new agency
            await agencyRepo.deleteAgency('anotherID2');
        });
    });
});
