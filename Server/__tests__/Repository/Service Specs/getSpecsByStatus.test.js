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

    describe('getSpecsByStatus', () => {
        it('should return an array of service specs with the given status', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSpecsByStatus(2);

            serviceSpecs.forEach((serviceSpec) => {
                expect(serviceSpec.specsStatus).toEqual(2);
            });
        });

        it('should return an empty array if no service specs with the given status is found', async () => {
            const serviceSpecs = await serviceSpecsRepo.getSpecsByStatus(3);

            expect(serviceSpecs).toEqual([]);
        });

        it('should throw an error if the status is not a number', async () => {
            await expect(
                serviceSpecsRepo.getSpecsByStatus('hello')
            ).rejects.toThrow();
        });
    });
});
