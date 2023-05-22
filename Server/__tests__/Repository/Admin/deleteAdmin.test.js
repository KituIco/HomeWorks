const AdminRepository = require('../../../repositiories/admin-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');

describe('AdminRepository', () => {
    let adminRepo;
    let userRepo;
    let userID = 'adm-user-id';

    beforeAll(async() => {
        // Create a new adminRepo and userRepo instance before every test.
        adminRepo = new AdminRepository(db);
        userRepo = new UserRepository(db);
    });

    beforeEach(
        async () => {
            // create a new user
            await userRepo.createUser(userID);

            // create a new admin
            await adminRepo.createAdmin(userID);
        }
    );

    afterEach(
        async () => {
            // delete the user
            await userRepo.deleteUser(userID);
        }
    );

    afterAll(
        async () => {
            // delete the user
            await userRepo.deleteUser(userID);
            await db.end();
        }
    );

    describe('deleteAdmin', () => {
        it('should delete the admin record and associated user record without errors', async () => {
            // Provide a valid admin ID that exists in the Admin table
    
            // Verify that the function executes without throwing an error
            await expect(adminRepo.deleteAdmin(userID)).resolves.not.toThrow();
    
            // Verify that the associated user record is deleted from the database due to ON DELETE CASCADE constraint
            const deletedUser = await userRepo.getUser(userID);
            expect(deletedUser).toBeUndefined();
        });

        it('should not delete any admin if invalid admin ID is provided', async () => {
            // Pass an invalid or non-existent admin ID to the function
            const invalidAdminID = 'invalid-id';
        
            // Get the initial count of admins in the database
            const initialAdminCount = await db.query('SELECT COUNT(*) as count FROM Admin');
        
            // Call the deleteAdmin function with the invalid admin ID
            await adminRepo.deleteAdmin(invalidAdminID);
        
            // Get the count of admins in the database after the function call
            const finalAdminCount = await db.query('SELECT COUNT(*) as count FROM Admin');
        
            // Assert that the count remains unchanged
            expect(finalAdminCount[0][0].count).toBe(initialAdminCount[0][0].count);
        });

        it('handles admin ID in a different format correctly', async () => {
            const adminID = "invalid-admin-id";

            // Verify that it thorws an error when the admin ID is not a string
            await expect(adminRepo.deleteAdmin(adminID)).rejects.toThrow();
        });
    });
});