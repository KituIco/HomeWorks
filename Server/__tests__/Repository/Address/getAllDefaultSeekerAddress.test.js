const AddressRepository = require('../../../repositiories/address-repo.js');
const UserRepository = require('../../../repositiories/user-repo.js');
const SeekerRepository = require('../../../repositiories/seeker-repo.js');
const db = require('../../../middlewares/mysql_data_access.js');

describe('AddressRepository', () => {
    let addressRepo;
    let userRepo;
    let seekerRepo;
    let userID = 'test-user-id8';

    beforeAll(async() => {
        // Create a new addressRepo and userRepo instance before every test.
        addressRepo = new AddressRepository(db);
        userRepo = new UserRepository(db);
        seekerRepo = new SeekerRepository(db);

        // create a new user
        await userRepo.createUser(userID);

        // create a new provider
        await seekerRepo.createSeeker(
            userID,
            'John',
            'Doe',
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new address
        const addressID = 'address723';
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
        const addressID2 = 'address724';
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
        await addressRepo.deleteAddress('address723');
        await addressRepo.deleteAddress('address724');
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getAllDefaultSeekerAddress', () => {
        it('should return the correct list of default seeker addresses', async () => {
            // Arrange
            const addressID1 = 'address723';
    
            // Act
            const defaultAddresses = await addressRepo.getAllDefaultSeekerAddress();
    
            // Assert
            expect(defaultAddresses).toHaveLength(1);
            expect(defaultAddresses[0].addressID).toBe(addressID1);
            expect(defaultAddresses[0].userID).toBe(userID);
            expect(defaultAddresses[0].userFullName).toBe('John Doe');
            // Add more assertions for other address properties if necessary
        });

        /*it('should return an empty list when no default provider addresses exist', async () => {
            // Arrange
            let addresses = await addressRepo.getAllAddress();
            addresses.forEach(async (address) => {
                await addressRepo.patchAddress(address.addressID, address.userID, address.userFullName, address.userNum, address.latitude, address.longitude, address.city, address.country, address.district, address.isoCountryCode, address.name, address.postalCode, address.region, address.street, address.streetNumber, address.subRegion, address.timeZone, 0);
            });
    
            // Act
            const defaultProviderAddresses = await addressRepo.getAllDefaultProviderAddress();
    
            // Assert
            expect(defaultProviderAddresses).toHaveLength(0);
        });*/

        it('should return only the default Seeker addresses and exclude non-default ones', async () => {
            // Act
            const defaultAddresses = await addressRepo.getAllDefaultSeekerAddress();
    
            // Assert
            expect(defaultAddresses.length).toBe(1); // Assuming only one default address exists
            const defaultAddress = defaultAddresses[0];
            expect(defaultAddress.isDefault).toBe(1);
        });
    });
});
