class BaseError extends Error {
  constructor(name, statusCode, isOperational, description) {
    super(description);
    this.name = name;
    this.message = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}

module.exports = BaseError;