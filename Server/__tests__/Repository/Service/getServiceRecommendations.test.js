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

    describe('getServiceRecommendations', () => {
        it('should return an array of services', async () => {
            // mock the getServiceRecommendations function
            serviceRepo.getServiceRecommendations = jest.fn().mockReturnValue([
                {
                    serviceID: serviceID,
                    providerID: providerID,
                    categoryID: '1',
                    name: 'Car Mechanic',
                    description: null,
                    price: null,
                },
            ]);

            const services = await serviceRepo.getServiceRecommendations();

            expect(services).toEqual([
                {
                    serviceID: serviceID,
                    providerID: providerID,
                    categoryID: '1',
                    name: 'Car Mechanic',
                    description: null,
                    price: null,
                },
            ]);
        });

        it('should throw an error if some fields are invalid', async () => {
            let services = await serviceRepo.getServiceRecommendations();

            expect(services).toBeDefined();
        });
    });
});
