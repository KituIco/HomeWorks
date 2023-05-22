const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id6';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address523';
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
        const addressID2 = 'address524';
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
        await addressRepo.deleteAddress('address523');
        await addressRepo.deleteAddress('address524');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getAddressByID', () => {
        it('should retrieve the corresponding address for a valid address ID', async () => {
            // Arrange
            const addressID = 'address523';
            const expectedAddress = {
                addressID: addressID,
                userID: userID,
                userFullName: 'John Doe',
                userNum: '123456789',
                longitude: 78.90,
                latitude: 123.456,
                city: 'Test City',
                country: 'Test Country',
                district: 'Test District',
                isoCountryCode: 'TC',
                name: 'Test Address',
                postalCode: '12345',
                region: 'Test Region',
                street: 'Test Street',
                streetNumber: '123',
                subRegion: 'Test Subregion',
                timeZone: 'Test Timezone',
                isDefault: 1
            };
    
            // Act
            const result = await addressRepo.getAddressByID(addressID);
    
            // Assert
            expect(result).toEqual(expectedAddress);
        });
        
        it('should return undefined for an invalid address ID', async () => {
            // Arrange
            const invalidAddressID = 'invalid-address-id';
    
            // Act
            await expect(addressRepo.getAddressByID(invalidAddressID)).rejects.toThrow();
        });

        it('should handle a null address ID', async () => {
            // Arrange
            const nullAddressID = null;
    
            // Act & Assert
            await expect(addressRepo.getAddressByID(nullAddressID)).toBeDefined();
        });

        it('should handle a database error scenario', async () => {
            // Arrange
            const invalidAddressID = 'invalid-address-id';
    
            // Act & Assert
            await expect(addressRepo.getAddressByID(invalidAddressID)).rejects.toThrow();
        });
        
        it('should handle querying a large number of address IDs sequentially', async () => {
            // Arrange
            const numberOfAddresses = 1000;
            const addressIDs = [];
    
            // Generate a large number of address IDs
            for (let i = 0; i < numberOfAddresses; i++) {
                addressIDs.push(`address${i}`);
            }
    
            // Act
            const startTime = Date.now();
            for (const addressID of addressIDs) {
                await addressRepo.getAddressByID(addressID);
            }
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
    
            // Assert
            console.log(`Sequential execution time for ${numberOfAddresses} addresses: ${elapsedTime}ms`);
        });
    
        it('should handle querying a large number of address IDs concurrently', async () => {
            // Arrange
            const numberOfAddresses = 1000;
            const addressIDs = [];
    
            // Generate a large number of address IDs
            for (let i = 0; i < numberOfAddresses; i++) {
                addressIDs.push(`address${i}`);
            }
    
            // Act
            const startTime = Date.now();
            await Promise.all(addressIDs.map(addressID => addressRepo.getAddressByID(addressID)));
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
    
            // Assert
            console.log(`Concurrent execution time for ${numberOfAddresses} addresses: ${elapsedTime}ms`);
        });

        it('should retrieve the correct address information for each ID', async () => {
            // Arrange
            const addressID1 = 'address523';
            const addressID2 = 'address524';
    
            // Act
            const address1 = await addressRepo.getAddressByID(addressID1);
            const address2 = await addressRepo.getAddressByID(addressID2);
    
            // Assert
            expect(address1).toBeDefined();
            expect(address1.addressID).toBe(addressID1);
            // Add more assertions for the remaining fields of the address object
    
            expect(address2).toBeDefined();
            expect(address2.addressID).toBe(addressID2);
            // Add more assertions for the remaining fields of the address object
        });

        it('should handle boundary values for address ID parameter', async () => {
            // Arrange
            const minimumAddressID = 'a';
            const maximumAddressID = 'a'.repeat(14);
    
            // Act
            const address1 = await addressRepo.getAddressByID(minimumAddressID);
            const address2 = await addressRepo.getAddressByID(maximumAddressID);
    
            // Assert
            expect(address1).toBeUndefined();
            expect(address2).toBeUndefined();
        });
    });
});