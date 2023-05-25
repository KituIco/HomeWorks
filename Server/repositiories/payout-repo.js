class PayoutRepo {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createPayout = async (
        payoutID,
        seekerID,
        providerID,
        ammount,
        dateTimestamp,
        payoutStatus
    ) => {
        try {
            let sqlQuery = `CALL create_payout(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                payoutID,
                seekerID,
                providerID,
                ammount,
                dateTimestamp,
                payoutStatus,
            ]);
        } catch (error) {
            throw error;
        }
    };

    patchPayout = async (
        payoutID,
        seekerID,
        providerID,
        ammount,
        dateTimestamp,
        payoutStatus
    ) => {
        try {
            let sqlQuery = `CALL patch_payout(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                payoutID,
                seekerID,
                providerID,
                ammount,
                dateTimestamp,
                payoutStatus,
            ]);
        } catch (error) {
            throw error;
        }
    };

    deletePayout = async (payoutID) => {
        try {
            let sqlQuery = `CALL delete_payout(?)`;
            await this.db.query(sqlQuery, [payoutID]);
        } catch (error) {
            throw error;
        }
    };

    getPayouts = async () => {
        try {
            let sqlQuery = `CALL get_payouts()`;
            let [rows, _] = await this.db.query(sqlQuery);
            return rows[0];
        } catch (error) {
            throw error;
        }
    };

    getSeekerPayouts = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_payouts(?)`;
            let [rows, _] = await this.db.query(sqlQuery, [seekerID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    };

    getProviderPayouts = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_payouts(?)`;
            let [rows, _] = await this.db.query(sqlQuery, [providerID]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    };

    getPayoutByID = async (payoutID) => {
        try {
            let sqlQuery = `CALL get_payout_by_id(?)`;
            let [rows, _] = await this.db.query(sqlQuery, [payoutID]);
            return rows[0][0];
        } catch (error) {
            throw error;
        }
    };
}

module.exports = PayoutRepo;
