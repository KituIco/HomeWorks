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

    describe('getServiceTypeByID', () => {
        test('Test with valid input', async () => {
            // Provide a valid type ID
            const validTypeID = serviceTypeID;

            // Call the function
            const serviceType = await serviceTypeRepo.getServiceTypeByID(
                validTypeID
            );

            // Verify that the function returns the expected service type
            expect(serviceType).toBeDefined();
            expect(serviceType.typeID).toBe(validTypeID);
            expect(serviceType.typeName).toBe('Test Service Type');
            expect(serviceType.typeDesc).toBe('Test Service Type Description');
            expect(serviceType.minServiceCost).toBe('400.99');
        });

        test('Test with invalid input', async () => {
            // Provide an invalid or non-existent type ID
            const invalidTypeID = 'invalid_id'.repeat(5);

            // Call the function and expect it to throw an error or return an error response
            await expect(
                serviceTypeRepo.getServiceTypeByID(invalidTypeID)
            ).rejects.toThrow();
            // OR
            // const errorResponse = await serviceTypeRepo.getServiceTypeByID(invalidTypeID);
            // expect(errorResponse).toHaveProperty('error');
        });

        test('Test with missing type', async () => {
            // Provide a type ID that does not exist in the database
            const missingTypeID = 'missing_id';

            // Call the function and expect it to return an empty response or an appropriate indication of the missing type
            const emptyResponse = await serviceTypeRepo.getServiceTypeByID(
                missingTypeID
            );
            expect(emptyResponse).not.toBeDefined();
            // OR
            // const errorResponse = await serviceTypeRepo.getServiceTypeByID(missingTypeID);
            // expect(errorResponse).toHaveProperty('message', 'Type not found');
        });
    });
});
