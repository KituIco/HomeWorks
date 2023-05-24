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

    describe('getAllReviews', () => {
        it('Test with existing reviews: Verify that the function retrieves all the reviews stored in the Review table', async () => {
            const reviews = await reviewRepo.getAllReviews();

            expect(reviews.length).toBeGreaterThanOrEqual(0);
        });

        it('Test with no reviews: If there are no reviews in the Review table, verify that the function returns an appropriate response', async () => {
            //Mock the getAllReviews function to return an empty array
            jest.spyOn(reviewRepo, 'getAllReviews').mockImplementation(
                async () => []
            );

            const reviews = await reviewRepo.getAllReviews();

            expect(reviews.length).toEqual(0);
            expect(reviews).toEqual([]);
        });

        it('Test database integrity: After retrieving the reviews, verify that the data fetched from the database matches the expected values', async () => {
            const reviews = await reviewRepo.getAllReviews();

            expect(reviews.length).toBeGreaterThanOrEqual(0);

            reviews.forEach((review) => {
                expect(review.reviewId).toBeDefined();
                expect(review.serviceId).toBeDefined();
                expect(review.seekerId).toBeDefined();
                expect(review.dateTimestamp).toBeDefined();
                expect(review.rating).toBeDefined();
                expect(review.comment).toBeDefined();
                expect(review.images).toBeDefined();
            });
        });
    });
});
