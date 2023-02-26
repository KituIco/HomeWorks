class BaseOk {
    constructor(name, statusCode, isOperational, description) {
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.description = description;
    }
}

module.exports = BaseOk;