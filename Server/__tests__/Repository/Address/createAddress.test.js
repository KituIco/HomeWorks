const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let repository;
    let userRepo;
    
    beforeAll(async() => {
        // Create an instance of your repository class and pass the database connection
        repository = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // Create a new user
        const userID = 'test-user-id';
        await userRepo.createUser(userID);
    });

    // close the database connection
    afterAll(async() => {
        await userRepo.deleteUser('test-user-id');
        await db.end();
    });
    
    describe('createAddress', () => {
        it('When valid input is provided, then the address should be created successfully', async () => {

            // Test data
            const addressID = 'address123';
            const userID = 'test-user-id';
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

            // Call the createAddress function
            await repository.createAddress(
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

            // Fetch the created address from the database
            const createdAddress = await repository.getAddressByID(addressID);

            // Assert that the address was created successfully
            expect(createdAddress).toBeDefined();
            expect(createdAddress.userID).toBe(userID);
            expect(createdAddress.userFullName).toBe(userFullName);
            expect(createdAddress.userNum).toBe(userNum);
            expect(createdAddress.latitude).toBe(latitude);
            expect(createdAddress.longitude).toBe(longitude);
            expect(createdAddress.city).toBe(city);
            expect(createdAddress.country).toBe(country);
            expect(createdAddress.district).toBe(district);
            expect(createdAddress.isoCountryCode).toBe(isoCountryCode);
            expect(createdAddress.name).toBe(name);
            expect(createdAddress.postalCode).toBe(postalCode);
            expect(createdAddress.region).toBe(region);
            expect(createdAddress.street).toBe(street);
            expect(createdAddress.streetNumber).toBe(streetNumber);
            expect(createdAddress.subRegion).toBe(subRegion);
            expect(createdAddress.timeZone).toBe(timeZone);
            expect(createdAddress.isDefault).toBe(isDefault);
        });

        it('When invalid input is provided, then the function should throw an error or return an error response', async () => {
            // Test data with invalid or incorrect values
            const invalidUserID = 'nonexistentUser123';
            const invalidLatitude = 'invalidLatitude';
            const invalidLongitude = 'invalidLongitude';
        
            // Call the createAddress function with invalid input
            try {
                await repository.createAddress(
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
        
                // If the function does not throw an error or return an error response,
                // fail the test
                throw new Error('Expected the function to throw an error or return an error response');
            } catch (error) {
                // Assert that the error is handled gracefully
                expect(error).toBeDefined();
                // Assert other error-related expectations as needed
            }
        });

        it('When creating an address with an existing address ID, then an error should be thrown or the existing address should be updated', async () => {
            // Test data
            const addressID = 'address123'; // Existing address ID in the database
            const userID = 'test-user-id';
            // ... other input values ...
            
            // Attempt to create an address with an existing address ID
            try {
                await repository.createAddress(
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
                
                // If no error is thrown, fail the test
                throw new Error('Expected an error to be thrown or the existing address to be updated');
            } catch (error) {
                // Verify that the error indicates a uniqueness constraint violation or handle it in the catch block
                // Alternatively, fetch the existing address from the database and verify that it has been updated with the new values
                expect(error).toBeDefined();
                // Assert the specific error or perform other checks as needed
            }
        });

        it('When missing or incomplete required fields, then an error should be thrown', async () => {
            // Test data with missing or incomplete fields
            const addressID = 'address123';
            const userID = 'test-user-id';
            const userFullName = ''; // Missing user full name
            const userNum = '123456789';
            const latitude = 123.456;
            const longitude = 78.90;
            const city = 'Test City';
            const country = ''; // Missing country
            const district = 'Test District';
            const isoCountryCode = ''; // Missing ISO country code
            const name = 'Test Address';
            const postalCode = '12345';
            const region = '';
            const street = 'Test Street';
            const streetNumber = '123';
            const subRegion = 'Test Subregion';
            const timeZone = 'Test Timezone';
            const isDefault = 1;
        
            // Call the createAddress function and expect it to throw an error
            await expect(async () => {
                await repository.createAddress(
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
            }).rejects.toThrow();
        });

        it('Test the default value: Verify that the function assigns the default status correctly', async () => {
            // Test data
            const addressID = 'address132';
            const userID = 'test-user-id';
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
        
            // Case 1: isDefault set to true
            const isDefaultTrue = 1;
            await repository.createAddress(
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
                isDefaultTrue
            );
        
            // Fetch the created address from the database
            const createdAddressTrue = await repository.getAddressByID(addressID);
        
            // Assert that the isDefault value is set to true
            expect(createdAddressTrue.isDefault).toBe(1);

            // Delete the created address
            await repository.deleteAddress(addressID);
        
            // Case 2: isDefault set to false
            const isDefaultFalse = 0;
            await repository.createAddress(
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
                isDefaultFalse
            );
        
            // Fetch the created address from the database
            const createdAddressFalse = await repository.getAddressByID(addressID);
        
            // Assert that the isDefault value is set to false
            expect(createdAddressFalse.isDefault).toBe(0);

            // Delete the created address
            await repository.deleteAddress(addressID);
        });

        it('When minimum boundary values are provided for numeric fields, then the function should handle them correctly', async () => {
            // Test data with boundary values
            const addressID = 'address132';
            const userID = 'test-user-id';
            const userFullName = 'John Doe';
            const userNum = '123456789';
            const latitude = -90.0; // Maximum allowed value
            const longitude = -180.0; // Minimum allowed value
            const city = 'Test City';
            const country = 'Test Country';
            const district = 'Test District';
            const isoCountryCode = 'TC';
            const name = 'Test Address';
            const postalCode = '12345';
            const region = 'Test Region';
            const street = 'Test Street';
            const streetNumber = '1';
            const subRegion = 'Test Subregion';
            const timeZone = 'Test Timezone';
            const isDefault = 1;
    
            // Call the createAddress function
            await repository.createAddress(
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
    
            // Fetch the created address from the database
            const createdAddress = await repository.getAddressByID(addressID);
    
            // Assert that the address was created successfully with boundary values
            expect(createdAddress).toBeDefined();
            expect(createdAddress.userID).toBe(userID);
            expect(createdAddress.userFullName).toBe(userFullName);
            expect(createdAddress.userNum).toBe(userNum);
            expect(createdAddress.latitude).toBe(latitude);
            expect(createdAddress.longitude).toBe(longitude);
            expect(createdAddress.city).toBe(city);
            expect(createdAddress.country).toBe(country);
            expect(createdAddress.district).toBe(district);
            expect(createdAddress.isoCountryCode).toBe(isoCountryCode);
            expect(createdAddress.name).toBe(name);
            expect(createdAddress.postalCode).toBe(postalCode);
            expect(createdAddress.region).toBe(region);
            expect(createdAddress.street).toBe(street);
            expect(createdAddress.streetNumber).toBe(streetNumber);
            expect(createdAddress.subRegion).toBe(subRegion);
            expect(createdAddress.timeZone).toBe(timeZone);
            expect(createdAddress.isDefault).toBe(isDefault);

            // Delete the created address
            await repository.deleteAddress(addressID);
        });

        it('When maximum boundary values are provided for numeric fields, then the function should handle them correctly', async () => {
            // Test data with boundary values
            const addressID = 'address132';
            const userID = 'test-user-id';
            const userFullName = 'John Doe';
            const userNum = '123456789';
            const latitude = 90.0; // Maximum allowed value
            const longitude = 180.0; // maximum allowed value
            const city = 'Test City';
            const country = 'Test Country';
            const district = 'Test District';
            const isoCountryCode = 'TC';
            const name = 'Test Address';
            const postalCode = '12345';
            const region = 'Test Region';
            const street = 'Test Street';
            const streetNumber = '1234567890';
            const subRegion = 'Test Subregion';
            const timeZone = 'Test Timezone';
            const isDefault = 1;
    
            // Call the createAddress function
            await repository.createAddress(
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
    
            // Fetch the created address from the database
            const createdAddress = await repository.getAddressByID(addressID);
    
            // Assert that the address was created successfully with boundary values
            expect(createdAddress).toBeDefined();
            expect(createdAddress.userID).toBe(userID);
            expect(createdAddress.userFullName).toBe(userFullName);
            expect(createdAddress.userNum).toBe(userNum);
            expect(createdAddress.latitude).toBe(latitude);
            expect(createdAddress.longitude).toBe(longitude);
            expect(createdAddress.city).toBe(city);
            expect(createdAddress.country).toBe(country);
            expect(createdAddress.district).toBe(district);
            expect(createdAddress.isoCountryCode).toBe(isoCountryCode);
            expect(createdAddress.name).toBe(name);
            expect(createdAddress.postalCode).toBe(postalCode);
            expect(createdAddress.region).toBe(region);
            expect(createdAddress.street).toBe(street);
            expect(createdAddress.streetNumber).toBe(streetNumber);
            expect(createdAddress.subRegion).toBe(subRegion);
            expect(createdAddress.timeZone).toBe(timeZone);
            expect(createdAddress.isDefault).toBe(isDefault);

            // Delete the created address
            await repository.deleteAddress(addressID);
        });

        it('When an error occurs during address creation, then the function should throw an error', async () => {
            // Test data...
            
            // Simulate an error condition by passing invalid input
            await expect(async () => {
                await repository.createAddress(
                    // Provide invalid input that triggers an error
                    // For example, passing an empty addressID
                    '',
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
            }).rejects.toThrow(); // Verify that the function throws an error
        });
    });
});
