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

    describe('patchServiceSpecs', () => {
        it('should patch a service specs given valid inputs', async () => {
            await serviceSpecsRepo.patchServiceSpecs(
                serviceSpecsID,
                null,
                '2',
                null,
                null,
                null,
                null,
                null,
                null
            );

            const serviceSpecs = await serviceSpecsRepo.getSpecsByID(
                serviceSpecsID
            );

            expect(serviceSpecs.typeID).toEqual('2');
        });

        it('should throw an error if seeker id does not exist', async () => {
            await expect(
                serviceSpecsRepo.patchServiceSpecs(
                    '1',
                    nanoid(50),
                    '2',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should not change fields that are set to null', async () => {
            await serviceSpecsRepo.patchServiceSpecs(
                serviceSpecsID,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            const serviceSpecs = await serviceSpecsRepo.getSpecsByID(
                serviceSpecsID
            );

            expect(serviceSpecs.typeID).toEqual('1');
        });
    });
});
