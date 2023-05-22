const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id3';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address223';
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

        // create a new address 2
        const addressID2 = 'address224';
        const isDefault2 = 0;
        
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

        await addressRepo.createAddress(
            addressID2,
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
            isDefault2
        );
    });

    afterEach(async () => {
        await addressRepo.deleteAddress('address223');
        await addressRepo.deleteAddress('address224');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('setAddressDefault', () => {
        it('should update the is_default field of the specified address to the desired value', async () => {
            // Arrange
            const addressID = 'address223';
            const addressID2 = 'address224';
    
            // Act
            await addressRepo.setAddressDefault(addressID2, userID);
    
            // Assert
            const updatedAddressData = await addressRepo.getAddressByID(addressID2);
            const updatedAddressData2 = await addressRepo.getAddressByID(addressID);
            expect(updatedAddressData.isDefault).toEqual(1);
            expect(updatedAddressData2.isDefault).toEqual(0);
        });
    });

    it('should throw an error when an invalid addressID is provided', async () => {
        // Arrange
        const invalidAddressID = 'invalid-address-id';
    
        // Act and Assert
        await expect(addressRepo.setAddressDefault(invalidAddressID, userID)).rejects.toThrow();
    });

    it('should throw an error or return an error response when an invalid user ID is provided', async () => {
        // Arrange
        const addressID = 'address223';
        const invalidUserID = 'invalid-user-id';

        // Act and Assert
        await expect(addressRepo.setAddressDefault(addressID, invalidUserID)).rejects.toThrow();
    });
});