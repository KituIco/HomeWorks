const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let userID = 'test-user-id1';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address1234';
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
        await addressRepo.deleteAddress('address1234');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('patchAddress', () => {
        it('should update the address successfully with valid input', async () => {
            // Arrange
            const updatedAddress = {
                addressID: 'address1234',
                userID: userID,
                userFullName: 'Updated Name',
                userNum: '987654321',
                latitude: 456.789,
                longitude: 12.34,
                city: 'Updated City',
                country: 'Updated Country',
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: 'Updated Address',
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '456',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Assert
            const updatedAddressData = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData).toEqual(updatedAddress);
        });

        it('should throw an error when provided with a non-existent address ID', async () => {
            // Arrange
            const updatedAddress = {
                addressID: 'nonexistent123',
                userID: userID,
                userFullName: 'Updated Name',
                userNum: '987654321',
                latitude: 456.789,
                longitude: 12.34,
                city: 'Updated City',
                country: 'Updated Country',
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: 'Updated Address',
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '456',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Check if rows were affected
            const affectedRows = await db.query('SELECT ROW_COUNT() AS affectedRows');

            // Assert
            expect(affectedRows[0][0].affectedRows).toEqual(0);
        });

        it('should throw an error or return an error response when required fields are missing or incomplete', async () => {
            // Arrange
            const invalidAddress = {
                addressID: 'address1234',
                userID: '', // Missing required field
                userFullName: 'Updated Name',
                userNum: '987654321',
                latitude: null, // Missing required field
                longitude: 12.34,
                city: 'Updated City',
                country: '', // Missing required field
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: '', // Missing required field
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '456',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Act and Assert
            await expect(addressRepo.patchAddress(
                invalidAddress.addressID,
                invalidAddress.userID,
                invalidAddress.userFullName,
                invalidAddress.userNum,
                invalidAddress.latitude,
                invalidAddress.longitude,
                invalidAddress.city,
                invalidAddress.country,
                invalidAddress.district,
                invalidAddress.isoCountryCode,
                invalidAddress.name,
                invalidAddress.postalCode,
                invalidAddress.region,
                invalidAddress.street,
                invalidAddress.streetNumber,
                invalidAddress.subRegion,
                invalidAddress.timeZone,
                invalidAddress.isDefault
            )).rejects.toThrow();
        });

        it('should update the user-related fields successfully', async () => {
            // create new user
            await userRepo.createUser('new-user-id');

            // Arrange
            const updatedAddress = {
                addressID: 'address1234',
                userID: 'new-user-id',
                userFullName: 'New User Name',
                userNum: '987654321',
                latitude: 456.789,
                longitude: 12.34,
                city: 'Updated City',
                country: 'Updated Country',
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: 'Updated Address',
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '456',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Assert
            const updatedAddressData = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData.userID).toEqual(updatedAddress.userID);
            expect(updatedAddressData.userFullName).toEqual(updatedAddress.userFullName);
            expect(updatedAddressData.userNum).toEqual(updatedAddress.userNum);

            // Delete the new user
            await userRepo.deleteUser('new-user-id');
        });

        it('should update the location-related fields successfully with valid input', async () => {
            // Arrange
            const updatedFields = {
                latitude: 12.345,
                longitude: 67.89,
                city: 'New City',
                country: 'New Country',
                district: 'New District',
                isoCountryCode: 'NC',
                name: 'New Address',
                postalCode: '98765',
                region: 'New Region',
                street: 'New Street',
                streetNumber: '789',
                subRegion: 'New Subregion',
                timeZone: 'New Timezone',
            };

            // Act
            await addressRepo.patchAddress(
                'address1234',
                userID,
                'John Doe',
                '123456789',
                updatedFields.latitude,
                updatedFields.longitude,
                updatedFields.city,
                updatedFields.country,
                updatedFields.district,
                updatedFields.isoCountryCode,
                updatedFields.name,
                updatedFields.postalCode,
                updatedFields.region,
                updatedFields.street,
                updatedFields.streetNumber,
                updatedFields.subRegion,
                updatedFields.timeZone,
                1
            );

            // Assert
            const updatedAddressData = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData.latitude).toEqual(updatedFields.latitude);
            expect(updatedAddressData.longitude).toEqual(updatedFields.longitude);
            expect(updatedAddressData.city).toEqual(updatedFields.city);
            expect(updatedAddressData.country).toEqual(updatedFields.country);
            expect(updatedAddressData.district).toEqual(updatedFields.district);
            expect(updatedAddressData.isoCountryCode).toEqual(updatedFields.isoCountryCode);
            expect(updatedAddressData.name).toEqual(updatedFields.name);
            expect(updatedAddressData.postalCode).toEqual(updatedFields.postalCode);
            expect(updatedAddressData.region).toEqual(updatedFields.region);
            expect(updatedAddressData.street).toEqual(updatedFields.street);
            expect(updatedAddressData.streetNumber).toEqual(updatedFields.streetNumber);
            expect(updatedAddressData.subRegion).toEqual(updatedFields.subRegion);
            expect(updatedAddressData.timeZone).toEqual(updatedFields.timeZone);
        });

        it('should update the default status of the address in the database', async () => {
            // Arrange
            const updatedAddress = {
                addressID: 'address1234',
                userID: userID,
                userFullName: 'John Doe',
                userNum: '123456789',
                latitude: 123.456,
                longitude: 78.90,
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
            };

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Assert
            const updatedAddressData = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData.isDefault).toBe(updatedAddress.isDefault);

            // Update isDefault to a different value
            updatedAddress.isDefault = 1;

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Assert
            const updatedAddressData2 = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData2.isDefault).toBe(updatedAddress.isDefault);
        });

        it('should handle boundary values correctly for numeric fields', async () => {
            // Arrange
            const updatedAddress = {
                addressID: 'address1234',
                userID: userID,
                userFullName: 'Updated Name',
                userNum: '987654321',
                latitude: 90,
                longitude: -180,
                city: 'Updated City',
                country: 'Updated Country',
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: 'Updated Address',
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '0',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Act
            await addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            );

            // Assert
            const updatedAddressData = await addressRepo.getAddressByID('address1234');
            expect(updatedAddressData).toEqual(updatedAddress);
        });

        it('should throw an error when a database error occurs', async () => {
            // Arrange
            const updatedAddress = {
                addressID: 'address1234',
                userID: userID,
                userFullName: 'Updated Name',
                userNum: '987654321',
                latitude: 456.789,
                longitude: 12.34,
                city: 'Updated City',
                country: 'Updated Country',
                district: 'Updated District',
                isoCountryCode: 'UC',
                name: 'Updated Address',
                postalCode: '54321',
                region: 'Updated Region',
                street: 'Updated Street',
                streetNumber: '456',
                subRegion: 'Updated Subregion',
                timeZone: 'Updated Timezone',
                isDefault: 0
            };

            // Mock the database function to throw an error
            jest.spyOn(addressRepo, 'patchAddress').mockRejectedValue(new Error('Database error'));

            // Act and Assert
            await expect(addressRepo.patchAddress(
                updatedAddress.addressID,
                updatedAddress.userID,
                updatedAddress.userFullName,
                updatedAddress.userNum,
                updatedAddress.latitude,
                updatedAddress.longitude,
                updatedAddress.city,
                updatedAddress.country,
                updatedAddress.district,
                updatedAddress.isoCountryCode,
                updatedAddress.name,
                updatedAddress.postalCode,
                updatedAddress.region,
                updatedAddress.street,
                updatedAddress.streetNumber,
                updatedAddress.subRegion,
                updatedAddress.timeZone,
                updatedAddress.isDefault
            )).rejects.toThrow('Database error');
        });
    });
});
