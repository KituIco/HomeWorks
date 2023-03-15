const Validator = require('./validator.js');

class MessageValidator extends Validator {
    constructor(
        clientErrors,
        messageRepo,
        bookingRepo,
        userRepo
    ) {
        super(clientErrors);
        this.messageRepo = messageRepo;
        this.bookingRepo = bookingRepo;
        this.userRepo = userRepo;
        this._rules = {
            messageID: {
                required: true,
                type: 'string'
            },
            bookingID: {
                required: true,
                type: 'string'
            },
            userID: {
                required: true,
                type: 'string'
            },
            dateTimestamp: {
                required: true,
                type: 'number'
            },
            message: {
                required: false,
                type: 'string'
            },
            images: {
                required: false,
                type: 'string'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'message') {
            const message = await this.messageRepo.getMessage(id);
            if (message == null) {
                throw new this.clientErrors.Api404Error(`Message does not exist: ${id}`);
            }
        } else if (type == 'booking') {
            const booking = await this.bookingRepo.getBookingByID(id);
            if (booking == null) {
                throw new this.clientErrors.Api404Error(`Booking does not exist: ${id}`);
            }
        } else if (type == 'user') {
            const user = await this.userRepo.getUser(id);
            if (user == null) {
                throw new this.clientErrors.Api404Error(`User does not exist: ${id}`);
            }
        }
    }
}

module.exports = MessageValidator;