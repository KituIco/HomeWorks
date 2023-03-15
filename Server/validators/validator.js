class Validator {
    _rules = {};

    constructor(clientErrors) {
        this.clientErrors = clientErrors;
    }

    checkRequiredParameters(params, requiredParamNames) {
        let missingParams = [];
        requiredParamNames.forEach((paramName) => {
            if (!params[paramName]) {
                missingParams.push(paramName);
            }
        });

        if (missingParams.length > 0) {
            throw new this.clientErrors.Api400Error(
                `Missing required parameters: ${missingParams.join(', ')}`,
            );
        }
    };

    checkRequiredQueryParameters(query, requiredParamNames) {
        let missingParams = [];
        requiredParamNames.forEach((paramName) => {
            if (!query[paramName]) {
                missingParams.push(paramName);
            }
        });

        if (missingParams.length > 0) {
            throw new this.clientErrors.Api400Error(
                `Missing required query parameters: ${missingParams.join(', ')}`,
            );
        }
    };

    checkRequiredBodyFieldNames(body, requiredFieldNames) {
        let missingFields = [];
        requiredFieldNames.forEach((fieldName) => {
            if (!body[fieldName]) {
                missingFields.push(fieldName);
            }
        });

        if (missingFields.length > 0) {
            throw new this.clientErrors.Api400Error(
                `Missing required body fields: ${missingFields.join(', ')}`,
            );
        }
    };

    validateField(field, value) {
        if (this._rules[field].required && value == null) {
            throw new this.clientErrors.Api400Error(`Missing required field: ${field}`);
        }

        if (value != null && typeof(value) != this._rules[field].type) {
            throw new this.clientErrors.Api400Error(`Invalid type for field: ${field}. Should be ${this._rules[field].type}`);
        }
    };

    validatePatchPayload(payload) {
        let sum = Object.values(payload).reduce(
            (acc, curr) => acc + curr
        )

        if (sum == 0) {
            throw new this.clientErrors.Api400Error('No fields to update');
        }
    };

    validateCreatePayload(payload, requiredFieldNames) {
        this.checkRequiredBodyFieldNames(
            payload, requiredFieldNames
        )
        Object.keys(payload).forEach((fieldName) => {
            this.validateField(fieldName, payload[fieldName]);
        });
    }
}

module.exports = Validator;