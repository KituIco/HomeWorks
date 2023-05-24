const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('UserRepository', () => {
    let userRepo;
    let userID;

    beforeAll(async () => {
        userRepo = new UserRepository(db);
        userID = nanoid(10);
    });

    beforeEach(async () => {
        await userRepo.createUser(userID);
    });

    afterEach(async () => {
        await userRepo.deleteUser(userID);
    });

    afterAll(async () => {
        await db.end();
    });

    describe('deletehUser', () => {
        it('Test with valid input: Delete existing user from the database', async () => {
            // Perform the delete operation
            await userRepo.deleteUser(userID);

            // Verify that the user is successfully deleted
            const user = await userRepo.getUser(userID);
            expect(user).not.toBeDefined();
        });

        it('Test with invalid input: Handle non-existent user ID', async () => {
            const nonExistentUserID = 'invalidUserID'.repeat(10);

            // Attempt to delete a non-existent user
            try {
                await userRepo.deleteUser(nonExistentUserID);
            } catch (error) {
                // Verify that the function throws an appropriate error or returns an error response
                expect(error).toBeDefined();
            }
        });

        it('Test with missing user: Handle non-existent user ID gracefully', async () => {
            const nonExistentUserID = 'nonID';

            // before delete get user
            const userBeforeDeletion = await userRepo.getUser(
                nonExistentUserID
            );

            // Attempt to delete a non-existent user
            await userRepo.deleteUser(nonExistentUserID);

            // after delete get user
            const userAfterDeletion = await userRepo.getUser(nonExistentUserID);

            // verify both user before and after deletion are undefined
            expect(userBeforeDeletion).not.toBeDefined();
            expect(userAfterDeletion).not.toBeDefined();

            // Verify that the function completes successfully without throwing any errors or warnings
            // You can add additional assertions if needed
        });

        it('Test database integrity: Verify user is effectively removed from the database', async () => {
            // Fetch user details before deleting the user
            const userBeforeDeletion = await userRepo.getUser(userID);

            // Perform the delete operation
            await userRepo.deleteUser(userID);

            // Verify that the user no longer exists in the database
            const userAfterDeletion = await userRepo.getUser(userID);
            expect(userAfterDeletion).not.toBeDefined();

            // Additional assertion to check user association with other entities if applicable
        });
    });
});
