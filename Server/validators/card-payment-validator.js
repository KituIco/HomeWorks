const Validator = require('./validator.js');

class CardPaymentValidator extends Validator {
    constructor(
        clientErrors,
        cardPaymentRepo,
        userRepo
    ) {
        super(clientErrors);
        this.cardPaymentRepo = cardPaymentRepo;
        this.userRepo = userRepo;
        this._rules = {
            cardID: {
                required: true,
                type: 'string'
            },
            userID: {
                required: true,
                type: 'string'
            },
            cardNum: {
                required: true,
                type: 'string'
            },
            expiryDate: {
                required: true,
                type: 'number'
            },
            cvv: {
                required: true,
                type: 'string'
            },
            merchant: {
                required: false,
                type: 'string'
            },
            cardType: {
                required: true,
                type: 'number'
            }
        };
    }

    validateExistence = async (id, type) => {
        if (type == 'cardPayment') {
            const cardPayment = await this.cardPaymentRepo.getCardPaymentByID(id);
            if (cardPayment == null) {
                throw new this.clientErrors.Api404Error(`Card payment with ID: ${id} not found`);
            }
        } else if (type == 'user') {
            const user = await this.userRepo.getUser(id);
            if (user == null) {
                throw new this.clientErrors.Api404Error(`User with ID: ${id} not found`);
            }
        }
    }
}

module.exports = CardPaymentValidator;