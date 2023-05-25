const PortfolioRepository = require('../../../repositiories/portfolio-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const ServiceRepository = require('../../../repositiories/service-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('Portfolio Repository', () => {
    let portfolioRepo;
    let userRepo;
    let providerRepo;
    let serviceRepo;

    let providerID;
    let serviceID;
    let portfolioID;

    beforeAll(async () => {
        portfolioRepo = new PortfolioRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);
        serviceRepo = new ServiceRepository(db);

        providerID = nanoid(10);
        serviceID = nanoid(10);
        portfolioID = nanoid(10);

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

        // Create service
        await serviceRepo.createService(
            serviceID,
            providerID,
            '1',
            'Car Mechanic',
            null,
            null
        );
    });

    beforeEach(async () => {
        await portfolioRepo.createPortfolio(
            portfolioID,
            serviceID,
            null,
            'portfolio description',
            null
        );
    });

    afterEach(async () => {
        await portfolioRepo.deletePortfolio(portfolioID);
    });

    afterAll(async () => {
        // delete service
        await serviceRepo.deleteService(serviceID);
        // delete provider
        await providerRepo.deleteProvider(providerID);
        // delete user
        await userRepo.deleteUser(providerID);

        await db.end();
    });

    describe('patchPortfolio', () => {
        it('should update portfolio given valid inputs', async () => {
            await portfolioRepo.patchPortfolio(
                portfolioID,
                serviceID,
                'path/to/image',
                null,
                25.5
            );

            const updatedPortfolio = await portfolioRepo.getPortfolio(
                portfolioID
            );

            expect(updatedPortfolio).toEqual({
                portfolioID: portfolioID,
                serviceID: serviceID,
                images: 'path/to/image',
                portfolioDescription: 'portfolio description',
                projectPrice: '25.50',
            });
        });

        it('should update portfolio given portfolioID is too long', async () => {
            const newPortfolioID = nanoid(50);

            await expect(
                portfolioRepo.patchPortfolio(
                    newPortfolioID,
                    serviceID,
                    'path/to/image',
                    null,
                    25.5
                )
            ).rejects.toThrow();
        });

        it('should not update null fields', async () => {
            await portfolioRepo.patchPortfolio(
                portfolioID,
                null,
                null,
                null,
                null
            );

            const updatedPortfolio = await portfolioRepo.getPortfolio(
                portfolioID
            );

            expect(updatedPortfolio).toEqual({
                portfolioID: portfolioID,
                serviceID: serviceID,
                images: null,
                portfolioDescription: 'portfolio description',
                projectPrice: null,
            });
        });
    });
});
