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

    describe('patchSeeker', () => {
        it('Test with valid input', async () => {
            // Provide a valid seeker ID and valid values for one or more parameters to update
            const validSeekerID = userID;
            const updatedFirstName = 'Updated';
            const updatedLastName = 'User';
            const updatedBirthdate = '1995-05-10';
            const updatedGender = 'female';
            const updatedSeekerDP = 'new/path/to/seeker-dp';

            // Call the patchSeeker function with valid input
            await seekerRepo.patchSeeker(
                validSeekerID,
                updatedFirstName,
                updatedLastName,
                updatedBirthdate,
                updatedGender,
                updatedSeekerDP
            );

            // Retrieve the updated seeker information from the database
            const updatedSeeker = await seekerRepo.getSeeker(validSeekerID);

            // Assert that the seeker information is updated correctly
            expect(updatedSeeker.firstName).toBe(updatedFirstName);
            expect(updatedSeeker.lastName).toBe(updatedLastName);
            expect(updatedSeeker.birthdate).toBe(updatedBirthdate);
            expect(updatedSeeker.gender).toBe(updatedGender);
            expect(updatedSeeker.seekerDp).toBe(updatedSeekerDP);
        });

        it('Test with invalid input', async () => {
            // Pass an invalid or non-existent seeker ID
            const invalidSeekerID = 'invalid-seeker-idaaaaaaaaa';

            // Call the patchSeeker function with an invalid seeker ID
            try {
                await seekerRepo.patchSeeker(
                    invalidSeekerID,
                    'Updated',
                    'User',
                    '1995-05-10',
                    'female',
                    'new/path/to/seeker-dp'
                );
            } catch (error) {
                // Assert that the function throws an appropriate error or returns an error response
                expect(error).toBe(error);
                return;
            }

            // If the function doesn't throw an error, fail the test
            fail('Expected the function to throw an error');
        });

        it('Test with missing parameters', async () => {
            // Get before updating
            const seekerBeforeUpdate = await seekerRepo.getSeeker(userID);

            // Update with null values
            await seekerRepo.patchSeeker(userID, null, null, null, null, null);

            // Get after updating
            const seekerAfterUpdate = await seekerRepo.getSeeker(userID);

            // Assert that the seeker information is not updated
            expect(seekerAfterUpdate).toStrictEqual(seekerBeforeUpdate);
        });
    });
});
