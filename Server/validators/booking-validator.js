const Validator = require('./validator.js');

class BookingValidator extends Validator {
    constructor(
        clientErrors,
        bookingRepo,
        seekerRepo,
        providerRepo,
        serviceRepo
    ) {
        super(clientErrors);
        this.bookingRepo = bookingRepo;
        this.seekerRepo = seekerRepo;
        this.providerRepo = providerRepo;
        this.serviceRepo = serviceRepo;
        this._rules = {
            bookingID: {
                required: true,
                type: 'string'
            },
            seekerID: {
                required: true,
                type: 'string'
            },
            serviceID: {
                required: true,
                type: 'string'
            },
            bookingStatus:{
                required: false,
                type: 'number'
            },
            dateTimestamp: {
                required: false,
                type: 'number'
            },
            description: {
                required: false,
                type: 'string'
            },
            cost: {
                required: false,
                type: 'number'
            },
            specsID: {
                required: false,
                type: 'string'
            }
        };
    }
    
    validateExistence = async (id, type) => {
        if (type == 'booking') {
            const booking = await this.bookingRepo.getBookingByID(id);
            if (booking == null) {
                throw new this.clientErrors.Api404Error(`Booking with ID ${id} not found`);
            }
        } else if (type == 'seeker') {
            const seeker = await this.seekerRepo.getSeeker(id);
            if (seeker == null) {
                throw new this.clientErrors.Api404Error(`Seeker with ID ${id} not found`);
            }
        } else if (type == 'provider') {
            const provider = await this.providerRepo.getProvider(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider with ID ${id} not found`);
            }
        } else if (type == 'service') {
            const service = await this.serviceRepo.getService(id);
            if (service == null) {
                throw new this.clientErrors.Api404Error(`Service with ID ${id} not found`);
            }
        }
    }
}

module.exports = BookingValidator;