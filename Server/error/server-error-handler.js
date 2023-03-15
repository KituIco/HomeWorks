const httpStatusCodes = require('./http-status-codes');
const BaseError = require('./base-error');

class Api500Error extends BaseError {
    constructor(
        description,
        name = 'Internal Server Error',
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api501Error extends BaseError {
    constructor(
        description,
        name = 'Not Implemented',
        statusCode = httpStatusCodes.NOT_IMPLEMENTED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api502Error extends BaseError {
    constructor(
        description,
        name = 'Bad Gateway',
        statusCode = httpStatusCodes.BAD_GATEWAY,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api503Error extends BaseError {
    constructor(
        description,
        name = 'Service Unavailable',
        statusCode = httpStatusCodes.SERVICE_UNAVAILABLE,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api504Error extends BaseError {
    constructor(
        description,
        name = 'Gateway Timeout',
        statusCode = httpStatusCodes.GATEWAY_TIMEOUT,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api505Error extends BaseError {
    constructor(
        description,
        name = 'HTTP Version Not Supported',
        statusCode = httpStatusCodes.HTTP_VERSION_NOT_SUPPORTED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api506Error extends BaseError {
    constructor(
        description,
        name = 'Variant Also Negotiates',
        statusCode = httpStatusCodes.VARIANT_ALSO_NEGOTIATES,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api507Error extends BaseError {
    constructor(
        description,
        name = 'Insufficient Storage',
        statusCode = httpStatusCodes.INSUFFICIENT_STORAGE,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api508Error extends BaseError {
    constructor(
        description,
        name = 'Loop Detected',
        statusCode = httpStatusCodes.LOOP_DETECTED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api510Error extends BaseError {
    constructor(
        description,
        name = 'Not Extended',
        statusCode = httpStatusCodes.NOT_EXTENDED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api511Error extends BaseError {
    constructor(
        description,
        name = 'Network Authentication Required',
        statusCode = httpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = {
    Api500Error,
    Api501Error,
    Api502Error,
    Api503Error,
    Api504Error,
    Api505Error,
    Api506Error,
    Api507Error,
    Api508Error,
    Api510Error,
    Api511Error
};