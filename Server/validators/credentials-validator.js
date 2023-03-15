const Validator = require('./validator');

class CredentialsValidator extends Validator {
    constructor(
        clientErrors,
        credentialsRepo
    ) {
        super(clientErrors);
        this.credentialsRepo = credentialsRepo;
        this._rules = {
            credentialsID : {
                required: true,
                type: 'string'
            },
            userID : {
                required: true,
                type: 'string'
            },
            identifier : {
                required: true,
                type: 'string'
            },
            password : {
                required: true,
                type: 'string'
            }
        };
    }

    validateIdentifierOrPassword(identifier, identifierType) {
        let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        let phoneNumberRegex = new RegExp(/^\+639[0-9]{9}/);
        let userNameRegex = new RegExp(/^[a-zA-Z0-9_\-]{5,25}$/);
        let passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

        if (identifierType == 'email') {
            if (!emailRegex.test(identifier)) {
                throw new this.clientErrors.Api400Error('Invalid email address');
            }
        } else if (identifierType == 'phoneNumber') {
            if (!phoneNumberRegex.test(identifier)) {
                throw new this.clientErrors.Api400Error('Invalid phone number');
            }
        } else if (identifierType == 'userName') {
            if (!userNameRegex.test(identifier)) {
                throw new this.clientErrors.Api400Error('Invalid username');
            }
        } else if (identifierType == 'password') {
            if (!passwordRegex.test(password)) {
                throw new this.clientErrors.Api400Error('Invalid password');
            }
        }
    }

    validateIdentifier(identifier) {
        let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        let phoneNumberRegex = new RegExp(/^\+639[0-9]{9}/);
        let userNameRegex = new RegExp(/^[a-zA-Z0-9_\-]{5,25}$/);

        if (!emailRegex.test(identifier) && !phoneNumberRegex.test(identifier) && !userNameRegex.test(identifier)) {
            throw new this.clientErrors.Api400Error('Invalid identifier');
        }
    }

    validateExistenceOfIdentifier = async(identifier) => {
        let credentials = await this.credentialsRepo.getCredentialsByIdentifier(identifier);
        if (credentials) {
            throw new this.clientErrors.Api400Error('Identifier already exists');
        }
    }

    validateIdentifiers = async (identifiers) => {
        if (identifiers.email != null) {
            this.validateIdentifierOrPassword(identifiers.email, 'email');
            await this.validateExistenceOfIdentifier(identifiers.email)
        }

        if (identifiers.username != null) {
            this.validateIdentifierOrPassword(identifiers.username, 'userName');
            await this.validateExistenceOfIdentifier(identifiers.username)
        }

        if (identifiers.phoneNumber != null) {
            this.validateIdentifierOrPassword(identifiers.phoneNumber, 'phoneNumber');
            await this.validateExistenceOfIdentifier(identifiers.phoneNumber)
        }
        
    }
}

module.exports = CredentialsValidator;