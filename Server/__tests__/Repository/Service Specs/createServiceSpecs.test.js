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

    beforeEach(async () => {});

    afterEach(async () => {
        await serviceSpecsRepo.deleteServiceSpecs(serviceSpecsID);
    });

    afterAll(async () => {
        await seekerRepo.deleteSeeker(seekerID);

        await userRepo.deleteUser(seekerID);

        await db.end();
    });

    describe('createServiceSpecs', () => {
        it('should create a service specs given valid inputs', async () => {
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

            const serviceSpecs = await serviceSpecsRepo.getSpecsByID(
                serviceSpecsID
            );

            expect(serviceSpecs).toEqual({
                specsID: serviceSpecsID,
                seekerID: seekerID,
                typeID: '1',
                addressID: null,
                referencedID: null,
                specsDesc: null,
                images: null,
                specsStatus: null,
                specsTimestamp: null,
            });
        });

        it('should throw an error if ids are too long', async () => {
            const longID = '1234567890123456789012345678901234567890';

            await expect(
                serviceSpecsRepo.createServiceSpecs(
                    longID,
                    seekerID,
                    '1',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if specs id is not unique', async () => {
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

            await expect(
                serviceSpecsRepo.createServiceSpecs(
                    serviceSpecsID,
                    seekerID,
                    '1',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if seeker id does not exist', async () => {
            const invalidSeekerID = nanoid(10);

            await expect(
                serviceSpecsRepo.createServiceSpecs(
                    serviceSpecsID,
                    invalidSeekerID,
                    '1',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('should throw an error if seeker id is missing', async () => {
            await expect(
                serviceSpecsRepo.createServiceSpecs(
                    serviceSpecsID,
                    null,
                    '1',
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });
    });
});
