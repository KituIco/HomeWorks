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

    afterEach(async () => {
        await userRepo.deleteUser(userID);
    });

    afterAll(async () => {
        await db.end();
    });

    describe('createUser', () => {
        it('Test with valid input', async () => {
            // Arrange
            const validUserID = userID;

            // Act
            await userRepo.createUser(validUserID);

            // Assert
            const user = await userRepo.getUser(validUserID);
            expect(user.user_id).toEqual(validUserID);
        });

        it('Test with invalid input', async () => {
            // Arrange
            const invalidUserID = 'invalidUserID'.repeat(10);

            // Act and Assert
            await expect(userRepo.createUser(invalidUserID)).rejects.toThrow();
        });

        it('Test with existing user ID', async () => {
            // Arrange
            const existingUserID = userID;

            // Act
            await userRepo.createUser(existingUserID);

            // Assert
            await expect(userRepo.createUser(existingUserID)).rejects.toThrow();
        });

        it('Test with missing or incomplete required fields', async () => {
            // Arrange
            const missingUserID = null;

            // Act and Assert
            await expect(userRepo.createUser(missingUserID)).rejects.toThrow();
        });
    });
});
