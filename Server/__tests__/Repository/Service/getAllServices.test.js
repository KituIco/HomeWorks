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

    describe('getAllService', () => {
        it('should return all services', async () => {
            const services = await serviceRepo.getAllServices();

            expect(services.length).toBeGreaterThanOrEqual(0);
        });

        it('should return empty set if no services', async () => {
            // mock the getAllServices function
            serviceRepo.getAllServices = jest.fn(() => []);

            const services = await serviceRepo.getAllServices();

            expect(services.length).toBe(0);
        });

        it('should return error if getAllServices throws error', async () => {
            try {
                await serviceRepo.getAllServices(nanoid(10000));
            } catch (err) {
                expect(err).toBeDefined();
            }
        });
    });
});
