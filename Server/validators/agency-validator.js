const Validator = require('./validator.js');

class AgencyValidator extends Validator {
    constructor(
        clientErrors,
        agencyRepo,
        providerRepo
    ) {
        super(clientErrors);
        this.agencyRepo = agencyRepo;
        this.providerRepo = providerRepo;
        this._rules = {
            agencyID: {
                required: true,
                type: 'string'
            },
            agencyName: {
                required: true,
                type: 'string'
            },
            agencyDesc: {
                required: false,
                type: 'string'
            },
            agencyDP: {
                required: false,
                type: 'string'
            },
            agencyImages: {
                required: false,
                type: 'string'
            },
            agencyServiceTypes: {
                required: false,
                type: 'string'
            },
            agencyRating: {
                required: false,
                type: 'number'
            }
        };
    }

    validateExistence = async (id, type) => {
        if (type == 'agency') {
            const agency = await this.agencyRepo.getAgencyByID(id);
            if (agency == null) {
                throw new this.clientErrors.Api404Error(`Agency with ID ${id} does not exist`);
            }
        } else if (type == 'provider') {
            const provider = await this.providerRepo.getProviderByID(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider with ID ${id} does not exist`);
            }
        }
    }
}

module.exports = AgencyValidator;