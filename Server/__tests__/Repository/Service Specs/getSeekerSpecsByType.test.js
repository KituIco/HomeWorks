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
            2,
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

    describe('getSeekerSpecsByType', () => {
        it('should return a list of service specs for a given seeker id and service type', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSeekerSpecsByType(
                seekerID,
                '1'
            );

            serviceSpecs.forEach((serviceSpec) => {
                expect(serviceSpec.seekerID).toEqual(seekerID);
                expect(serviceSpec.typeID).toEqual('1');
            });
        });

        it('should return an empty list if no service specs are found', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSeekerSpecsByType(
                seekerID,
                '2'
            );

            expect(serviceSpecs).toEqual([]);
        });

        it('should throw an error if seeker id is too long or typeID is too long', async () => {
            await expect(
                serviceSpecsRepo.getSeekerSpecsByType(
                    '12345678901'.repeat(10),
                    '1'
                )
            ).rejects.toThrow();

            await expect(
                serviceSpecsRepo.getSeekerSpecsByType(
                    nanoid(10),
                    '12345678901'.repeat(10)
                )
            ).rejects.toThrow();
        });
    });
});
