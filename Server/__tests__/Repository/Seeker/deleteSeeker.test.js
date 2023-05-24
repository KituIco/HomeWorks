const SeekerRepository = require('../../../repositiories/seeker-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('SeekerRepository', () => {
    let seekerRepo;
    let userRepo;
    let userID;

    beforeAll(async () => {
        // Create a new seekerRepo instance before every test.
        seekerRepo = new SeekerRepository(db);
        userRepo = new UserRepository(db);

        // Create a new user and store the userID
        userID = nanoid(10);
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        const firstName = 'Test';
        const lastName = 'User';
        const birthdate = '2000-01-01';
        const gender = 'male';
        const seekerDP = 'path/to/seeker-dp';

        await seekerRepo.createSeeker(
            userID,
            firstName,
            lastName,
            birthdate,
            gender,
            seekerDP
        );
    });

    afterEach(async () => {
        // Delete the created seeker
        await seekerRepo.deleteSeeker(userID);
    });

    afterAll(async () => {
        // Delete the created user
        await userRepo.deleteUser(userID);
        // Close the database connection after all tests
        await db.end();
    });

    describe('deleteSeeker', () => {
        it('Test with valid seeker ID', async () => {
            await seekerRepo.deleteSeeker(userID);
            const deletedSeeker = await seekerRepo.getSeeker(userID);
            expect(deletedSeeker).not.toBeDefined();
        });

        it('Test with invalid seeker ID', async () => {
            // Provide an invalid seeker ID that does not exist in the database
            const invalidSeekerID = 'invalidID'.repeat(5);

            // Attempt to delete the seeker and verify that it throws an error
            await expect(
                seekerRepo.deleteSeeker(invalidSeekerID)
            ).rejects.toThrow();
        });

        it('Test database integrity', async () => {
            // Create a new seeker

            // Delete the seeker
            await seekerRepo.deleteSeeker(userID);

            // Attempt to fetch the deleted seeker and verify that it does not exist
            const deletedSeeker = await seekerRepo.getSeeker(userID);
            expect(deletedSeeker).not.toBeDefined();
        });
    });
});
