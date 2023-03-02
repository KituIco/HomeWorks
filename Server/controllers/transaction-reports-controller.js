class TransactionReportsController {
    constructor(
        transactionReportsRepo,
        clientErrors,
        serverErrors,
        transactionReportsValidator = null,
        nanoid
    ) {
        this.transactionReportsRepo = transactionReportsRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.transactionReportsValidator = transactionReportsValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createTransactionReport = async (req, res) => {
        try {
            let {
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            } = req.body;

            // TODO: Pre-query validation
                // Validate if necessary fields are not null
                // Validate if bookingID exists in the database
                // Validate if paymentID exists in the database
                // Validate if specsID exists in the database
                // Validate if seekerID exists in the database
                // Validate if providerID exists in the database
                // Validate if serviceID exists in the database

            let reportID = this.nanoid(14);

            await this.transactionReportsRepo.createTransactionReport(
                reportID,
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            );

            let createdTransactionReport = {
                ...req.body
            }

            createdTransactionReport.reportID = reportID;

            res.status(201).json({
                message: "Transaction Report created successfully",
                body: createdTransactionReport
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/:reportID"
    patchTransactionReport = async (req, res) => {
        try {
            let {
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            } = req.body;

            let {reportID} = req.params;

            // TODO: Pre-query validation
                // Validate if reportID is not null
                // Validate if reportID exists in the database
                // Validate if necessary fields are not null
                // Validate if bookingID exists in the database
                // Validate if paymentID exists in the database
                // Validate if specsID exists in the database
                // Validate if seekerID exists in the database
                // Validate if providerID exists in the database
                // Validate if serviceID exists in the database
            
            await this.transactionReportsRepo.patchTransactionReport(
                reportID,
                bookingID,
                paymentID,
                specsID,
                seekerID,
                providerID,
                serviceID,
                transactionStat
            );

            let patchedTransactionReport = {
                ...req.body
            }

            patchedTransactionReport.reportID = reportID;

            res.status(200).json({
                message: `Transaction Report with ID ${reportID} patched successfully`,
                body: patchedTransactionReport
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // DELETE: "/:reportID"
    deleteTransactionReport = async (req, res) => {
        try {
            let {reportID} = req.params;

            // TODO: Pre-query validation
                // Validate if reportID is not null
                // Validate if reportID exists in the database
            
            await this.transactionReportsRepo.deleteTransactionReport(reportID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "?keyword="
    getTransactionReportsByKeywords = async (req, res, next) => {
        try {
            let {keyword} = req.query;

            if (keyword == null) {
                return next();
            }

            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByKeywords(keyword);

            res.status(200).json({
                message: `Transaction Reports with keyword ${keyword} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getTransactionReports = async (req, res) => {
        try {
            let transactionReports = await this.transactionReportsRepo.getTransactionReports();

            res.status(200).json({
                message: "Transaction Reports retrieved successfully",
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getTransactionReportsBySeekerID = async (req, res) => {
        try {
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
                // Validate if seekerID exists in the database
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsBySeekerID(seekerID);

            res.status(200).json({
                message: `Transaction Reports with Seeker ID ${seekerID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/provider/:providerID"
    getTransactionReportsByProviderID = async (req, res) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validation
                // Validate if providerID is not null
                // Validate if providerID exists in the database
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByProviderID(providerID);

            res.status(200).json({
                message: `Transaction Reports with Provider ID ${providerID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/service/:serviceID"
    getTransactionReportsByServiceID = async (req, res) => {
        try {
            let {serviceID} = req.params;

            // TODO: Pre-query validation
                // Validate if serviceID is not null
                // Validate if serviceID exists in the database
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByServiceID(serviceID);

            res.status(200).json({
                message: `Transaction Reports with Service ID ${serviceID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/status/:statusID"
    getTransactionReportsByStatusCode = async (req, res) => {
        try {
            let {statusID} = req.params;

            // TODO: Pre-query validation
                // Validate if statusCode is not null
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByStatusCode(statusID);

            res.status(200).json({
                message: `Transaction Reports with Status Code ${statusCode} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:reportID"
    getTransactionReportByID = async (req, res) => {
        try {
            let {reportID} = req.params;

            // TODO: Pre-query validation
                // Validate if reportID is not null

            let transactionReport = await this.transactionReportsRepo.getTransactionReportByID(reportID);

            // TODO: Post-query validation
                // Validate if transactionReport is not empty
            
            res.status(200).json({
                message: `Transaction Report with ID ${reportID} retrieved successfully`,
                body: transactionReport
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = TransactionReportsController;