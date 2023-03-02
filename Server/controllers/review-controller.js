class ReviewController {
    constructor(
        reviewRepo,
        clientErrors,
        serverErrors,
        reviewValidator = null,
        nanoid
    ) {
        this.reviewRepo = reviewRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.reviewValidator = reviewValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createReview = async (req, res) => {
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
                // validate if serviceID exists
                // validate if seekerID exists

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
            console.log(error);
        }
    };

    // PATCH: "/:reviewID"
    patchReview = async (req, res) => {
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
                // validate if necessary fields are not null
                // validate if serviceID exists
                // validate if seekerID exists
                // validate if reviewID exists
            
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
            console.log(error);
        }
    };

    // DELETE: "/:reviewID"
    deleteReview = async (req, res) => {
        try {
            let { reviewID } = req.params;

            // TODO: Pre-query validation
                // validate if reviewID is not null
                // validate if reviewID exists
            
            await this.reviewRepo.deleteReview(reviewID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllReviews = async (req, res) => {
        try {
            let reviews = await this.reviewRepo.getAllReviews();

            res.status(200).json({
                message: "All reviews retrieved successfully",
                body: reviews
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "service/:serviceID"
    getServiceReviews = async (req, res) => {
        try {
            let { serviceID } = req.params;

            // TODO: Pre-query validation
                // validate if serviceID is not null
                // validate if serviceID exists
            
            let reviews = await this.reviewRepo.getServiceReviews(serviceID);

            res.status(200).json({
                message: `All reviews for Service ${serviceID} retrieved successfully`,
                body: reviews
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:reviewID"
    getReview = async (req, res) => {
        try {
            let { reviewID } = req.params;

            // TODO: Pre-query validation
                // validate if reviewID is not null

            let review = await this.reviewRepo.getReview(reviewID);

            // TODO: Post-query validation
                // validate if review exists
            
            res.status(200).json({
                message: `Review ${reviewID} retrieved successfully`,
                body: review
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = ReviewController;