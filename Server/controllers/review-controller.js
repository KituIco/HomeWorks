class ReviewController {
    constructor(
        reviewRepo,
        clientErrors,
        reviewValidator,
        nanoid
    ) {
        this.reviewRepo = reviewRepo;
        this.clientErrors = clientErrors;
        this.reviewValidator = reviewValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createReview = async (req, res, next) => {
        try {
            let {
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.reviewValidator.validateCreatePayload(req.body, ['serviceID', 'seekerID', 'dateTimestamp', 'rating']);
                // validate if serviceID exists
            await this.reviewValidator.validateExistence(serviceID, 'service');
                // validate if seekerID exists
            await this.reviewValidator.validateExistence(seekerID, 'seeker');

            let reviewID = this.nanoid(14);

            await this.reviewRepo.createReview(
                reviewID,
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            );

            let createdReview = {
                ...req.body
            }

            createdReview.reviewID = reviewID;

            res.status(201).json({
                message: "Review created successfully",
                body: createdReview
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:reviewID"
    patchReview = async (req, res, next) => {
        try {
            let {
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            } = req.body;

            let { reviewID } = req.params;

            // TODO: Pre-query validation
            this.reviewValidator.checkRequiredParameters(req.params, ['reviewID']);
                // validate if reviewID exists
            await this.reviewValidator.validateExistence(reviewID, 'review');
                // validate if necessary fields are not null
            this.reviewValidator.validatePatchPayload(req.body);
                // validate if serviceID exists
            serviceID != null && await this.reviewValidator.validateExistence(serviceID, 'service');
                // validate if seekerID exists
            seekerID != null && await this.reviewValidator.validateExistence(seekerID, 'seeker');
            
            await this.reviewRepo.patchReview(
                reviewID,
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            );

            let patchedReview = {
                ...req.body
            }

            patchedReview.reviewID = reviewID;

            res.status(200).json({
                message: "Review patched successfully",
                body: patchedReview
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:reviewID"
    deleteReview = async (req, res, next) => {
        try {
            let { reviewID } = req.params;

            // TODO: Pre-query validation
                // validate if reviewID is not null
            this.reviewValidator.checkRequiredParameters(req.params, ['reviewID']);
                // validate if reviewID exists
            await this.reviewValidator.validateExistence(reviewID, 'review');
            
            await this.reviewRepo.deleteReview(reviewID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllReviews = async (req, res, next) => {
        try {
            let reviews = await this.reviewRepo.getAllReviews();

            res.status(200).json({
                message: "All reviews retrieved successfully",
                body: reviews
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "service/:serviceID?offsetMultiplier=0&sizeLimit=10"
    getServiceReviews = async (req, res, next) => {
        try {
            let { serviceID } = req.params;
            let { offsetMultiplier, sizeLimit } = req.query;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.reviewValidator.checkRequiredParameters(req.params, ['serviceID']);
                // validate query parameters
            this.reviewValidator.checkRequiredQueryParameters(req.query, ['offsetMultiplier', 'sizeLimit']);
                // validate if serviceID exists
            await this.reviewValidator.validateExistence(serviceID, 'service');
            
            let reviews = await this.reviewRepo.getServiceReviews(serviceID, offsetMultiplier, sizeLimit);

            res.status(200).json({
                message: `All reviews for Service ${serviceID} retrieved successfully`,
                body: reviews
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:reviewID"
    getReview = async (req, res, next) => {
        try {
            let { reviewID } = req.params;

            // TODO: Pre-query validation
                // validate if reviewID is not null
            this.reviewValidator.checkRequiredParameters(req.params, ['reviewID']);

            let review = await this.reviewRepo.getReview(reviewID);

            // TODO: Post-query validation
                // validate if review exists
            
            res.status(200).json({
                message: `Review ${reviewID} retrieved successfully`,
                body: review
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = ReviewController;