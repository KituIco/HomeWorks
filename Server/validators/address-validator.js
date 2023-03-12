const Validator = require('./validator');

class AddressValidator extends Validator {
    constructor(clientErrors) {
        super(clientErrors);
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
                required: false,
                type: 'number'
            }
        }
    }

    validateField(field, value) {
        if (this._rules[field].required && value == null) {
            throw new this.clientErrors.Api400Error(`Missing required field: ${field}`);
        }

        if (value != null && typeof(value) != this._rules[field].type) {
            throw new this.clientErrors.Api400Error(`Invalid type for field: ${field}. Should be ${this._rules[field].type}`);
        }
    };

    validateCreateAndUpdateAddressPayload(payload) {
        this.checkRequiredBodyFieldNames(payload, ['userID', 'userFullName', 'userNum', 'latitude', 'longitude', 'isDefault']);
        this.validateField('userID', payload.userID);
        this.validateField('userFullName', payload.userFullName);
        this.validateField('userNum', payload.userNum);
        this.validateField('latitude', payload.latitude);
        this.validateField('longitude', payload.longitude);
        this.validateField('city', payload.city);
        this.validateField('country', payload.country);
        this.validateField('district', payload.district);
        this.validateField('name', payload.name);
        this.validateField('postalCode', payload.postalCode);
        this.validateField('region', payload.region);
        this.validateField('street', payload.street);
        this.validateField('streetNumber', payload.streetNumber);
        this.validateField('subRegion', payload.subRegion);
        this.validateField('timeZone', payload.timeZone);
        this.validateField('isDefault', payload.isDefault);
    };
}

module.exports = AddressValidator;