const ProviderRepository = require('../../../repositiories/provider-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ProviderRepository', () => {
    let providerRepo;
    let userRepo;
    let userID = nanoid(10);

    beforeAll(async () => {
        // Create a new providerRepo instance before every test.
        providerRepo = new ProviderRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
    });

    beforeEach(async () => {
        // create a new provider
        const newProvider = {
            providerID: userID,
            firstName: 'John',
            lastName: 'Doe',
            birthdate: null,
            gender: null,
            providerDP: null,
            validID: null,
            agencyID: null,
            verified: null,
            rating: null,
        };

        await providerRepo.createProvider(
            newProvider.providerID,
            newProvider.firstName,
            newProvider.lastName,
            newProvider.birthdate,
            newProvider.gender,
            newProvider.providerDP,
            newProvider.validID,
            newProvider.agencyID,
            newProvider.verified,
            newProvider.rating
        );
    });

    afterEach(async () => {
        // Delete the user
        await providerRepo.deleteProvider(userID);
    });

    afterAll(async () => {
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('patchProvider', () => {
        it('Test with valid input', async () => {
            // Prepare valid input values
            const updatedProvider = {
                firstName: 'Jane',
                lastName: 'Smith',
                birthdate: '1990-01-01',
                gender: 'Female',
                providerDP: 'http://example.com/profile.jpg',
                validID: 'ABCD1234',
                agencyID: 'XYZ123',
                verified: true,
                accepting: true,
                aveRating: 4.5,
                totalReviews: 10,
                reviewCount: 5,
                fiveStar: 2,
                fourStar: 1,
                threeStar: 1,
                twoStar: 1,
                oneStar: 0,
            };

            // Call the function to update provider
            await providerRepo.patchProvider(
                userID,
                updatedProvider.firstName,
                updatedProvider.lastName,
                updatedProvider.birthdate,
                updatedProvider.gender,
                updatedProvider.providerDP,
                updatedProvider.validID,
                updatedProvider.agencyID,
                updatedProvider.verified,
                updatedProvider.accepting,
                updatedProvider.aveRating,
                updatedProvider.totalReviews,
                updatedProvider.reviewCount,
                updatedProvider.fiveStar,
                updatedProvider.fourStar,
                updatedProvider.threeStar,
                updatedProvider.twoStar,
                updatedProvider.oneStar
            );

            // Verify that the provider's information is successfully updated in the database
            const updatedProviderInfo = await providerRepo.getProvider(userID);
            expect(updatedProviderInfo.firstName).toBe(
                updatedProvider.firstName
            );
            expect(updatedProviderInfo.lastName).toBe(updatedProvider.lastName);
            // Add assertions for other fields
        });

        it('Test with invalid input', async () => {
            // Prepare invalid input values (e.g., empty strings or exceeding length limits)

            // Call the function to update provider with invalid input
            await expect(
                providerRepo.patchProvider(
                    userID,
                    'a'.repeat(256),
                    'a'.repeat(256),
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
            ).rejects.toThrow();
        });

        it('Test with non-existent provider ID', async () => {
            // Prepare a non-existent provider ID
            const nonExistentProviderID = 'nonexistentprovider';

            // Call the function to update a non-existent provider
            await expect(
                providerRepo.patchProvider(nonExistentProviderID, null)
            ).rejects.toThrow();
        });
    });
});
