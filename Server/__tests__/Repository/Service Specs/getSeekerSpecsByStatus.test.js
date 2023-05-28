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

    describe('getSeekerSpecsByStatus', () => {
        it('should return an array of service specs given a valid seeker ID and status', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSeekerSpecsByStatus(
                seekerID,
                2
            );

            serviceSpecs.forEach((serviceSpecs) => {
                expect(serviceSpecs.seekerID).toEqual(seekerID);
                expect(serviceSpecs.specsStatus).toEqual(2);
            });
        });

        it('should return an empty array given a valid seeker ID and a non existent status', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSeekerSpecsByStatus(
                seekerID,
                3
            );

            expect(serviceSpecs.length).toEqual(0);
        });

        it('should throw an error given an invalid seeker ID', async () => {
            await expect(
                serviceSpecsRepo.getSeekerSpecsByStatus('invalid'.repeat(10), 2)
            ).rejects.toThrow();
        });
    });
});
