class ReviewRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createReview = async (
        reviewID,
        serviceID,
        seekerID,
        dateTimestamp,
        rating,
        comment,
        images
    ) => {
        try {
            let sqlQuery = `CALL create_review(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                reviewID,
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchReview = async (
        reviewID,
        serviceID,
        seekerID,
        dateTimestamp,
        rating,
        comment,
        images
    ) => {
        try {
            let sqlQuery = `CALL patch_review(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                reviewID,
                serviceID,
                seekerID,
                dateTimestamp,
                rating,
                comment,
                images
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteReview = async (reviewID) => {
        try {
            let sqlQuery = `CALL delete_review(?)`;
            await this.db.query(sqlQuery, [reviewID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllReviews = async () => {
        try {
            let sqlQuery = `CALL get_all_reviews()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getServiceReviews = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_service_reviews(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getReview = async (reviewID) => {
        try {
            let sqlQuery = `CALL get_review(?)`;
            let [result, _] = await this.db.query(sqlQuery, [reviewID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = ReviewRepository;