class MessageController {
    constructor(
        messageRepo,
        clientErrors,
        messageValidator,
        nanoid
    ) {
        this.messageRepo = messageRepo;
        this.clientErrors = clientErrors;
        this.messageValidator = messageValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createMessage = async(req, res, next) => {
        try {
            let {
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            } = req.body;

            // Pre-query validations
                // Validate if necessary fields are not null
            this.messageValidator.validateCreatePayload(req.body, ['bookingID', 'userID', 'dateTimestamp']);
                // Validate if bookingID exists in database
            await this.messageValidator.validateExistence(bookingID, 'booking');
                // Validate if userID exists in database
            await this.messageValidator.validateExistence(userID, 'user');

            let messageID = this.nanoid(14);

            await this.messageRepo.createMessage(
                messageID,
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            );

            let newMessage = {
                ...req.body
            }
            newMessage.messageID = messageID;
            
            res.status(201).json({
                message: 'Message created successfully',
                body: newMessage
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:messageID"
    patchMessage = async(req, res, next) => {
        try {
            let {
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            } = req.body;

            let {messageID} = req.params;
            
            // TODO: Pre-query validations
                // Validate if messageID is not null
            this.messageValidator.checkRequiredParameters(req.params, ['messageID']);
                // Validate if messageID exists in database
            await this.messageValidator.validateExistence(messageID, 'message');
                // Validate if not all fields are null
            this.messageValidator.validatePatchPayload(req.body);
                // Validate if bookingID exists in database
            bookingID != null && await this.messageValidator.validateExistence(bookingID, 'booking');
                // Validate if userID exists in database
            userID != null && await this.messageValidator.validateExistence(userID, 'user');

            await this.messageRepo.patchMessage(
                messageID,
                bookingID,
                userID,
                dateTimestamp,
                message,
                images
            );

            let patchedMessage = {
                ...req.body
            }
            patchedMessage.messageID = messageID;
            
            res.status(200).json({
                message: 'Message patched successfully',
                body: patchedMessage
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:messageID"
    deleteMessage = async(req, res, next) => {
        try {
            let {messageID} = req.params;

            // TODO: Pre-query validations
                // Validate if messageID is not null
            this.messageValidator.checkRequiredParameters(req.params, ['messageID']);
                // Validate if messageID exists in database
            await this.messageValidator.validateExistence(messageID, 'message');
            
            await this.messageRepo.deleteMessage(messageID);
            
            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getMessages = async(req, res, next) => {
        try {
            let messages = await this.messageRepo.getMessages();

            res.status(200).json({
                message: 'Messages retrieved successfully',
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/booking/:bookingID?keyword="
    getBookingMessagesByKeyword = async(req, res, next) => {
        try {
            let {bookingID} = req.params;
            let {keyword} = req.query;

            // TODO: Pre-query validations
                // Validate if bookingID is not null
            this.messageValidator.checkRequiredParameters(req.params, ['bookingID']);
                // Validate if bookingID exists in database
            await this.messageValidator.validateExistence(bookingID, 'booking');
                // Validate if keyword is not null
            if (keyword == null) {
                return next();
            }

            let messages = await this.messageRepo.getBookingMessagesByKeyword(bookingID, keyword);

            res.status(200).json({
                message: `Messages from Booking ${bookingID} retrieved successfully`,
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            next();
        }
    };

    // GET: "/booking/:bookingID"
    getBookingMessages = async(req, res, next) => {
        try {
            let {bookingID} = req.params;

            // TODO: Pre-query validations
                // Validate if bookingID is not null
            this.messageValidator.checkRequiredParameters(req.params, ['bookingID']);
                // Validate if bookingID exists in database
            await this.messageValidator.validateExistence(bookingID, 'booking');
            
            let messages = await this.messageRepo.getBookingMessages(bookingID);

            res.status(200).json({
                message: `Messages from Booking ${bookingID} retrieved successfully`,
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:messageID"
    getMessage = async(req, res, next) => {
        try {
            let {messageID} = req.params;

            // TODO: Pre-query validations
                // Validate if messageID is not null
            this.messageValidator.checkRequiredParameters(req.params, ['messageID']);
            
            let message = await this.messageRepo.getMessage(messageID);

            // TODO: Post-query validations
                // Validate if message is not null
            
            res.status(200).json({
                message: `Message ${messageID} retrieved successfully`,
                body: message
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

}

module.exports = MessageController;