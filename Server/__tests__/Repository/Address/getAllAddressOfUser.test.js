const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id5';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address423';
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
        const addressID2 = 'address424';
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
        await addressRepo.deleteAddress('address423');
        await addressRepo.deleteAddress('address424');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getAllAddressOfUser', () => {
        it('should return addresses associated with a valid user ID', async () => {
            // Arrange
            const expectedUserID = userID;
            const expectedAddressCount = 2;
    
            // Act
            const addresses = await addressRepo.getAllAddressOfUser(expectedUserID);
    
            // Assert
            expect(addresses).toHaveLength(expectedAddressCount);
            addresses.forEach((address) => {
                expect(address.userID).toBe(expectedUserID);
            });
        });

        it('should handle an invalid user ID and return an empty list', async () => {
            // Arrange
            const invalidUserID = 'invaluserid';
    
            // Act
            const addresses = await addressRepo.getAllAddressOfUser(invalidUserID);
    
            // Assert
            expect(addresses).toHaveLength(0);
        });

        it('should return an empty result for a user with no addresses', async () => {
            // Arrange
            const emptyUser = 'emptyuserid';
            await userRepo.createUser(emptyUser);
    
            // Act
            const addresses = await addressRepo.getAllAddressOfUser(emptyUser);
    
            // Assert
            expect(addresses).toHaveLength(0);

            // Cleanup
            await userRepo.deleteUser(emptyUser);
        });

        it('should return all addresses associated with the user', async () => {
            // Arrange
            const expectedAddressCount = 2;
    
            // Act
            const addresses = await addressRepo.getAllAddressOfUser(userID);
    
            // Assert
            expect(addresses).toHaveLength(expectedAddressCount);
    
            // Check if the returned addresses match the expected addresses in the database
            const expectedAddresses = [
                {
                    addressID: 'address423',
                    userID: userID,
                    userFullName: 'John Doe',
                    userNum: '123456789',
                    latitude: 123.456,
                    longitude: 78.9,
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
                },
                {
                    addressID: 'address424',
                    userID: userID,
                    userFullName: 'John Doe',
                    userNum: '123456789',
                    latitude: 123.456,
                    longitude: 78.9,
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
                    isDefault: 0
                }
            ];
    
            addresses.forEach((address, index) => {
                expect(address).toEqual(expectedAddresses[index]);
            });
        });

        it('should return all addresses correctly for a user with a large number of addresses', async () => {
            // Arrange
            const largeNumberOfAddresses = 100;
            const expectedAddressCount = largeNumberOfAddresses;
    
            // Create a user with a large number of addresses
            for (let i = 0; i < largeNumberOfAddresses; i++) {
                const addressID = `address${i + 1}`;
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
            }
    
            // Act
            const addresses = await addressRepo.getAllAddressOfUser(userID);
    
            // Assert
            expect(addresses.length).toBeGreaterThanOrEqual(expectedAddressCount);
            addresses.forEach((address) => {
                expect(address.userID).toBe(userID);
            });
        });
    });
});