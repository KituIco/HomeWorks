const Validator = require('./validator.js');

class ServiceSpecsValidator extends Validator {
    constructor(
        clientErrors,
        serviceSpecsRepo,
        seekerRepo,
        serviceTypeRepo,
        addressRepo,
    ) {
        super(clientErrors);
        this.serviceSpecsRepo = serviceSpecsRepo;
        this.seekerRepo = seekerRepo;
        this.serviceTypeRepo = serviceTypeRepo;
        this.addressRepo = addressRepo;
        this._rules = {
            specsID: {
                required: true,
                type: 'string'
            },
            seekerID: {
                required: true,
                type: 'string'
            },
            typeID: {
                required: true,
                type: 'string'
            },
            addressID: {
                required: false,
                type: 'string'
            },
            specsDesc: {
                required: false,
                type: 'string'
            },
            images: {
                required: false,
                type: 'string'
            },
            specsStatus: {
                required: false,
                type: 'number'
            },
            specsTimestamp: {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async(id, type) => {
        if (type == 'specs') {
            const specs = await this.serviceSpecsRepo.getSpecsByID(id);
            if (specs == null) {
                throw new this.clientErrors.Api404Error(`Service specs with ID ${id} does not exist`);
            }
        } else if (type == 'seeker') {
            const seeker = await this.seekerRepo.getSeeker(id);
            if (seeker == null) {
                throw new this.clientErrors.Api404Error(`Seeker with ID ${id} does not exist`);
            }
        } else if (type == 'type') {
            const type = await this.serviceTypeRepo.getServiceTypeByID(id);
            if (type == null) {
                throw new this.clientErrors.Api404Error(`Service type with ID ${id} does not exist`);
            }
        } else if (type == 'address') {
            const address = await this.addressRepo.getAddressByID(id);
            if (address == null) {
                throw new this.clientErrors.Api404Error(`Address with ID ${id} does not exist`);
            }
        }
    }
}

module.exports = ServiceSpecsValidator;