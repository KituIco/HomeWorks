class CredentialsController {
    constructor(
        credentialsRepo,
        userRepo,
        clientErrors,
        credentialsValidator,
        nanoid,
        jwt,
        bcrypt
    ) {
        this.credentialsRepo = credentialsRepo;
        this.userRepo = userRepo;
        this.clientErrors = clientErrors;
        this.credentialsValidator = credentialsValidator;
        this.nanoid = nanoid;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    // POST: ""
    createCredentials = async (req, res, next) => {
        try {
            let {
                userID,
                identifier
            } = req.body;
            
            // validating the create payload
            this.credentialsValidator.validateCreatePayload(req.body, ['userID', 'identifier']);

            // validating the existence of the user
            await this.validateUserExistence(userID);

            // validating the identifier follows the rules
            this.credentialsValidator.validateIdentifier(identifier);

            // validating the existence of the identifier
            await this.credentialsValidator.validateExistenceOfIdentifier(identifier);

            let result = await this.credentialsRepo.getUserCredentials(userID);
            let password = result[0].hashedPassword;
            let credentialsID = this.nanoid(14);
            await this.credentialsRepo.createCredentials(
                credentialsID,
                userID,
                identifier,
                password
            );

            let createdCredential = {
                ...req.body
            }
            
            createdCredential.credentialsID = credentialsID;

            res.status(201).json({
                message: "Credentials created successfully",
                data: createdCredential
            });
        } catch (error) {
            next(error);
        }
    };

    // POST: "/login"
    login = async (req, res, next) => {
        try {
            let {identifier, password} = req.body;
            let { userType } = req.query;

            // Validate the create payload
            this.credentialsValidator.validateCreatePayload(req.body, ['identifier', 'password']);

            // Validate if userType is not null
            this.credentialsValidator.checkRequiredQueryParameters(req.query, ['userType']);

            let result;

            if (userType == 'Seeker') {
                result = await this.credentialsRepo.getSeekerHashedPassword(identifier);
            } else if (userType == 'Provider') {
                result = await this.credentialsRepo.getProviderHashedPassword(identifier);
            } else {
                throw new this.clientErrors.Api400Error('userType has incorrect value can only be "seeker" or "provider"');
            }

            // validate if the identifier exists in seeker or provider
            if (result == null) {
                throw new this.clientErrors.Api401Error(`${userType} with identifier ${identifier} does not exist`)
            }

            let {hashedPassword, userID} = result;

            let isPasswordCorrect = await this.bcrypt.compare(password, hashedPassword);

            if (!isPasswordCorrect) {
                // TODO: Implement error handling
                throw new this.clientErrors.Api401Error('Password is incorrect');
            }

            let user = {
                userID: userID,
            }

            let accessToken = this.jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            let refreshToken = this.jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            res.cookie('access_token', accessToken, {
                maxAge: 60000
                // httpOnly: true,
                // secure: true
                // domain: 'correct domain'
            });

            res.cookie('refresh_token', refreshToken, {
                maxAge: 604800000
                // httpOnly: true,
                // secure: true
                // domain: 'correct domain'
            });

            res.status(200).json({
                message: "Login successful",
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }   
    };

    // DELETE: "/logout"
    logout = async (req, res, next) => {
        try {
            // TODO: Validate if token exists in cookies
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({
                message: "Logout successful",
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/user/:userID/email"
    patchEmail = async (req, res, next) => {
        try {
            let {email} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;
            
            // Validate if userID is not null
            this.credentialsValidator.checkRequiredParameters(req.params, ['userID'])
                // validate if userID exists in the database
            await this.validateUserExistence(userID);
            
            // Validate if email is not null
            this.credentialsValidator.checkRequiredBodyFieldNames(req.body, ['email']);
            
            // Validate if email follows format and exists in database
            await this.credentialsValidator.validateIdentifiers({
                email
            })

            let result = await this.credentialsRepo.getUserCredentials(userID);

            let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

            let credentialsID = result.reduce(
                (emailCredential, credential) => {
                    if (emailRegex.test(credential.identifier)) {
                        emailCredential = credential.credentialsID;
                    }
                    return emailCredential;
                }, null
            )

            if (credentialsID == null) {
                // TODO: Implement error handling
                throw new this.clientErrors.Api404Error('Email does not exist so nothing to update');
            }

            await this.credentialsRepo.patchCredentials(
                credentialsID,
                null,
                email,
                null
            );

            res.status(200).json({
                message: `User with ID ${userID} Email updated successfully`,
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/user/:userID/phone-number"
    patchPhoneNumber = async (req, res, next) => {
        try {
            let {phoneNumber} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;
            
                // Validate if userID is not null
            this.credentialsValidator.checkRequiredParameters(req.params, ['userID'])
                // validate if userID exists in the database
            await this.validateUserExistence(userID);
            
            // Validate if phoneNumber is not null
            this.credentialsValidator.checkRequiredBodyFieldNames(req.body, ['phoneNumber']);
            
            // Validate if phoneNumber follows format and exists in database
            await this.credentialsValidator.validateIdentifiers({
                phoneNumber
            });

            let result = await this.credentialsRepo.getUserCredentials(userID);
            let phoneNumberRegex = new RegExp(/^\+639[0-9]{9}/);

            let credentialsID = result.reduce(
                (phoneNumberCredential, credential) => {
                    if (phoneNumberRegex.test(credential.identifier)) {
                        phoneNumberCredential = credential.credentialsID;
                    }
                    return phoneNumberCredential;
                }, null
            )

            if (credentialsID == null) {
                // TODO: Implement error handling
                throw new this.clientErrors.Api404Error('Phone number does not exist so nothing to update');
            }

            await this.credentialsRepo.patchCredentials(
                credentialsID,
                null,
                phoneNumber,
                null
            );

            res.status(200).json({
                message: `User with ID ${userID} Phone number updated successfully`,
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/user/:userID/password"
    patchPassword = async (req, res, next) => {
        try {
            let {password} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;

                // Validate if userID is not null
            this.credentialsValidator.checkRequiredParameters(req.params, ['userID'])

                // validate if userID exists in the database
            await this.validateUserExistence(userID);

            // Validate if password is not null
            this.credentialsValidator.checkRequiredBodyFieldNames(req.body, ['password']);

            // validate if password follows correct format
            this.credentialsValidator.validateIdentifierOrPassword(password, 'password');
            
            let hashedPassword = await this.bcrypt.hash(password, 10);

            await this.credentialsRepo.patchUserCredentials(
                userID,
                null,
                hashedPassword
            );

            res.status(200).json({
                message: `User with ID ${userID} Password updated successfully`,
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/user/:userID"
    getUserCredentials = async (req, res, next) => {
        try {
            let {userID} = req.params;
                // let {userID} = req.user;
            
            // Validate if userID is not null
            this.credentialsValidator.checkRequiredParameters(req.params, ['userID'])
                // validate if userID exists in the database
            await this.validateUserExistence(userID);

            let result = await this.credentialsRepo.getUserCredentials(userID);
            let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
            let phoneNumberRegex = new RegExp(/^\+639[0-9]{9}/);

            let email = result.reduce(
                (email, credential) => {
                    if (emailRegex.test(credential.identifier)) {
                        email = credential.identifier;
                    }
                    return email;
                }, null
            )

            let phoneNumber = result.reduce(
                (phoneNumber, credential) => {
                    if (phoneNumberRegex.test(credential.identifier)) {
                        phoneNumber = credential.identifier;
                    }
                    return phoneNumber;
                }, null
            )

            let userName = result.reduce(
                (userName, credential) => {
                    if (!emailRegex.test(credential.identifier) && !phoneNumberRegex.test(credential.identifier)) {
                        userName = credential.identifier;
                        
                    }
                    return userName;
                }, null
            )

            let responseBody = {
                email: email,
                phoneNumber: phoneNumber,
                username: userName
            }

            res.status(200).json({
                message: `User with ID ${userID} credentials retrieved successfully`,
                body: responseBody
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    validateUserExistence = async (userID) => {
        const user = await this.userRepo.getUser(userID);
        if (user == null) {
            throw new this.clientErrors.Api404Error(`User ${userID} does not exist`);
        }
    };
    
}

module.exports = CredentialsController;