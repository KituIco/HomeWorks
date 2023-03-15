class PaymentController {
    constructor(
        paymentRepo,
        clientErrors,
        paymentValidator = null,
        nanoid
    ) {
        this.paymentRepo = paymentRepo;
        this.clientErrors = clientErrors;
        this.paymentValidator = paymentValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createPayment = async (req, res, next) => {
        try {
            let {
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                amount,
                paymentStatus
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.paymentValidator.validateCreatePayload(req.body, ['seekerID', 'providerID', 'serviceID']);
                // validate if seekerID exists
            await this.paymentValidator.validateExistence(seekerID, 'seeker');
                // validate if providerID exists
            await this.paymentValidator.validateExistence(providerID, 'provider');
                // validate if serviceID exists
            await this.paymentValidator.validateExistence(serviceID, 'service');

            let paymentID = this.nanoid(14);

            await this.paymentRepo.createPayment(
                paymentID,
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                amount,
                paymentStatus
            );

            let createdPayment = {
                ...req.body
            }
            createdPayment.paymentID = paymentID;
            
            res.status(201).json({
                message: "Payment created successfully",
                body: createdPayment
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:paymentID"
    patchPayment = async (req, res, next) => {
        try {
            let {paymentID} = req.params;
            let {
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                amount,
                paymentStatus
            } = req.body;

            // TODO: Pre-query validation
                // validate if paymentID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['paymentID']);
                // validate if paymentID exists
            await this.paymentValidator.validateExistence(paymentID, 'payment');
                // Validate if not all fields are null
            this.paymentValidator.validatePatchPayload(req.body);
                // validate if seekerID exists
            await this.paymentValidator.validateExistence(seekerID, 'seeker');
                // validate if providerID exists
            await this.paymentValidator.validateExistence(providerID, 'provider');
                // validate if serviceID exists
            await this.paymentValidator.validateExistence(serviceID, 'service');

            await this.paymentRepo.patchPayment(
                paymentID,
                seekerID,
                providerID,
                serviceID,
                paymentMethod,
                amount,
                paymentStatus
            );

            let patchedPayment = {
                ...req.body
            }
            patchedPayment.paymentID = paymentID;

            res.status(200).json({
                message: `Payment ${paymentID} patched successfully`,
                body: patchedPayment
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:paymentID"
    deletePayment = async (req, res, next) => {
        try {
            let {paymentID} = req.params;

            // TODO: Pre-query validation
                // validate if paymentID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['paymentID']);
                // validate if paymentID exists
            await this.paymentValidator.validateExistence(paymentID, 'payment');
            
            await this.paymentRepo.deletePayment(paymentID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "" 
    getAllPayments = async (req, res, next) => {
        try {
            let payments = await this.paymentRepo.getAllPayments();

            res.status(200).json({
                message: "All payments retrieved successfully",
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/status?paymentStatus="
    getAllPaymentsByStatus = async (req, res, next) => {
        try {
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if paymentStatus is not null
            this.paymentValidator.checkRequiredQueryParameters(req.query, ['paymentStatus']);
                // validate if paymentStatus is valid
            this.paymentValidator.validatePaymentStatus(paymentStatus);
            
            let payments = await this.paymentRepo.getAllPaymentsByStatus(paymentStatus);

            res.status(200).json({
                message: `All payments with status ${paymentStatus} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/seeker/:seekerID?paymentStatus="
    getSeekerPaymentsByStatus = async (req, res, next) => {
        try {
            let {seekerID} = req.params;
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if seekerID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['seekerID']);
                // validate if seekerID exists
            await this.paymentValidator.validateExistence(seekerID, 'seeker');
                // validate if paymentStatus is not null
            this.paymentValidator.checkRequiredQueryParameters(req.query, ['paymentStatus']);
                // validate if paymentStatus is valid
            this.paymentValidator.validatePaymentStatus(paymentStatus);

            if (paymentStatus == null) {
                 return next();
            }

            let payments = await this.paymentRepo.getSeekerPaymentsByStatus(seekerID, paymentStatus);

            res.status(200).json({
                message: `All payments of seeker ${seekerID} with status ${paymentStatus} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next();
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerPayments = async (req, res, next) => {
        try {
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // validate if seekerID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['seekerID']);
                // validate if seekerID exists
            await this.paymentValidator.validateExistence(seekerID, 'seeker');
            
            let payments = await this.paymentRepo.getSeekerPayments(seekerID);

            res.status(200).json({
                message: `All payments of seeker ${seekerID} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/provider/:providerID?paymentStatus="
    getProviderPaymentsByStatus = async (req, res, next) => {
        try {
            let {providerID} = req.params;
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.paymentValidator.validateExistence(providerID, 'provider');
                // validate if paymentStatus is not null
            this.paymentValidator.checkRequiredQueryParameters(req.query, ['paymentStatus']);
                // validate if paymentStatus is valid
            this.paymentValidator.validatePaymentStatus(paymentStatus);
            
            if (paymentStatus == null) {
                return next();
            }

            let payments = await this.paymentRepo.getProviderPaymentsByStatus(providerID, paymentStatus);

            res.status(200).json({
                message: `All payments of provider ${providerID} with status ${paymentStatus} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next();
        }
    };

    // GET: "/provider/:providerID"
    getProviderPayments = async (req, res, next) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.paymentValidator.validateExistence(providerID, 'provider');

            let payments = await this.paymentRepo.getProviderPayments(providerID);

            res.status(200).json({
                message: `All payments of provider ${providerID} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/method?paymentMethod="
    getPaymentByMethod = async (req, res, next) => {
        try {
            let {paymentMethod} = req.query;

            // TODO: Pre-query validation
                // validate if paymentMethod is not null
            this.paymentValidator.checkRequiredQueryParameters(req.query, ['paymentMethod']);
                // validate if paymentMethod is valid
            this.paymentValidator.validatePaymentMethod(paymentMethod);

            let payments = await this.paymentRepo.getPaymentByMethod(paymentMethod);

            res.status(200).json({
                message: `All payments with method ${paymentMethod} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:paymentID"
    getPaymentByID = async (req, res, next) => {
        try {
            let {paymentID} = req.params;

            // TODO: Pre-query validation
                // validate if paymentID is not null
            this.paymentValidator.checkRequiredParameters(req.params, ['paymentID']);
                // validate if paymentID exists

            let payment = await this.paymentRepo.getPaymentByID(paymentID);

            res.status(200).json({
                message: `Payment ${paymentID} retrieved successfully`,
                body: payment
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = PaymentController;