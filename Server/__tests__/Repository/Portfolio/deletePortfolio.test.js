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

    describe('deletePortfolio', () => {
        it('should delete a portfolio that is valid ID', async () => {
            await portfolioRepo.deletePortfolio(portfolioID);

            const portfolio = await portfolioRepo.getPortfolio(portfolioID);

            expect(portfolio).toBeUndefined();
        });

        it('should return an error a portfolio that is invalid ID', async () => {
            const invalidPortfolioID = 'invalidPortfolioID'.repeat(10);

            try {
                await portfolioRepo.deletePortfolio(invalidPortfolioID);
            } catch (err) {
                expect(err).toBeDefined();
            }
        });

        it('should not delete a portfolio when given a null portfolioID', async () => {
            // before deleting portfolio
            const portfolio = await portfolioRepo.getPortfolio(null);

            await portfolioRepo.deletePortfolio(null);

            // after deleting portfolio
            const portfolioAfter = await portfolioRepo.getPortfolio(null);

            expect(portfolio).toEqual(portfolioAfter);
        });
    });
});
