const httpStatusCodes = require('./http-status-codes.js');
const BaseOk = require('./base-ok.js');

class Api200Ok extends BaseOk {
    constructor(
        name = 'OK',
        statusCode = httpStatusCodes.OK,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api201Ok extends BaseOk {
    constructor(
        name = 'Created',
        statusCode = httpStatusCodes.CREATED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api202Ok extends BaseOk {
    constructor(
        name = 'Accepted',
        statusCode = httpStatusCodes.ACCEPTED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api204Ok extends BaseOk {
    constructor(
        name = 'No Content',
        statusCode = httpStatusCodes.NO_CONTENT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api205Ok extends BaseOk {
    constructor(
        name = 'Reset Content',
        statusCode = httpStatusCodes.RESET_CONTENT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api206Ok extends BaseOk {
    constructor(
        name = 'Partial Content',
        statusCode = httpStatusCodes.PARTIAL_CONTENT,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api207Ok extends BaseOk {
    constructor(
        name = 'Multi-Status',
        statusCode = httpStatusCodes.MULTI_STATUS,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api208Ok extends BaseOk {
    constructor(
        name = 'Already Reported',
        statusCode = httpStatusCodes.ALREADY_REPORTED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

class Api226Ok extends BaseOk {
    constructor(
        name = 'IM Used',
        statusCode = httpStatusCodes.IM_USED,
        description,
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description);
    }
}

module.exports = {
    Api200Ok,
    Api201Ok,
    Api202Ok,
    Api204Ok,
    Api205Ok,
    Api206Ok,
    Api207Ok,
    Api208Ok,
    Api226Ok
};