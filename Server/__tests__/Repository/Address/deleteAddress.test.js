const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id2';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address1235';
        const userFullName = 'John Doe';
        const userNum = '123456789';
        const latitude = 123.456;
        const longitude = 78.90;
        const city = 'Test City';
        const country = 'Test Country';
        const district = 'Test District';
        const isoCountryCode = 'TC';
        const name = 'Test Address';
        const postalCode = '12345';
        const region = 'Test Region';
        const street = 'Test Street';
        const streetNumber = '123';
        const subRegion = 'Test Subregion';
        const timeZone = 'Test Timezone';
        const isDefault = 1;
        
        await addressRepo.createAddress(
            addressID,
            userID,
            userFullName,
            userNum,
            latitude,
            longitude,
            city,
            country,
            district,
            isoCountryCode,
            name,
            postalCode,
            region,
            street,
            streetNumber,
            subRegion,
            timeZone,
            isDefault
        );
    });

    afterEach(async () => {
        await addressRepo.deleteAddress('address1235');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('deleteAddress', () => {
        it('should delete the address successfully with a valid address ID', async () => {
            // Arrange
            const addressID = 'address1235';
    
            // Act
            await addressRepo.deleteAddress(addressID);
    
            // Assert
            const deletedAddressData = await addressRepo.getAddressByID(addressID);
            expect(deletedAddressData).toBeUndefined();
        });

        it('should throw an error for invalid or non-existent address ID', async () => {
            // Arrange
            const invalidAddressID = 'nonexistent123';

            // Act and Assert
            let deletedAddressData = await addressRepo.getAddressByID(invalidAddressID);
            expect(deletedAddressData).toBeUndefined();
        });

        it('should delete the address and ensure database integrity', async () => {
            // Arrange
            const addressID = 'address1235';

            // Fetch the address details from the database before deletion
            const addressBeforeDeletion = await addressRepo.getAddressByID(addressID);

            // Act
            await addressRepo.deleteAddress(addressID);

            // Fetch the address details from the database after deletion
            const addressAfterDeletion = await addressRepo.getAddressByID(addressID);

            // Assert
            // Verify that the address is no longer present in the database
            expect(addressAfterDeletion).toBeUndefined();

            // Compare the retrieved address details with the expected values
            expect(addressBeforeDeletion.addressID).toEqual(addressID);
            expect(addressBeforeDeletion.userID).toEqual(userID);
            // Compare other address properties as needed
        });
    });
});
