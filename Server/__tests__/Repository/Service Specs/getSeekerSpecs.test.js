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

    describe('getSeekerSpecs', () => {
        it('should return an array of service specs given an existing and valid seekerID', async () => {
            const result = await serviceSpecsRepo.getSeekerSpecs(seekerID);

            result.forEach((serviceSpecs) => {
                expect(serviceSpecs.seekerID).toEqual(seekerID);
            });
        });

        it('should return an empty array given a non-existing and valid seekerID', async () => {
            const result = await serviceSpecsRepo.getSeekerSpecs(nanoid(10));

            expect(result).toEqual([]);
        });

        it('should return an error if seekerID is too long', async () => {
            await expect(
                serviceSpecsRepo.getSeekerSpecs(nanoid(100))
            ).rejects.toThrow();
        });
    });
});
