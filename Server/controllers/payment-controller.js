class PaymentController {
    constructor(
        paymentRepo,
        clientErrors,
        serverErrors,
        paymentValidator = null,
        nanoid
    ) {
        this.paymentRepo = paymentRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.paymentValidator = paymentValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createPayment = async (req, res) => {
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
                // validate if seekerID exists
                // validate if providerID exists
                // validate if serviceID exists

            let paymentID = this.nanoid.nanoid(14);

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
            console.log(error);
        }
    };

    // PATCH: "/:paymentID"
    patchPayment = async (req, res) => {
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
                // validate if all fields are not null
                // validate if paymentID is not null
                // validate if paymentID exists
                // validate if seekerID exists
                // validate if providerID exists
                // validate if serviceID exists

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
            console.log(error);
        }
    };

    // DELETE: "/:paymentID"
    deletePayment = async (req, res) => {
        try {
            let {paymentID} = req.params;

            // TODO: Pre-query validation
                // validate if paymentID is not null
                // validate if paymentID exists
            
            await this.paymentRepo.deletePayment(paymentID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "" 
    getAllPayments = async (req, res) => {
        try {
            let payments = await this.paymentRepo.getAllPayments();

            res.status(200).json({
                message: "All payments retrieved successfully",
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/status?paymentStatus="
    getAllPaymentsByStatus = async (req, res) => {
        try {
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if paymentStatus is not null
                // validate if paymentStatus is valid
            
            let payments = await this.paymentRepo.getAllPaymentsByStatus(paymentStatus);

            res.status(200).json({
                message: `All payments with status ${paymentStatus} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID?paymentStatus="
    getSeekerPaymentsByStatus = async (req, res, next) => {
        try {
            let {seekerID} = req.params;
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if seekerID is not null
                // validate if seekerID exists
                // validate if paymentStatus is not null
                // validate if paymentStatus is valid

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
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerPayments = async (req, res) => {
        try {
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // validate if seekerID is not null
                // validate if seekerID exists
            
            let payments = await this.paymentRepo.getSeekerPayments(seekerID);

            res.status(200).json({
                message: `All payments of seeker ${seekerID} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/provider/:providerID?paymentStatus="
    getProviderPaymentsByStatus = async (req, res, next) => {
        try {
            let {providerID} = req.params;
            let {paymentStatus} = req.query;

            // TODO: Pre-query validation
                // validate if providerID is not null
                // validate if providerID exists
                // validate if paymentStatus is not null
                // validate if paymentStatus is valid
            
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
            console.log(error);
        }
    };

    // GET: "/provider/:providerID"
    getProviderPayments = async (req, res) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
                // validate if providerID exists

            let payments = await this.paymentRepo.getProviderPayments(providerID);

            res.status(200).json({
                message: `All payments of provider ${providerID} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/method?paymentMethod="
    getPaymentByMethod = async (req, res) => {
        try {
            let {paymentMethod} = req.query;

            // TODO: Pre-query validation
                // validate if paymentMethod is not null
                // validate if paymentMethod is valid

            let payments = await this.paymentRepo.getPaymentByMethod(paymentMethod);

            res.status(200).json({
                message: `All payments with method ${paymentMethod} retrieved successfully`,
                body: payments
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:paymentID"
    getPaymentByID = async (req, res) => {
        try {
            let {paymentID} = req.params;

            // TODO: Pre-query validation
                // validate if paymentID is not null
                // validate if paymentID exists

            let payment = await this.paymentRepo.getPaymentByID(paymentID);

            res.status(200).json({
                message: `Payment ${paymentID} retrieved successfully`,
                body: payment
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = PaymentController;