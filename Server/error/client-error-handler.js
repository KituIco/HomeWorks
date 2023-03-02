const httpStatusCodes = require('./http-status-codes.js');
const BaseError = require('./base-error.js');

class Api400Error extends BaseError {
    constructor(
        name = 'Bad Request',
        statusCode = httpStatusCodes.BAD_REQUEST,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api401Error extends BaseError {
    constructor(
        name = 'Unauthorized',
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api402Error extends BaseError {
    constructor(
        name = 'Payment Required',
        statusCode = httpStatusCodes.PAYMENT_REQUIRED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api403Error extends BaseError {
    constructor(
        name = 'Forbidden',
        statusCode = httpStatusCodes.FORBIDDEN,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api404Error extends BaseError {
    constructor(
        name = 'Not Found',
        statusCode = httpStatusCodes.NOT_FOUND,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api405Error extends BaseError {
    constructor(
        name = 'Method Not Allowed',
        statusCode = httpStatusCodes.METHOD_NOT_ALLOWED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api406Error extends BaseError {
    constructor(
        name = 'Not Acceptable',
        statusCode = httpStatusCodes.NOT_ACCEPTABLE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api407Error extends BaseError {
    constructor(
        name = 'Proxy Authentication Required',
        statusCode = httpStatusCodes.PROXY_AUTHENTICATION_REQUIRED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api408Error extends BaseError {
    constructor(
        name = 'Request Timeout',
        statusCode = httpStatusCodes.REQUEST_TIMEOUT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api409Error extends BaseError {
    constructor(
        name = 'Conflict',
        statusCode = httpStatusCodes.CONFLICT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api410Error extends BaseError {
    constructor(
        name = 'Gone',
        statusCode = httpStatusCodes.GONE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api411Error extends BaseError {
    constructor(
        name = 'Length Required',
        statusCode = httpStatusCodes.LENGTH_REQUIRED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api412Error extends BaseError {
    constructor(
        name = 'Precondition Failed',
        statusCode = httpStatusCodes.PRECONDITION_FAILED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api413Error extends BaseError {
    constructor(
        name = 'Payload Too Large',
        statusCode = httpStatusCodes.PAYLOAD_TOO_LARGE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api414Error extends BaseError {
    constructor(
        name = 'URI Too Long',
        statusCode = httpStatusCodes.URI_TOO_LONG,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api415Error extends BaseError {
    constructor(
        name = 'Unsupported Media Type',
        statusCode = httpStatusCodes.UNSUPPORTED_MEDIA_TYPE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api416Error extends BaseError {
    constructor(
        name = 'Range Not Satisfiable',
        statusCode = httpStatusCodes.RANGE_NOT_SATISFIABLE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api417Error extends BaseError {
    constructor(
        name = 'Expectation Failed',
        statusCode = httpStatusCodes.EXPECTATION_FAILED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api418Error extends BaseError {
    constructor(
        name = 'I\'m a teapot',
        statusCode = httpStatusCodes.IM_A_TEAPOT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api421Error extends BaseError {
    constructor(
        name = 'Misdirected Request',
        statusCode = httpStatusCodes.MISDIRECTED_REQUEST,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api422Error extends BaseError {
    constructor(
        name = 'Unprocessable Entity',
        statusCode = httpStatusCodes.UNPROCESSABLE_ENTITY,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api423Error extends BaseError {
    constructor(
        name = 'Locked',
        statusCode = httpStatusCodes.LOCKED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api424Error extends BaseError {
    constructor(
        name = 'Failed Dependency',
        statusCode = httpStatusCodes.FAILED_DEPENDENCY,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api425Error extends BaseError {
    constructor(
        name = 'Too Early',
        statusCode = httpStatusCodes.TOO_EARLY,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api426Error extends BaseError {
    constructor(
        name = 'Upgrade Required',
        statusCode = httpStatusCodes.UPGRADE_REQUIRED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api428Error extends BaseError {
    constructor(
        name = 'Precondition Required',
        statusCode = httpStatusCodes.PRECONDITION_REQUIRED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api429Error extends BaseError {
    constructor(
        name = 'Too Many Requests',
        statusCode = httpStatusCodes.TOO_MANY_REQUESTS,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api431Error extends BaseError {
    constructor(
        name = 'Request Header Fields Too Large',
        statusCode = httpStatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api451Error extends BaseError {
    constructor(
        name = 'Unavailable For Legal Reasons',
        statusCode = httpStatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = {
    Api400Error,
    Api401Error,
    Api402Error,
    Api403Error,
    Api404Error,
    Api405Error,
    Api406Error,
    Api407Error,
    Api408Error,
    Api409Error,
    Api410Error,
    Api411Error,
    Api412Error,
    Api413Error,
    Api414Error,
    Api415Error,
    Api416Error,
    Api417Error,
    Api418Error,
    Api421Error,
    Api422Error,
    Api423Error,
    Api424Error,
    Api425Error,
    Api426Error,
    Api428Error,
    Api429Error,
    Api431Error,
    Api451Error
}