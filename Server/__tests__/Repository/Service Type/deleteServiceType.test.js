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

    describe('deleteServiceType', () => {
        it('Test with valid input: should delete service type', async () => {
            // Delete the service type
            await serviceTypeRepo.deleteServiceType(serviceTypeID);

            // Verify that the service type no longer exists in the database
            const deletedServiceType = await serviceTypeRepo.getServiceTypeByID(
                serviceTypeID
            );
            expect(deletedServiceType).not.toBeDefined();
        });

        it('Test with invalid input: should throw an error for non-existent service type', async () => {
            const invalidTypeID = 'invalid_type_id'.repeat(5);

            // Try to delete a non-existent service type
            try {
                await serviceTypeRepo.deleteServiceType(invalidTypeID);
                // If the function does not throw an error, fail the test
                expect(true).toBe(false);
            } catch (error) {
                // Verify that the error message indicates the non-existence of the specified service type
                expect(error).toBe(error);
            }
        });

        it('Test database integrity: should fetch and delete the correct service type', async () => {
            // Fetch the service type before deleting
            const fetchedServiceTypeBeforeDelete =
                await serviceTypeRepo.getServiceTypeByID(serviceTypeID);

            // Verify that the fetched service type matches the expected values
            expect(fetchedServiceTypeBeforeDelete.typeID).toBe(serviceTypeID);
            expect(fetchedServiceTypeBeforeDelete.typeName).toBe(
                'Test Service Type'
            );
            expect(fetchedServiceTypeBeforeDelete.typeDesc).toBe(
                'Test Service Type Description'
            );
            expect(fetchedServiceTypeBeforeDelete.minServiceCost).toBe(
                '400.99'
            );

            // Delete the service type
            await serviceTypeRepo.deleteServiceType(serviceTypeID);

            // Verify that the service type no longer exists in the database
            const deletedServiceType = await serviceTypeRepo.getServiceTypeByID(
                serviceTypeID
            );
            expect(deletedServiceType).not.toBeDefined();
        });
    });
});
