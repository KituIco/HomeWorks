class TransactionReportsController {
    constructor(
        transactionReportsRepo,
        clientErrors,
        transactionReportsValidator,
        nanoid
    ) {
        this.transactionReportsRepo = transactionReportsRepo;
        this.clientErrors = clientErrors;
        this.transactionReportsValidator = transactionReportsValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createTransactionReport = async (req, res, next) => {
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
            this.transactionReportsValidator.validateCreatePayload(req.body, ['bookingID', 'paymentID', 'specsID', 'seekerID', 'providerID', 'serviceID']);
                // Validate if bookingID exists in the database
            await this.transactionReportsValidator.validateExistence(bookingID, 'booking');
                // Validate if paymentID exists in the database
            await this.transactionReportsValidator.validateExistence(paymentID, 'payment');
                // Validate if specsID exists in the database
            await this.transactionReportsValidator.validateExistence(specsID, 'specs');
                // Validate if seekerID exists in the database
            await this.transactionReportsValidator.validateExistence(seekerID, 'seeker');
                // Validate if providerID exists in the database
            await this.transactionReportsValidator.validateExistence(providerID, 'provider');
                // Validate if serviceID exists in the database
            await this.transactionReportsValidator.validateExistence(serviceID, 'service');

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
            next(error);
        }
    };

    // PATCH: "/:reportID"
    patchTransactionReport = async (req, res, next) => {
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
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['reportID']);
                // Validate if reportID exists in the database
            await this.transactionReportsValidator.validateExistence(reportID, 'report');
                // Validate if necessary fields are not null
            this.transactionReportsValidator.validatePatchPayload(req.body);
                // Validate if bookingID exists in the database
            bookingID != null && await this.transactionReportsValidator.validateExistence(bookingID, 'booking');
                // Validate if paymentID exists in the database
            paymentID != null && await this.transactionReportsValidator.validateExistence(paymentID, 'payment');
                // Validate if specsID exists in the database
            specsID != null && await this.transactionReportsValidator.validateExistence(specsID, 'specs');
                // Validate if seekerID exists in the database
            seekerID != null && await this.transactionReportsValidator.validateExistence(seekerID, 'seeker');
                // Validate if providerID exists in the database
            providerID != null && await this.transactionReportsValidator.validateExistence(providerID, 'provider');
                // Validate if serviceID exists in the database
            serviceID != null && await this.transactionReportsValidator.validateExistence(serviceID, 'service');
            
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
            next(error);
        }
    };

    // DELETE: "/:reportID"
    deleteTransactionReport = async (req, res, next) => {
        try {
            let {reportID} = req.params;

            // TODO: Pre-query validation
                // Validate if reportID is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['reportID']);
                // Validate if reportID exists in the database
            await this.transactionReportsValidator.validateExistence(reportID, 'report');
            
            await this.transactionReportsRepo.deleteTransactionReport(reportID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
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
            next(error);
        }
    };

    // GET: ""
    getTransactionReports = async (req, res, next) => {
        try {
            let transactionReports = await this.transactionReportsRepo.getTransactionReports();

            res.status(200).json({
                message: "Transaction Reports retrieved successfully",
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getTransactionReportsBySeekerID = async (req, res, next) => {
        try {
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['seekerID']);
                // Validate if seekerID exists in the database
            await this.transactionReportsValidator.validateExistence(seekerID, 'seeker');
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsBySeekerID(seekerID);

            res.status(200).json({
                message: `Transaction Reports with Seeker ID ${seekerID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/provider/:providerID"
    getTransactionReportsByProviderID = async (req, res, next) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validation
                // Validate if providerID is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['providerID']);
                // Validate if providerID exists in the database
            await this.transactionReportsValidator.validateExistence(providerID, 'provider');
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByProviderID(providerID);

            res.status(200).json({
                message: `Transaction Reports with Provider ID ${providerID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/service/:serviceID"
    getTransactionReportsByServiceID = async (req, res, next) => {
        try {
            let {serviceID} = req.params;

            // TODO: Pre-query validation
                // Validate if serviceID is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['serviceID']);
                // Validate if serviceID exists in the database
            await this.transactionReportsValidator.validateExistence(serviceID, 'service');
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByServiceID(serviceID);

            res.status(200).json({
                message: `Transaction Reports with Service ID ${serviceID} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/status/:statusID"
    getTransactionReportsByStatusCode = async (req, res, next) => {
        try {
            let {statusID} = req.params;

            // TODO: Pre-query validation
                // Validate if statusCode is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['statusID']);
            
            let transactionReports = await this.transactionReportsRepo.getTransactionReportsByStatusCode(statusID);

            res.status(200).json({
                message: `Transaction Reports with Status Code ${statusCode} retrieved successfully`,
                body: transactionReports
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:reportID"
    getTransactionReportByID = async (req, res, next) => {
        try {
            let {reportID} = req.params;

            // TODO: Pre-query validation
                // Validate if reportID is not null
            this.transactionReportsValidator.checkRequiredParameters(req.params, ['reportID']);

            let transactionReport = await this.transactionReportsRepo.getTransactionReportByID(reportID);

            // TODO: Post-query validation
                // Validate if transactionReport is not empty
            
            res.status(200).json({
                message: `Transaction Report with ID ${reportID} retrieved successfully`,
                body: transactionReport
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = TransactionReportsController;