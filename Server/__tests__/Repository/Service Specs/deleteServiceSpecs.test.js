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

    describe('deleteServiceSpecs', () => {
        it('should delete a service specs given valid inputs', async () => {
            await serviceSpecsRepo.deleteServiceSpecs(serviceSpecsID);

            const result = await serviceSpecsRepo.getSpecsByID(serviceSpecsID);

            expect(result).toBeUndefined();
        });

        it('should throw an error if service specs id is too long', async () => {
            const longServiceSpecsID = nanoid(100);

            await expect(
                serviceSpecsRepo.deleteServiceSpecs(longServiceSpecsID)
            ).rejects.toThrow();
        });

        it('should show undefined if getting a deleted service specs', async () => {
            await serviceSpecsRepo.deleteServiceSpecs(serviceSpecsID);

            const result = await serviceSpecsRepo.getSpecsByID(serviceSpecsID);

            expect(result).toBeUndefined();
        });
    });
});
