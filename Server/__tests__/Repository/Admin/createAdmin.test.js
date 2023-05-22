const AdminRepository = require('../../../repositiories/admin-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AdminRepository', () => {
    let adminRepo;
    let userRepo;
    let userID = 'test-user-id';

    beforeAll(async() => {
        // Create a new adminRepo and userRepo instance before every test.
        adminRepo = new AdminRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    afterAll(
        async () => {
            // delete the user
            await userRepo.deleteUser(userID);
            await db.end();
        }
    );

    describe('createAdmin', () => {
        it('should create an admin with valid input', async () => {
            // Act
            await adminRepo.createAdmin(userID);

            // Assert
            const affectedRows = await db.query('SELECT ROW_COUNT() as count');

            expect(affectedRows[0][0].count).toBe(1);
        });

        it('should return an an error with invalid input', async () => {
            // Act
            await expect(adminRepo.createAdmin('')).rejects.toThrow();
        });

        it('should return an an error when ID already exists', async () => {
            // Act
            await expect(adminRepo.createAdmin(userID)).rejects.toThrow();
        });
    });
});