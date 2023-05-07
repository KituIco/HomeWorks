class PaymentTransactionRepo {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }
}

module.exports = PaymentTransactionRepo;