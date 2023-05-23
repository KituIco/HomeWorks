class CardPaymentRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createCardPayment = async (
        cardID,
        userID,
        cardNum,
        expiryDate,
        cvv,
        merchant,
        cardType
    ) => {
        try {
            let sqlQuery = `CALL create_card_payment(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                cardID,
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType,
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchCardPayment = async (
        cardID,
        userID,
        cardNum,
        expiryDate,
        cvv,
        merchant,
        cardType
    ) => {
        try {
            let sqlQuery = `CALL patch_card_payment(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                cardID,
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType,
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteCardPayment = async (cardID) => {
        try {
            let sqlQuery = `CALL delete_card_payment(?)`;
            await this.db.query(sqlQuery, [cardID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllCardPayments = async () => {
        try {
            let sqlQuery = `CALL get_all_card_payments()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getUserCardPayments = async (userID) => {
        try {
            let sqlQuery = `CALL get_user_card_payments(?)`;
            let [result, _] = await this.db.query(sqlQuery, [userID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getCardPaymentByID = async (cardID) => {
        try {
            let sqlQuery = `CALL get_card_payment_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [cardID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = CardPaymentRepository;
