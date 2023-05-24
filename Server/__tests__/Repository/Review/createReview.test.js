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

    beforeEach(async () => {});

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

    describe('createReview', () => {
        it('should create a review with valid input', async () => {
            // Prepare valid input values
            const offsetMultiplier = 0;
            const sizeLimit = 10;

            // Call the createReview function with valid input
            await reviewRepo.createReview(
                reviewID,
                serviceID,
                userID1,
                Date.now(),
                5,
                'Great service!',
                null
            );

            // Call the getReview function with the existing review ID
            const result = await reviewRepo.getReview(reviewID);

            // Verify the result
            expect(result).toBeDefined();
            expect(result.reviewId).toEqual(reviewID);
            expect(result.serviceId).toEqual(serviceID);
            expect(result.seekerId).toEqual(userID1);
            //expect(result.comment).toEqual('Great service!');
        });

        it('should throw an error for invalid input', async () => {
            // Test with non-existent service ID
            await expect(
                reviewRepo.createReview(
                    reviewID,
                    'nonexistent-service-id',
                    userID1,
                    Date.now(),
                    5,
                    'Great service!',
                    null
                )
            ).rejects.toThrow();
        });

        it('should retrieve reviews for an existing service', async () => {
            // Create a review for the existing service
            await reviewRepo.createReview(
                reviewID,
                serviceID,
                userID1,
                Date.now(),
                5,
                'Great service!',
                null
            );

            // Call the getReviewsByService function with the existing service ID
            const reviews = await reviewRepo.getServiceReviews(
                serviceID,
                0,
                10
            );

            // Verify the reviews
            expect(reviews).toBeDefined();
            expect(reviews.length).toBeGreaterThan(0);
        });

        test('throws an error if required parameters are missing', async () => {
            const createReviewParams = {
                reviewID: null,
                serviceID: null,
                seekerID: null,
                dateTimestamp: Date.now(),
                rating: 5,
                comment: 'Great service!',
                images: [],
            };

            await expect(
                reviewRepo.createReview(
                    createReviewParams.reviewID,
                    createReviewParams.serviceID,
                    createReviewParams.seekerID,
                    createReviewParams.dateTimestamp,
                    createReviewParams.rating,
                    createReviewParams.comment,
                    createReviewParams.images
                )
            ).rejects.toThrow();
        });
    });
});
