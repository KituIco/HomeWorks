class PaymentRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createPayment = async (
        paymentID,
        seekerID,
        providerID,
        serviceID,
        paymentMethod,
        ammount,
        paymentStatus
    ) => {
        try {
            let sqlQuery = `CALL create_payment(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                paymentID,
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                ammount,
                paymentStatus
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchPayment = async (
        paymentID,
        seekerID,
        providerID,
        serviceID,
        paymentMethod,
        ammount,
        paymentStatus
    ) => {
        try {
            let sqlQuery = `CALL patch_payment(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                paymentID,
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                ammount,
                paymentStatus
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deletePayment = async (paymentID) => {
        try {
            let sqlQuery = `CALL delete_payment(?)`;
            await this.db.query(sqlQuery, [paymentID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllPayments = async () => {
        try {
            let sqlQuery = `CALL get_all_payments()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllPaymentsByStatus = async (paymentStatus) => {
        try {
            let sqlQuery = `CALL get_all_payments_by_status(?)`;
            let [result, _] = await this.db.query(sqlQuery, [paymentStatus]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerPayments = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_payments(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerPaymentsByStatus = async (seekerID, paymentStatus) => {
        try {
            let sqlQuery = `CALL get_seeker_payments_by_status(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [
                seekerID,
                paymentStatus
            ]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderPayments = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_payments(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderPaymentsByStatus = async (providerID, paymentStatus) => {
        try {
            let sqlQuery = `CALL get_provider_payments_by_status(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [
                providerID,
                paymentStatus
            ]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getPaymentByMethod = async (paymentMethod) => {
        try {
            let sqlQuery = `CALL get_payment_by_method(?)`;
            let [result, _] = await this.db.query(sqlQuery, [paymentMethod]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getPaymentByID = async (paymentID) => {
        try {
            let sqlQuery = `CALL get_payment_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [paymentID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = PaymentRepository;