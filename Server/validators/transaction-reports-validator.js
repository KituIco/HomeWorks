const Validator = require('./validator.js');

class TransactionReportsValidator extends Validator {
    constructor(
        clientErrors,
        transactionReportsRepo,
        bookingRepo,
        paymentRepo,
        specsRepo,
        seekerRepo,
        providerRepo,
        serviceRepo
    ) {
        super(clientErrors);
        this.transactionReportsRepo = transactionReportsRepo;
        this.bookingRepo = bookingRepo;
        this.paymentRepo = paymentRepo;
        this.specsRepo = specsRepo;
        this.seekerRepo = seekerRepo;
        this.providerRepo = providerRepo;
        this.serviceRepo = serviceRepo;
        this._rules = {
            reportID: {
                required: true,
                type: 'string'
            },
            bookingID: {
                required: true,
                type: 'string'
            },
            paymentID: {
                required: true,
                type: 'string'
            },
            specsID: {
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
            transactionStat: {
                required: false,
                type: 'number'
            }
        }
    }

    validateExistence = async (id, type) => {
        if (type == 'report') {
            const report = await this.transactionReportsRepo.getTransactionReportByID(id);
            if (report == null) {
                throw new this.clientErrors.Api404Error(`Transaction report with ID ${id} does not exist`);
            }
        } else if (type == 'booking') {
            const booking = await this.bookingRepo.getBookingByID(id);
            if (booking == null) {
                throw new this.clientErrors.Api404Error(`Booking with ID ${id} does not exist`);
            }
        } else if (type == 'payment') {
            const payment = await this.paymentRepo.getPaymentByID(id);
            if (payment == null) {
                throw new this.clientErrors.Api404Error(`Payment with ID ${id} does not exist`);
            }
        } else if (type == 'specs') {
            const specs = await this.specsRepo.getSpecsByID(id);
            if (specs == null) {
                throw new this.clientErrors.Api404Error(`Specs with ID ${id} does not exist`);
            }
        } else if (type == 'seeker') {
            const seeker = await this.seekerRepo.getSeeker(id);
            if (seeker == null) {
                throw new this.clientErrors.Api404Error(`Seeker with ID ${id} does not exist`);
            }
        } else if (type == 'provider') {
            const provider = await this.providerRepo.getProvider(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider with ID ${id} does not exist`);
            }
        } else if (type == 'service') {
            const service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw new this.clientErrors.Api404Error(`Service with ID ${id} does not exist`);
            }
        }
    }
}

module.exports = TransactionReportsValidator;