class MessageController {
    constructor(
        messageRepo,
        clientErrors,
        serverErrors,
        messageValidator = null,
        nanoid
    ) {
        this.messageRepo = messageRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.messageValidator = messageValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createMessage = async(req, res) => {
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
                // Validate if bookingID exists in database
                // Validate if userID exists in database

            let messageID = this.nanoid.nanoid(14);

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
            console.log(error);
        }
    };

    // PATCH: "/:messageID"
    patchMessage = async(req, res) => {
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
                // Validate if not all fields are null
                // Validate if bookingID exists in database
                // Validate if userID exists in database
                // Validate if messageID is not null
                // Validate if messageID exists in database

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
            console.log(error);
        }
    };

    // DELETE: "/:messageID"
    deleteMessage = async(req, res) => {
        try {
            let {messageID} = req.params;

            // TODO: Pre-query validations
                // Validate if messageID is not null
                // Validate if messageID exists in database
            
            await this.messageRepo.deleteMessage(messageID);
            
            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getMessages = async(req, res) => {
        try {
            let messages = await this.messageRepo.getMessages();

            res.status(200).json({
                message: 'Messages retrieved successfully',
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/booking/:bookingID?keyword="
    getBookingMessagesByKeyword = async(req, res, next) => {
        try {
            let {bookingID} = req.params;
            let {keyword} = req.query;

            // TODO: Pre-query validations
                // Validate if bookingID is not null
                // Validate if bookingID exists in database
                // Validate if keyword is not null

            if (keyword == null) {
                next();
            }

            let messages = await this.messageRepo.getBookingMessagesByKeyword(bookingID, keyword);

            res.status(200).json({
                message: `Messages from Booking ${bookingID} retrieved successfully`,
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/booking/:bookingID"
    getBookingMessages = async(req, res) => {
        try {
            let {bookingID} = req.params;

            // TODO: Pre-query validations
                // Validate if bookingID is not null
                // Validate if bookingID exists in database
            
            let messages = await this.messageRepo.getBookingMessages(bookingID);

            res.status(200).json({
                message: `Messages from Booking ${bookingID} retrieved successfully`,
                body: messages
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:messageID"
    getMessage = async(req, res) => {
        try {
            let {messageID} = req.params;

            // TODO: Pre-query validations
                // Validate if messageID is not null
            
            let message = await this.messageRepo.getMessage(messageID);

            // TODO: Post-query validations
                // Validate if message is not null
            
            res.status(200).json({
                message: `Message ${messageID} retrieved successfully`,
                body: message
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

}

module.exports = MessageController;