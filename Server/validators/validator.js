class Validator {
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
}

module.exports = Validator;