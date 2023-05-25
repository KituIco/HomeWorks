const ServiceRepository = require('../../../repositiories/service-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('Service Repository', () => {
    let serviceRepo;
    let userRepo;
    let providerRepo;

    let providerID;
    let serviceID;

    beforeAll(async () => {
        serviceRepo = new ServiceRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);

        providerID = nanoid(10);
        serviceID = nanoid(10);

        await userRepo.createUser(providerID);

        // Create provider
        await providerRepo.createProvider(
            providerID,
            'provider',
            'provider',
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {});

    afterEach(async () => {
        await serviceRepo.deleteService(serviceID);
    });

    afterAll(async () => {
        await providerRepo.deleteProvider(providerID);
        await userRepo.deleteUser(providerID);

        await db.end();
    });

    describe('createService', () => {
        it('should create a service with valid input', async () => {
            await serviceRepo.createService(
                serviceID,
                providerID,
                '1',
                'Car Mechanic',
                null,
                null
            );

            const service = await serviceRepo.getService(serviceID);

            expect(service.serviceID).toEqual(serviceID);
            expect(service.providerID).toEqual(providerID);
            expect(service.typeID).toEqual('1');
            expect(service.typeName).toEqual('Car Mechanic');
            expect(service.initialCost).toEqual(null);
            expect(service.serviceRating).toEqual(null);
        });

        it('should throw an error if serviceID is not unique', async () => {
            await serviceRepo.createService(
                serviceID,
                providerID,
                '1',
                'Car Mechanic',
                null,
                null
            );

            await expect(
                serviceRepo.createService(
                    serviceID,
                    providerID,
                    '1',
                    'Car Mechanic',
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if providerID does not exist', async () => {
            await expect(
                serviceRepo.createService(
                    serviceID,
                    'invalidProviderID',
                    '1',
                    'Car Mechanic',
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if serviceID is not valid', async () => {
            await expect(
                serviceRepo.createService(
                    'invalidServiceID'.repeat(10),
                    providerID,
                    '1',
                    'Car Mechanic',
                    null,
                    null
                )
            ).rejects.toThrow();
        });
    });
});
