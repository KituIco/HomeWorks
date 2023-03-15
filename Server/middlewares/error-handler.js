const BaseError = require('../error/base-error');

errorHandler = (err, req, res, next) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).send({ 
            error: {
                name: err.name,
                message: err.message,
                isOperational: err.isOperational,
            }
         });
    } else {
        res.status(500).send({ 
            error: {
                name: 'InternalServerError',
                message: `An internal server error occurred. Specific error message is: ${err.message}`,
                isOperational: true,
            }
         });
    }

}

module.exports = errorHandler;