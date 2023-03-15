const Validator = require('./validator.js');

class ServiceTypeValidator extends Validator {
    constructor(
        clientErrors,
        serviceTypeRepo
    ) {
        super(clientErrors);
        this.serviceTypeRepo = serviceTypeRepo;
        this._rules ={
            typeID: {
                required: true,
                type: 'string'
            }, 
            typeName: {
                required: true,
                type: 'string'
            }, 
            typeDesc: {
                required: true,
                type: 'string'
            },
            minServiceCost: {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async(typeID) => {
        const type = await this.serviceTypeRepo.getServiceTypeByID(typeID);
        if (type == null) {
            throw new this.clientErrors.Api404Error(`Service type with ID ${typeID} does not exist.`);
        }
    }
}

module.exports = ServiceTypeValidator;