class MessageRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createMessage = async (
        messageID,
        bookingID,
        userID,
        dateTimestamp,
        message,
        images
    ) => {
        try {
            let sqlQuery = `CALL create_message(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                messageID,
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            ]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchMessage = async (
        messageID,
        bookingID,
        userID,
        dateTimestamp,
        message,
        images
    ) => { 
        try {
            let sqlQuery = `CALL patch_message(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                messageID,
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            ]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteMessage = async (messageID) => {
        try {
            let sqlQuery = `CALL delete_message(?)`;
            await this.db.query(sqlQuery, [messageID]);
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getMessages = async () => {
        try {
            let sqlQuery = `CALL get_messages()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getBookingMessages = async (bookingID) => {
        try {
            let sqlQuery = `CALL get_booking_messages(?)`;
            let [result, _] = await this.db.query(sqlQuery, [bookingID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getBookingMessagesByKeyword = async (bookingID, keyword) => {
        try {
            let sqlQuery = `CALL get_booking_messages_by_keyword(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [bookingID, keyword]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getMessage = async (messageID) => {
        try {
            let sqlQuery = `CALL get_message(?)`;
            let [result, _] = await this.db.query(sqlQuery, [messageID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = MessageRepository;