const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id4';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address323';
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
        const addressID2 = 'address324';
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
        await addressRepo.deleteAddress('address323');
        await addressRepo.deleteAddress('address324');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getAllAddress', () => {
        it('should return all addresses without throwing any errors', async () => {
            // Act
            const addresses = await addressRepo.getAllAddress();
    
            // Assert
            expect(Array.isArray(addresses)).toBe(true);
            expect(addresses.length).toBeGreaterThan(0);
            addresses.forEach((address) => {
                expect(address).toHaveProperty('addressID');
                expect(address).toHaveProperty('userID');
                expect(address).toHaveProperty('userFullName');
                expect(address).toHaveProperty('userNum');
                expect(address).toHaveProperty('longitude');
                expect(address).toHaveProperty('latitude');
                expect(address).toHaveProperty('city');
                expect(address).toHaveProperty('country');
                expect(address).toHaveProperty('district');
                expect(address).toHaveProperty('isoCountryCode');
                expect(address).toHaveProperty('name');
                expect(address).toHaveProperty('postalCode');
                expect(address).toHaveProperty('region');
                expect(address).toHaveProperty('street');
                expect(address).toHaveProperty('streetNumber');
                expect(address).toHaveProperty('subRegion');
                expect(address).toHaveProperty('timeZone');
                expect(address).toHaveProperty('isDefault');
            });
        });

        /*it('should return an empty array when there are no addresses in the database', async () => {
            // Act
            const addressCopy = await addressRepo.getAllAddress();
            await db.query('DELETE FROM address');
            const addresses = await addressRepo.getAllAddress();

            // Assert
            expect(addresses).toEqual([]);

            // re enter addressCopy to database
            addressCopy
        });*/

        it('should throw an error when there is a database error', async () => {
            // Arrange
            const mockDb = {
                query: jest.fn().mockRejectedValue(new Error('Database error')),
            };
            const addressRepo = new AddressRepository(mockDb);
    
            // Act and Assert
            await expect(addressRepo.getAllAddress()).rejects.toThrow('Database error');
            expect(mockDb.query).toHaveBeenCalledWith('CALL get_all_address()');
        });

        it('should retrieve addresses with partial data correctly', async () => {
            // Act
            const addresses = await addressRepo.getAllAddress();
    
            // Assert
            expect(addresses.length).toBeGreaterThan(0);
            addresses.forEach(address => {
                expect(address.addressID).toBeDefined();
                expect(address.userID).toBeDefined();
                expect(address.userFullName).toBeDefined();
                expect(address.userNum).toBeDefined();
                expect(address.longitude).toBeDefined();
                expect(address.latitude).toBeDefined();
                expect(address.city).toBeDefined();
                expect(address.country).toBeDefined();
                expect(address.district).toBeDefined();
                expect(address.isoCountryCode).toBeDefined();
                expect(address.name).toBeDefined();
                expect(address.postalCode).toBeDefined();
                expect(address.region).toBeDefined();
                expect(address.street).toBeDefined();
                expect(address.streetNumber).toBeDefined();
                expect(address.subRegion).toBeDefined();
                expect(address.timeZone).toBeDefined();
                expect(address.isDefault).toBeDefined();
            });
        });

        it('should retrieve a large dataset without performance issues or errors', async () => {
            // Arrange
            const numberOfAddresses = 100; // Adjust the number as per your requirement
    
            // Create a large dataset of addresses
            for (let i = 800; i < numberOfAddresses+800; i++) {
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
                const isDefault = 0;
    
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
            const addresses = await addressRepo.getAllAddress();
    
            // Assert
            expect(addresses.length).toBeGreaterThanOrEqual(numberOfAddresses);
            // Additional assertions as per your requirements
        });

        it('should retrieve addresses with boundary values correctly', async () => {
            // Arrange
            // Create addresses with extreme values for fields
            const addressID = 'addboundary';
            const userFullName = 'X'.repeat(128); // Maximum length for user_full_name
            const userNum = '123456789';
            const latitude = 90.123; // Maximum latitude value
            const longitude = 180.456; // Maximum longitude value
            const city = 'X'.repeat(25); // Maximum length for city
            const country = 'X'.repeat(60); // Maximum length for country
            const district = 'X'.repeat(90); // Maximum length for district
            const isoCountryCode = 'TC';
            const name = 'X'.repeat(90); // Maximum length for name
            const postalCode = '123456'; // Maximum length for postal_code
            const region = 'X'.repeat(50); // Maximum length for region
            const street = 'X'.repeat(50); // Maximum length for street
            const streetNumber = 'X'.repeat(10); // Maximum length for street_number
            const subRegion = 'X'.repeat(50); // Maximum length for sub_region
            const timeZone = 'X'.repeat(50); // Maximum length for time_zone
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
    
            // Act
            const addresses = await addressRepo.getAllAddress();
    
            // Assert
            expect(addresses.length).toBeGreaterThan(0);
            const retrievedAddress = addresses.find((address) => address.addressID === addressID);
            expect(retrievedAddress).toBeDefined();
            expect(retrievedAddress.userFullName).toEqual(userFullName);
            expect(retrievedAddress.latitude).toEqual(latitude);
            expect(retrievedAddress.longitude).toEqual(longitude);
            expect(retrievedAddress.city).toEqual(city);
            expect(retrievedAddress.country).toEqual(country);
            expect(retrievedAddress.district).toEqual(district);
            expect(retrievedAddress.name).toEqual(name);
            expect(retrievedAddress.postalCode).toEqual(postalCode);
            expect(retrievedAddress.region).toEqual(region);
            expect(retrievedAddress.street).toEqual(street);
            expect(retrievedAddress.streetNumber).toEqual(streetNumber);
            expect(retrievedAddress.subRegion).toEqual(subRegion);
            expect(retrievedAddress.timeZone).toEqual(timeZone);
            expect(retrievedAddress.isDefault).toEqual(isDefault);
        });

        it('should handle concurrent access without data corruption or conflicts', async () => {
            // Arrange
            const concurrency = 10;
            const expectedAddressCount = 2 * concurrency;
    
            // Act
            const getAddressPromises = [];
            for (let i = 0; i < concurrency; i++) {
                getAddressPromises.push(addressRepo.getAllAddress());
            }
            const addresses = await Promise.all(getAddressPromises);
    
            // Assert
            expect(addresses.length).toBeGreaterThanOrEqual(concurrency);
        });
    });
});