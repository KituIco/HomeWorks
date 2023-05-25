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

    describe('deleteService', () => {
        it('should delete a service given valid serviceID', async () => {
            await serviceRepo.deleteService(serviceID);

            const service = await serviceRepo.getService(serviceID);
            expect(service).not.toBeDefined();
        });

        it('should throw an error if serviceID is invalid', async () => {
            await expect(
                serviceRepo.deleteService('invalid'.repeat(20))
            ).rejects.toThrow();
        });

        it('should throw an error if serviceID is null', async () => {
            let beforeDelete = await serviceRepo.getService(null);

            await serviceRepo.deleteService(null);

            let afterDelete = await serviceRepo.getService(null);

            expect(beforeDelete).toEqual(afterDelete);
            expect(beforeDelete).not.toBeDefined();
            expect(afterDelete).not.toBeDefined();
        });
    });
});
