const Validator = require('./validator');

class AddressValidator extends Validator {
    constructor(
            clientErrors,
            addressRepo,
            userRepo
        ) {
        super(clientErrors);
        this.addressRepo = addressRepo;
        this.userRepo = userRepo;
        this._rules = {
            addressID : {
                required: true,
                type: 'string'
            },
            userID : {
                required: true,
                type: 'string'
            },
            userFullName : {
                required: true,
                type: 'string'
            },
            userNum : {
                required: true,
                type: 'string'
            },
            latitude : {
                required: true,
                type: 'number'
            },
            longitude : {
                required: true,
                type: 'number'
            },
            city : {
                required: false,
                type: 'string'
            },
            country : {
                required: false,
                type: 'string'
            },
            district : {
                required: false,
                type: 'string'
            },
            name : {
                required: false,
                type: 'string'
            },
            postalCode : {
                required: false,
                type: 'string'
            },
            region : {
                required: false,
                type: 'string'
            },
            street : {
                required: false,
                type: 'string'
            },
            streetNumber : {
                required: false,
                type: 'string'
            },
            subRegion : {
                required: false,
                type: 'string'
            },
            timeZone : {
                required: false,
                type: 'string'
            },
            isDefault : {
                required: true,
                type: 'number'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'address') {
            const address = await this.addressRepo.getAddressByID(id);
            if (address == null) {
                throw new this.clientErrors.Api404Error(`Address with id ${id} does not exist`)
            }
        } else if (type == 'user') {
            const user = await this.userRepo.getUser(id);
            if (user == null) {
                throw new this.clientErrors.Api404Error(`User with id ${id} does not exist`)
            }
        }
    }
}

module.exports = AddressValidator;