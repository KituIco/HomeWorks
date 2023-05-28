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

    describe('getSpecsByID', () => {
        it('should return a service specs given a valid id', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSpecsByID(
                serviceSpecsID
            );

            expect(serviceSpecs).toBeDefined();
        });

        it('should return undefined given an non-existent id', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSpecsByID(
                'non-]-id'
            );

            expect(serviceSpecs).toBeUndefined();
        });

        it('should throw an error given an invalid id where it is too long', async () => {
            await expect(
                serviceSpecsRepo.getSpecsByID('a'.repeat(110))
            ).rejects.toThrow();
        });
    });
});
