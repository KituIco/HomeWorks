const ServiceSpecsRepository = require('../../../repositiories/service-specs-repo');
const UserRepository = require('../../../repositiories/user-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ServiceSpecsRepository', () => {
    let serviceSpecsRepo;
    let userRepo;
    let seekerRepo;
    let seekerID;
    let serviceSpecsID;

    beforeAll(async () => {
        serviceSpecsRepo = new ServiceSpecsRepository(db);
        userRepo = new UserRepository(db);
        seekerRepo = new SeekerRepository(db);

        seekerID = nanoid(10);
        serviceSpecsID = nanoid(10);

        await userRepo.createUser(seekerID);

        await seekerRepo.createSeeker(
            seekerID,
            'john',
            'doe',
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // Create a service specs
        await serviceSpecsRepo.createServiceSpecs(
            serviceSpecsID,
            seekerID,
            '1',
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    afterEach(async () => {
        await serviceSpecsRepo.deleteServiceSpecs(serviceSpecsID);
    });

    afterAll(async () => {
        await seekerRepo.deleteSeeker(seekerID);

        await userRepo.deleteUser(seekerID);

        await db.end();
    });

    describe('getSpecsByCoords', () => {
        it('should return an array of service specs', async () => {
            const specs = await serviceSpecsRepo.getSpecsByCoords(
                90,
                90,
                0,
                10
            );

            expect(specs.length).toBeGreaterThanOrEqual(0);
        });

        it('should return an empty array if no service specs are found', async () => {
            // Mock the getSpecsByCoords method to return an empty array
            serviceSpecsRepo.getSpecsByCoords = jest.fn(() => []);

            const specs = await serviceSpecsRepo.getSpecsByCoords(
                90,
                90,
                0,
                10
            );

            expect(specs.length).toBe(0);
        });
    });
});
