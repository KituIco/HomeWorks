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

    beforeEach(async () => {
        await serviceRepo.createService(
            serviceID,
            providerID,
            '1',
            'Car Mechanic',
            null,
            null
        );
    });

    afterEach(async () => {
        await serviceRepo.deleteService(serviceID);
    });

    afterAll(async () => {
        await providerRepo.deleteProvider(providerID);
        await userRepo.deleteUser(providerID);

        await db.end();
    });

    describe('getService', () => {
        it('should return an service given a service ID', async () => {
            const service = await serviceRepo.getService(serviceID);

            expect(service).toBeDefined();
        });

        it('should return undefined given an unknown service ID', async () => {
            const service = await serviceRepo.getService(nanoid(10));

            expect(service).not.toBeDefined();
        });

        it('should return an error given invalid service id is too long', async () => {
            await expect(serviceRepo.getService(nanoid(50))).rejects.toThrow();
        });
    });
});
