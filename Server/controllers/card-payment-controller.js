class CardPaymentController {
    constructor(
        cardPaymentRepo,
        clientErrors,
        cardPaymentValidator,
        nanoid
    ) {
        this.cardPaymentRepo = cardPaymentRepo;
        this.clientErrors = clientErrors;
        this.cardPaymentValidator = cardPaymentValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createCardPayment = async(req, res, next) => {
        try {
            let {
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType
            } = req.body;

            // Client Errors
            // TODO: Pre-query validations
                // Validate if necessary fields are not null
            this.cardPaymentValidator.validateCreatePayload(req.body, ['userID', 'cardNum', 'expiryDate', 'cvv', 'cardType']);
                // Validate if userID exists in database
            await this.cardPaymentValidator.validateExistence(userID, 'user');

            let cardID = this.nanoid(14);

            await this.cardPaymentRepo.createCardPayment(
                cardID,
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType
            );

            let newCardPayment = {
                ...req.body
            }
            newCardPayment.cardID = cardID;

            res.status(201).json({
                message: `Card payment for User ${userID} created successfully`,
                body: newCardPayment
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:cardID"
    patchCardPayment = async(req, res, next) => {
        try {
            let {cardID} = req.params;
            let {
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType
            } = req.body;

            // Client Errors
            // TODO: Pre-query validations
                // Validate if cardID is not null
            this.cardPaymentValidator.checkRequiredParameters(req.params, ['cardID']);
                // Validate if cardID exists in database
            await this.cardPaymentValidator.validateExistence(cardID, 'cardPayment');
                // Validate if necessary fields are not null
            this.cardPaymentValidator.validatePatchPayload(req.body);
                // Validate if userID exists in database
            userID != null && await this.cardPaymentValidator.validateExistence(userID, 'user');
            
            await this.cardPaymentRepo.patchCardPayment(
                cardID,
                userID,
                cardNum,
                expiryDate,
                cvv,
                merchant,
                cardType
            );

            let patchedCardPayment = {
                ...req.body
            }
            patchedCardPayment.cardID = cardID;

            res.status(200).json({
                message: `Card payment for User ${userID} patched successfully`,
                body: patchedCardPayment
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:cardID"
    deleteCardPayment = async(req, res, next) => {
        try {
            let {cardID} = req.params;

            // Client Errors
            // TODO: Pre-query validations
                // Validate if cardID is not null
            this.cardPaymentValidator.checkRequiredParameters(req.params, ['cardID']);
                // Validate if cardID exists in database
            await this.cardPaymentValidator.validateExistence(cardID, 'cardPayment');
            
            await this.cardPaymentRepo.deleteCardPayment(cardID);

            res.status(204);
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllCardPayments = async(req, res, next) => {
        try {
            let allCardPayments = await this.cardPaymentRepo.getAllCardPayments();

            res.status(200).json({
                message: 'All card payments retrieved successfully',
                body: allCardPayments
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/user/:userID"
    getUserCardPayments = async(req, res, next) => {
        try {
            let {userID} = req.params;

            // Client Errors
            // TODO: Pre-query validations
                // Validate if userID is not null
            this.cardPaymentValidator.checkRequiredParameters(req.params, ['userID']);
                // Validate if userID exists in database
            await this.cardPaymentValidator.validateExistence(userID, 'user');
            
            let userCardPayments = await this.cardPaymentRepo.getUserCardPayments(userID);

            res.status(200).json({
                message: `All card payments for User ${userID} retrieved successfully`,
                body: userCardPayments
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/:cardID"
    getCardPaymentByID = async(req, res, next) => {
        try {
            let {cardID} = req.params;

            // TODO: Pre-query validations
                // Validate if cardID is not null
            this.cardPaymentValidator.checkRequiredParameters(req.params, ['cardID']);
            
            let cardPayment = await this.cardPaymentRepo.getCardPaymentByID(cardID);

            // TODO: Post-query validations
                // Validate if cardPayment length is not 0
            
            res.status(200).json({
                message: `Card payment with ID ${cardID} retrieved successfully`,
                body: cardPayment
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };
}

module.exports = CardPaymentController;