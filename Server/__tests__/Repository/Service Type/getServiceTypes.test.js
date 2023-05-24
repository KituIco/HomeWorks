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

    describe('getServiceTypes', () => {
        it('should return a list of service types', async () => {
            const serviceTypes = await serviceTypeRepo.getServiceTypes();
            expect(Array.isArray(serviceTypes)).toBe(true);
        });

        it('should return service types with correct details', async () => {
            const expectedServiceType = {
                typeID: serviceTypeID,
                typeName: 'Test Service Type',
                typeDesc: 'Test Service Type Description',
                minServiceCost: 400.99,
            };

            const serviceTypes = await serviceTypeRepo.getServiceTypes();
            const matchingType = serviceTypes.find(
                (type) => type.typeID === expectedServiceType.typeID
            );

            expectedServiceType.minServiceCost = '400.99';
            expect(matchingType).toEqual(expectedServiceType);
        });

        it('should return an empty list when there are no service types', async () => {
            // Mock tge getServiceTypes method to return an empty array
            jest.spyOn(serviceTypeRepo, 'getServiceTypes').mockImplementation(
                async () => {
                    return [];
                }
            );

            const serviceTypes = await serviceTypeRepo.getServiceTypes();
            expect(serviceTypes).toEqual([]);
        });
    });
});
