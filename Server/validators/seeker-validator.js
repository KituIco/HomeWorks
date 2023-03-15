const CredentialsValidator = require('./credentials-validator');

class SeekerValidator extends CredentialsValidator {
    constructor(
        clientErrors,
        seekerRepo,
        credentialsRepo
    ) {
        super(clientErrors, credentialsRepo);
        this.seekerRepo = seekerRepo;
        this._rules = {
            seekerID: {
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
            seekerDp: {
                required: false,
                type: 'string'
            }
        };
    }

    validateExistence = async (seekerID) => {
        const seeker = await this.seekerRepo.getSeeker(seekerID);
        if (seeker == null) {
            throw new this.clientErrors.Api404Error(`Seeker with ID ${seekerID} does not exist`);
        }
    }
}

module.exports = SeekerValidator;