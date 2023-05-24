const ServiceTypeRepository = require('../../../repositiories/service-type-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ServiceTypeRepository', () => {
    let serviceTypeRepo;
    let serviceTypeID;

    beforeAll(async () => {
        serviceTypeRepo = new ServiceTypeRepository(db);
        serviceTypeID = nanoid(10);
    });

    afterEach(async () => {
        await serviceTypeRepo.deleteServiceType(serviceTypeID);
    });

    afterAll(async () => {
        await db.end();
    });

    describe('createServiceType', () => {
        it('should create a service type with valid input', async () => {
            const typeID = nanoid(10);
            const typeName = 'Test Type';
            const typeDesc = 'Test description';
            const minServiceCost = 10.0;

            await serviceTypeRepo.createServiceType(
                typeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            const result = await serviceTypeRepo.getServiceTypeByID(typeID);

            expect(result).toBeTruthy();
            // Add additional assertions to verify the expected data in the database if necessary
        });

        it('should throw an error with invalid input', async () => {
            const invalidTypeID = nanoid(50);
            const emptyTypeName = '';
            const negativeMinServiceCost = -10.0;

            await expect(
                serviceTypeRepo.createServiceType(invalidTypeID)
            ).rejects.toThrow();
            await expect(
                serviceTypeRepo.createServiceType(nanoid(10), emptyTypeName)
            ).rejects.toThrow();
            await expect(
                serviceTypeRepo.createServiceType(
                    nanoid(10),
                    'Test',
                    null,
                    negativeMinServiceCost
                )
            ).rejects.toThrow();
            // Add additional assertions to verify the error or error response if necessary
        });

        it('should handle existing type ID correctly', async () => {
            const typeName = 'Updated Type';
            const typeDesc = 'Updated description';
            const minServiceCost = 20.0;

            await serviceTypeRepo.createServiceType(
                serviceTypeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            await expect(
                serviceTypeRepo.createServiceType(
                    serviceTypeID,
                    typeName,
                    typeDesc,
                    minServiceCost
                )
            ).rejects.toThrow();

            // Add additional assertions to verify the expected behavior if necessary
        });

        it('should throw an error with missing or incomplete required fields', async () => {
            await expect(serviceTypeRepo.createServiceType()).rejects.toThrow();
            await expect(
                serviceTypeRepo.createServiceType(nanoid(10))
            ).rejects.toThrow();
            await expect(
                serviceTypeRepo.createServiceType(nanoid(10), 'Test')
            ).rejects.toThrow();
            // Add additional assertions to verify the error or error response if necessary
        });
    });
});
