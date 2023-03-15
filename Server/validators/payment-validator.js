const Validator = require('./validator');

class PaymentValidator extends Validator {
    constructor(
        clientErrors, 
        paymentRepo, 
        seekerRepo, 
        providerRepo, 
        serviceRepo
    ) {
        super(clientErrors);
        this.paymentRepo = paymentRepo;
        this.seekerRepo = seekerRepo;
        this.providerRepo = providerRepo;
        this.serviceRepo = serviceRepo;
        this._rules = {
            paymentID: {
                required: true,
                type: 'string'
            },
            seekerID: {
                required: true,
                type: 'string'
            },
            providerID: {
                required: true,
                type: 'string'
            },
            serviceID: {
                required: true,
                type: 'string'
            },
            paymentMethod: {
                required: false,
                type: 'number'
            },
            amount: {
                required: false,
                type: 'number'
            },
            paymentStatus: {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'payment') {
            const payment = await this.paymentRepo.getPaymentByID(id);
            if (payment == null) {
                throw new this.clientErrors.Api404Error(`Payment ${id} not found`);
            }
        } else if (type == 'seeker') {
            const seeker = await this.seekerRepo.getSeeker(id);
            if (seeker == null) {
                throw new this.clientErrors.Api404Error(`Seeker ${id} not found`);
            }
        } else if (type == 'provider') {
            const provider = await this.providerRepo.getProvider(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider ${id} not found`);
            }
        } else if (type == 'service') {
            const service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw new this.clientErrors.Api404Error(`Service ${id} not found`);
            }
        }
    }

    validatePaymentStatus = (status) => {
        if (status < 0 || status > 3) {
            throw new this.clientErrors.Api400Error(`Invalid payment status`);
        }
    }

    validatePaymentMethod = (method) => {
        if (method < 0 || method > 5) {
            throw new this.clientErrors.Api400Error(`Invalid payment method`);
        }
    }
}

module.exports = PaymentValidator;