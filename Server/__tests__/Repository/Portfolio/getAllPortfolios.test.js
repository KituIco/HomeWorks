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

    describe('getAllPortfolios', () => {
        it('should return all portfolios', async () => {
            const portfolios = await portfolioRepo.getAllPortfolios();
            portfolios.forEach((portfolio) => {
                expect(portfolio).toHaveProperty('portfolioID');
                expect(portfolio).toHaveProperty('serviceID');
                expect(portfolio).toHaveProperty('images');
                expect(portfolio).toHaveProperty('portfolioDescription');
                expect(portfolio).toHaveProperty('projectPrice');
            });
        });

        it('should return empty array if no portfolios', async () => {
            // mock getAllPortfolios
            portfolioRepo.getAllPortfolios = jest.fn(() => []);

            const portfolios = await portfolioRepo.getAllPortfolios();

            expect(portfolios).toEqual([]);
        });

        it('should ensure that all portfolios have a portfolioID', async () => {
            const portfolios = await portfolioRepo.getAllPortfolios();
            portfolios.forEach((portfolio) => {
                expect(portfolio.portfolioID).toBeDefined();
            });
        });
    });
});
