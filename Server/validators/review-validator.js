const Validator = require('./validator.js');

class ReviewValidator extends Validator {
    constructor(
        clientErrors,
        reviewRepo,
        serviceRepo,
        seekerRepo
    ) {
        super(clientErrors);
        this.reviewRepo = reviewRepo;
        this.serviceRepo = serviceRepo;
        this.seekerRepo = seekerRepo;
        this._rules = {
            reviewID: {
                required: true,
                type: 'string'
            },
            serviceID: {
                required: true,
                type: 'string'
            },
            seekerID: {
                required: true,
                type: 'string'
            },
            dateTimestamp: {
                required: true,
                type: 'number'
            },
            rating: {
                required: true,
                type: 'number'
            },
            comment: {
                required: false,
                type: 'string'
            },
            images: {
                required: false,
                type: 'string'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'review') {
            let review = await this.reviewRepo.getReview(id);
            if (review == null) {
                throw this.clientErrors.Api404Error(`Review with id ${id} not found`);
            }
        } else if (type == 'service') {
            let service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw this.clientErrors.Api404Error(`Service with id ${id} not found`);
            }
        } else if (type == 'seeker') {
            let seeker = await this.seekerRepo.getSeeker(id);
            if (seeker == null) {
                throw this.clientErrors.Api404Error(`Seeker with id ${id} not found`);
            }
        }
    }
}

module.exports = ReviewValidator;