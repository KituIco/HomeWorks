const Validator = require('./validator.js');

class ServiceValidator extends Validator {
    constructor(
        clientErrors,
        serviceRepo,
        providerRepo,
        serviceTypeRepo
    ) {
        super(clientErrors);
        this.serviceRepo = serviceRepo;
        this.providerRepo = providerRepo;
        this.serviceTypeRepo = serviceTypeRepo;
        this._rules = {
            serviceID: {
                required: true,
                type: 'string'
            },
            providerID: {
                required: true,
                type: 'string'
            },
            typeID: {
                required: true,
                type: 'string'
            },
            typeName: {
                required: true,
                type: 'string'
            },
            initialCost: {
                required: false,
                type: 'number'
            },
            serviceEnabled: {
                required: false,
                type: 'number'
            },
            serviceRating: {
                required: false,
                type: 'number'
            },
            totalReviews: {
                required: false,
                type: 'number'
            },
            reviewsCount: {
                required: false,
                type: 'number'
            },
            fiveStar: {
                required: false,
                type: 'number'
            },
            fourStar: {
                required: false,
                type: 'number'
            },
            threeStar: {
                required: false,
                type: 'number'
            },
            twoStar: {
                required: false,
                type: 'number'
            },
            oneStar: {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'service') {
            const service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw new this.clientErrors.Api404Error(`Service with ID ${id} does not exist`);
            }
        } else if (type == 'provider') {
            const provider = await this.providerRepo.getProvider(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider with ID ${id} does not exist`);
            }
        } else if (type == 'type') {
            const type = await this.serviceTypeRepo.getServiceTypeByID(id);
            if (type == null) {
                throw new this.clientErrors.Api404Error(`Service type with ID ${id} does not exist`);
            }
        }
    }
}

module.exports = ServiceValidator;