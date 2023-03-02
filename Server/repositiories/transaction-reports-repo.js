class TransactionReportsRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createTransactionReport = async (
        reportID,
        bookingID,
        paymentID,
        specsID,
        seekerID,
        providerID,
        serviceID,
        transactionStat
    ) => {
        try {
            let sqlQuery = `CALL create_transaction_report(?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                reportID,
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchTransactionReport = async (
        reportID,
        bookingID,
        paymentID,
        specsID,
        seekerID,
        providerID,
        serviceID,
        transactionStat
    ) => {
        try {
            let sqlQuery = `CALL patch_transaction_report(?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                reportID,
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteTransactionReport = async (reportID) => {
        try {
            let sqlQuery = `CALL delete_transaction_report(?)`;
            await this.db.query(sqlQuery, [reportID]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReports = async () => {
        try {
            let sqlQuery = `CALL get_transaction_reports()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportsBySeekerID = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_transaction_reports_by_seeker_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportsByProviderID = async (providerID) => {
        try {
            let sqlQuery = `CALL get_transaction_reports_by_provider_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportsByServiceID = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_transaction_reports_by_service_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportsByKeywords = async (keywords) => {
        try {
            let sqlQuery = `CALL get_transaction_reports_by_keywords(?)`;
            let [result, _] = await this.db.query(sqlQuery, [keywords]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportsByStatusCode = async (statusCode) => {
        try {
            let sqlQuery = `CALL get_transaction_reports_by_status_code(?)`;
            let [result, _] = await this.db.query(sqlQuery, [statusCode]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getTransactionReportByID = async (reportID) => {
        try {
            let sqlQuery = `CALL get_transaction_report_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [reportID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = TransactionReportsRepository;