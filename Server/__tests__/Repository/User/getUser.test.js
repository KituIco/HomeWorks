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

    describe('getUser', () => {
        it('should retrieve user information for a valid user ID', async () => {
            const user = await userRepo.getUser(userID);
            expect(user).toBeDefined();
            // Add additional assertions to verify the user information
        });

        it('should handle invalid user ID gracefully', async () => {
            const invalidUserID = 'nonexistent123'.repeat(10);
            await expect(userRepo.getUser(invalidUserID)).rejects.toThrow();
            // Add additional assertions or error message validation if needed
        });

        it('should handle missing user ID gracefully', async () => {
            const nonExistentUserID = 'nonexistent456';
            const user = await userRepo.getUser(nonExistentUserID);
            expect(user).not.toBeDefined();
            // Add additional assertions or error message validation if needed
        });

        it('should match the returned user with the expected values', async () => {
            const user = await userRepo.getUser(userID);
            // Fetch the details of the user using a separate query
            const query = `SELECT * FROM User WHERE user_id = '${userID}'`;
            const [result] = await db.query(query);
            expect(user).toEqual(result[0]);
        });
    });
});
