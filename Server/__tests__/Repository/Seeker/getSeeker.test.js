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

    describe('getSeeker', () => {
        describe('getSeeker', () => {
            it('Test with valid input: Provide a valid seeker ID that exists in the database', async () => {
                const validSeekerID = userID; // Replace with a valid seeker ID that exists in the database

                const seekerInfo = await seekerRepo.getSeeker(validSeekerID);

                // Assert that the function returns the correct seeker information
                expect(seekerInfo.seekerId).toBe(validSeekerID);
                expect(seekerInfo.firstName).toBe('Test');
                expect(seekerInfo.lastName).toBe('User');
                expect(seekerInfo.birthdate).toBe('2000-01-01');
                expect(seekerInfo.gender).toBe('male');
                expect(seekerInfo.seekerDp).toBe('path/to/seeker-dp');
            });

            it('Test with invalid input: Pass an invalid or non-existent seeker ID', async () => {
                const invalidSeekerID = 'invalid_seeker_id'.repeat(2); // Replace with an invalid or non-existent seeker ID

                // Assert that the function throws an appropriate error or returns an error response
                await expect(
                    seekerRepo.getSeeker(invalidSeekerID)
                ).rejects.toThrow();
                // Alternatively, you can check for a specific error message or error code
                // await expect(seekerRepo.getSeeker(invalidSeekerID)).rejects.toThrowError('Invalid seeker ID');
                // await expect(seekerRepo.getSeeker(invalidSeekerID)).rejects.toHaveProperty('statusCode', 404);
            });

            it('Test with missing seeker: Try to retrieve a seeker that does not exist in the database', async () => {
                const nonExistentSeekerID = 'non__id'; // Replace with a seeker ID that does not exist in the database

                const seekerInfo = await seekerRepo.getSeeker(
                    nonExistentSeekerID
                );

                // Assert that the function returns an appropriate response indicating the absence of the seeker
                expect(seekerInfo).not.toBeDefined();
                // Alternatively, you can check for a specific response message or code
                // expect(seekerInfo).toEqual({ message: 'Seeker not found', code: 404 });
            });
        });
    });
});
