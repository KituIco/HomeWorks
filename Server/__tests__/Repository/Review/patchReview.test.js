const ReviewRepository = require('../../../repositiories/review-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const ServiceRepository = require('../../../repositiories/service-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('ReviewRepository', () => {
    let reviewRepo;
    let userRepo;
    let providerRepo;
    let seekerRepo;
    let serviceRepo;
    let userID1 = nanoid(10);
    let userID2 = nanoid(10);
    let serviceID = nanoid(10);
    let reviewID = nanoid(10);

    beforeAll(async () => {
        // Create a new reviewRepo instance before every test.
        reviewRepo = new ReviewRepository(db);
        userRepo = new UserRepository(db);
        providerRepo = new ProviderRepository(db);
        seekerRepo = new SeekerRepository(db);
        serviceRepo = new ServiceRepository(db);

        // create a new user
        await userRepo.createUser(userID1);
        await userRepo.createUser(userID2);

        // create a new seeker
        await seekerRepo.createSeeker(userID1, 'John', 'Doe', null, null, null);

        // create a new provider
        await providerRepo.createProvider(
            userID2,
            'John',
            'Doe',
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );

        // create a new service
        const typeID = '1';
        const typeName = 'Car Mechanic';

        await serviceRepo.createService(
            serviceID,
            userID2,
            typeID,
            typeName,
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new review
        const newReview = {
            reviewID: reviewID,
            serviceID: serviceID,
            seekerID: userID1,
            dateTimestamp: Date.now(),
            rating: 5,
            comment: 'test-comment',
            images: 'test-images',
        };

        await reviewRepo.createReview(
            newReview.reviewID,
            newReview.serviceID,
            newReview.seekerID,
            newReview.dateTimestamp,
            newReview.rating,
            newReview.comment,
            newReview.images
        );
    });

    afterEach(async () => {
        // Delete the review after every test.
        await reviewRepo.deleteReview(reviewID);
    });

    afterAll(async () => {
        // Delete the provider after every test.
        await providerRepo.deleteProvider(userID2);

        // Delete the seeker after every test.
        await seekerRepo.deleteSeeker(userID1);

        // Delete the service after every test.
        await serviceRepo.deleteService(serviceID);

        // Delete the user after every test.
        await userRepo.deleteUser(userID1);
        await userRepo.deleteUser(userID2);

        // Close the database connection after every test.
        await db.end();
    });

    describe('patchReview', () => {
        it('should patch the review with valid input', async () => {
            // Provide valid values for all parameters
            const updatedReview = {
                reviewId: reviewID,
                serviceId: serviceID,
                seekerId: userID1,
                dateTimestamp: Date.now(),
                rating: 4,
                comment: 'updated-comment',
                images: 'updated-images',
            };

            // Call the patchReview function
            await reviewRepo.patchReview(
                updatedReview.reviewId,
                updatedReview.serviceId,
                updatedReview.seekerId,
                updatedReview.dateTimestamp,
                updatedReview.rating,
                updatedReview.comment,
                updatedReview.images
            );

            // Call the getReview function to retrieve the patched review
            const result = await reviewRepo.getReview(updatedReview.reviewId);

            // Assert that the function executes without throwing an error
            expect(result).toBeTruthy();
            expect(result).toEqual(updatedReview);
        });

        it('should handle invalid input and throw appropriate errors', async () => {
            // Pass invalid or incorrect values for some parameters
            const invalidReviewID = 'invalid-review-id';
            const nonExistentServiceID = 'non-existent-service-id';
            const nonExistentSeekerID = 'non-existent-seeker-id';

            // Call the patchReview function with invalid input
            await expect(
                reviewRepo.patchReview(
                    invalidReviewID,
                    nonExistentSeekerID,
                    nonExistentServiceID,
                    Date.now(),
                    4,
                    'updated-comment',
                    'updated-images'
                )
            ).rejects.toThrow();
        });

        it('should handle missing or incomplete required fields and throw errors', async () => {
            // get the review before patching
            const originalReview = await reviewRepo.getReview(reviewID);

            // Call the patchReview function with missing fields
            await reviewRepo.patchReview(
                reviewID,
                null,
                null,
                null,
                null,
                null,
                null
            );

            // Call the getReview function to retrieve the patched review
            const result = await reviewRepo.getReview(reviewID);

            // Assert that the function executes without throwing an error
            expect(originalReview).toStrictEqual(result);
        });
    });
});
