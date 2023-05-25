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

    beforeEach(async () => {});

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

    describe('createPortfolio', () => {
        it('should create a portfolio given valid inputs', async () => {
            await portfolioRepo.createPortfolio(
                portfolioID,
                serviceID,
                null,
                null,
                null
            );

            const portfolio = await portfolioRepo.getPortfolio(portfolioID);

            expect(portfolio).toEqual({
                portfolioID: portfolioID,
                serviceID: serviceID,
                images: null,
                portfolioDescription: null,
                projectPrice: null,
            });
        });

        it('should throw an error if portfolioID is too long', async () => {
            const longPortfolioID = nanoid(256);

            await expect(
                portfolioRepo.createPortfolio(
                    longPortfolioID,
                    serviceID,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if serviceID is duplicate', async () => {
            await portfolioRepo.createPortfolio(
                portfolioID,
                serviceID,
                null,
                null,
                null
            );

            await expect(
                portfolioRepo.createPortfolio(
                    portfolioID,
                    serviceID,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if serviceID and portfolioID is missing and null', async () => {
            await expect(
                portfolioRepo.createPortfolio(
                    portfolioID,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();

            await expect(
                portfolioRepo.createPortfolio(null, null, null, null, null)
            ).rejects.toThrow();
        });
    });
});
