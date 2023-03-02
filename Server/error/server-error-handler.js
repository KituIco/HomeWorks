const httpStatusCodes = require('./http-status-codes');
const BaseError = require('./base-error');

class Api500Error extends BaseError {
    constructor(
        name = 'Internal Server Error',
        statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api501Error extends BaseError {
    constructor(
        name = 'Not Implemented',
        statusCode = httpStatusCodes.NOT_IMPLEMENTED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api502Error extends BaseError {
    constructor(
        name = 'Bad Gateway',
        statusCode = httpStatusCodes.BAD_GATEWAY,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api503Error extends BaseError {
    constructor(
        name = 'Service Unavailable',
        statusCode = httpStatusCodes.SERVICE_UNAVAILABLE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api504Error extends BaseError {
    constructor(
        name = 'Gateway Timeout',
        statusCode = httpStatusCodes.GATEWAY_TIMEOUT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api505Error extends BaseError {
    constructor(
        name = 'HTTP Version Not Supported',
        statusCode = httpStatusCodes.HTTP_VERSION_NOT_SUPPORTED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api506Error extends BaseError {
    constructor(
        name = 'Variant Also Negotiates',
        statusCode = httpStatusCodes.VARIANT_ALSO_NEGOTIATES,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api507Error extends BaseError {
    constructor(
        name = 'Insufficient Storage',
        statusCode = httpStatusCodes.INSUFFICIENT_STORAGE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api508Error extends BaseError {
    constructor(
        name = 'Loop Detected',
        statusCode = httpStatusCodes.LOOP_DETECTED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api510Error extends BaseError {
    constructor(
        name = 'Not Extended',
        statusCode = httpStatusCodes.NOT_EXTENDED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api511Error extends BaseError {
    constructor(
        name = 'Network Authentication Required',
        statusCode = httpStatusCodes.NETWORK_AUTHENTICATION_REQUIRED,
        description,
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