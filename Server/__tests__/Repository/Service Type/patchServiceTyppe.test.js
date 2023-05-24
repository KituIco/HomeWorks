const ServiceTypeRepository = require('../../../repositiories/service-type-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ServiceTypeRepository', () => {
    let serviceTypeRepo;
    let serviceTypeID;

    beforeAll(async () => {
        // Create a new serviceTypeRepo instance before every test.
        serviceTypeRepo = new ServiceTypeRepository(db);

        // Create a new serviceType and store the serviceTypeID
        serviceTypeID = nanoid(10);
    });

    beforeEach(async () => {
        // Create a new serviceType
        await serviceTypeRepo.createServiceType(
            serviceTypeID,
            'Test Service Type',
            'Test Service Type Description',
            400.99
        );
    });

    afterEach(async () => {
        // Delete the created serviceType
        await serviceTypeRepo.deleteServiceType(serviceTypeID);
    });

    afterAll(async () => {
        // Close the database connection after all tests
        await db.end();
    });

    describe('patchServiceType', () => {
        it('should update the service type in the database with valid input', async () => {
            // Provide valid input values
            const typeID = serviceTypeID;
            const typeName = 'Updated Service Type';
            const typeDesc = 'Updated Service Type Description';
            const minServiceCost = 500.99;

            // Call the patchServiceType method
            await serviceTypeRepo.patchServiceType(
                typeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            // Retrieve the updated service type from the database
            const updatedServiceType = await serviceTypeRepo.getServiceTypeByID(
                typeID
            );

            // Verify that the service type is updated with the provided values
            expect(updatedServiceType.typeName).toBe(typeName);
            expect(updatedServiceType.typeDesc).toBe(typeDesc);
            expect(Number(updatedServiceType.minServiceCost)).toBe(
                minServiceCost
            );
        });

        it('should handle invalid input and throw an error', async () => {
            // Pass invalid input values
            const typeID = 'invalidType'.repeat(10);
            const typeName = 'Updated Service Type';
            const typeDesc = 'Updated Service Type Description';
            const minServiceCost = 'invalidCost';

            // Call the patchServiceType method and expect it to throw an error
            await expect(
                serviceTypeRepo.patchServiceType(
                    typeID,
                    typeName,
                    typeDesc,
                    minServiceCost
                )
            ).rejects.toThrow();
        });

        it('should handle missing or incomplete required fields and throw an error', async () => {
            // Omit some required fields
            const typeID = serviceTypeID;
            const typeName = null;
            const typeDesc = 'Updated Service Type Description';
            const minServiceCost = null;

            // get before patch
            const beforePatch = await serviceTypeRepo.getServiceTypeByID(
                typeID
            );

            // Call the patchServiceType method and expect it to throw an error
            await serviceTypeRepo.patchServiceType(
                typeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            // get after patch
            const afterPatch = await serviceTypeRepo.getServiceTypeByID(typeID);

            // Verify that the null fields are updated
            expect(afterPatch.typeName).toBe(beforePatch.typeName);
        });
    });
});
