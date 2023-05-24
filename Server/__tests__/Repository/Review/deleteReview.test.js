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

    describe('deleteReview', () => {
        it('should delete a review with an existing review ID', async () => {
            // Call the deleteReview function with an existing review ID
            await reviewRepo.deleteReview(reviewID);

            // Verify that the review is deleted from the database
            const deletedReview = await reviewRepo.getReview(reviewID);
            expect(deletedReview).not.toBeDefined();
        });

        it('should not delete any reviews with a non-existent review ID', async () => {
            const nonExistentReviewID = 'nonexistentid';

            // Call the deleteReview function with a non-existent review ID
            await reviewRepo.deleteReview(nonExistentReviewID);

            // Verify that no reviews are deleted from the database
            const deletedReview = await reviewRepo.getReview(
                nonExistentReviewID
            );
            expect(deletedReview).not.toBeDefined();
        });

        it('should handle invalid input for reviewID parameter', async () => {
            const invalidReviewID = nanoid(50); // Empty string

            // Call the deleteReview function with an invalid review ID
            try {
                await reviewRepo.deleteReview(invalidReviewID);
            } catch (error) {
                // Verify that the function throws an error or returns an error response
                expect(error).toBeDefined();
            }
        });
    });
});
