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

    describe('getProviderServices', () => {
        it('should return an array of services given provider', async () => {
            const services = await serviceRepo.getProviderServices(providerID);

            services.forEach((service) =>
                expect(service.providerID).toEqual(providerID)
            );
        });

        it('should return an empty array given provider with no services', async () => {
            const services = await serviceRepo.getProviderServices(nanoid(10));

            expect(services.length).toEqual(0);
        });

        it('should return an error given invalid provider id is too long', async () => {
            await expect(
                serviceRepo.getProviderServices(nanoid(50))
            ).rejects.toThrow();
        });
    });
});
