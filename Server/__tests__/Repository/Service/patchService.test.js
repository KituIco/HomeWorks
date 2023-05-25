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

    describe('patchService', () => {
        it('should patch a service with valid input', async () => {
            await serviceRepo.patchService(serviceID, null, null, null, 200.5);

            const service = await serviceRepo.getService(serviceID);

            expect(service.initialCost).toBe('200.50');
        });

        it('should not patch a service with invalid input', async () => {
            await expect(
                serviceRepo.patchService(nanoid(100))
            ).rejects.toThrowError();
        });

        it('should not change anything if no parameter passed', async () => {
            let beforePatch = await serviceRepo.getService(serviceID);

            await serviceRepo.patchService(serviceID);

            let afterPatch = await serviceRepo.getService(serviceID);

            expect(beforePatch).toEqual(afterPatch);
        });
    });
});
