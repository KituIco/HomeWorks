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

    beforeEach(async () => {});

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

    describe('createSeeker', () => {
        it('should create a seeker with valid input', async () => {
            // Define valid input values
            const firstName = 'John';
            const lastName = 'Doe';
            const birthdate = '1990-01-01';
            const gender = 'male';
            const seekerDP = 'https://example.com/profile-pic.jpg';

            // Call the createSeeker function
            await seekerRepo.createSeeker(
                userID,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDP
            );

            // Get the created seeker
            const result = await seekerRepo.getSeeker(userID);

            // Assert that the seeker is created successfully
            expect(result).toBeDefined();
            expect(result.seekerId).toBe(userID);
            expect(result.firstName).toBe(firstName);
            expect(result.lastName).toBe(lastName);
            expect(result.birthdate).toBe(birthdate);
            expect(result.gender).toBe(gender);
            expect(result.seekerDp).toBe(seekerDP);
        });

        it('should handle invalid input gracefully', async () => {
            // Define invalid input values
            const seekerID = ''; // Empty seeker ID
            const firstName = 'John';
            const lastName = 'Doe';
            const birthdate = '1990-01-01';
            const gender = 'invalid'; // Invalid gender value
            const seekerDP = 'https://example.com/profile-pic.jpg';

            // Call the createSeeker function and expect it to throw an error
            await expect(
                seekerRepo.createSeeker(
                    seekerID,
                    firstName,
                    lastName,
                    birthdate,
                    gender,
                    seekerDP
                )
            ).rejects.toThrow();
        });

        it('should handle existing seeker ID correctly', async () => {
            // Create a seeker with the same seeker ID
            const firstName = 'Jane';
            const lastName = 'Smith';
            const birthdate = '1995-01-01';
            const gender = 'female';
            const seekerDP = 'https://example.com/profile-pic.jpg';
            await seekerRepo.createSeeker(
                userID,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDP
            );

            // Try to create another seeker with the existing seeker ID
            const newFirstName = 'John';
            const newLastName = 'Doe';
            const newBirthdate = '1990-01-01';
            const newGender = 'male';
            const newSeekerDP = 'https://example.com/new-profile-pic.jpg';
            await expect(
                seekerRepo.createSeeker(
                    userID,
                    newFirstName,
                    newLastName,
                    newBirthdate,
                    newGender,
                    newSeekerDP
                )
            ).rejects.toThrow();
        });

        it('should handle missing or incomplete required fields', async () => {
            // Omit the required parameters
            const seekerID = null;
            const firstName = 'John';
            const lastName = 'Doe';
            const birthdate = ''; // Missing birthdate
            const gender = 'male';
            const seekerDP = '';

            // Call the createSeeker function and expect it to throw an error
            await expect(
                seekerRepo.createSeeker(
                    seekerID,
                    firstName,
                    lastName,
                    birthdate,
                    gender,
                    seekerDP
                )
            ).rejects.toThrow();
        });
    });
});
