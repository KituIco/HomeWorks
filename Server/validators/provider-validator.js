const CredentialsValidator = require('./credentials-validator.js');

class ProviderValidator extends CredentialsValidator {
    constructor(
        clientErrors,
        credentialsRepo,
        providerRepo
    ) {
        super(clientErrors, credentialsRepo);
        this.providerRepo = providerRepo;
        this._rules = {
            providerID: {
                required: true,
                type: 'string'
            },
            email: {
                required: false,
                type: 'string'
            },
            username: {
                required: true,
                type: 'string'
            },
            phoneNumber: {
                required: false,
                type: 'string'
            },
            password: {
                required: true,
                type: 'string'
            },
            firstName: {
                required: true,
                type: 'string'
            },
            lastName : {
                required: true,
                type: 'string'
            },
            birthdate: {
                required: false,
                type: 'string'
            },
            gender: {
                required: false,
                type: 'string'
            },
            providerDp: {
                required: false,
                type: 'string'
            },
            validID: {
                required: false,
                type: 'string'
            },
            agencyID: {
                required: false,
                type: 'string'
            },
            verified: {
                required: false,
                type: 'number'
            },
            accepting: {
                required: false,
                type: 'number'
            },
            aveRating : {
                required: false,
                type: 'number'
            },
            totalReviews: {
                required: false,
                type: 'number'
            },
            reviewCount: {
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

    validateExistence = async (providerID) => {
        let provider = await this.providerRepo.getProvider(providerID);
        if (provider == null) {
            throw new this.clientErrors.Api404Error(`Provider with id ${providerID} does not exist`);
        }
    }
}

module.exports = ProviderValidator;