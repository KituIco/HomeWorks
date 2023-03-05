class CredentialsController {
    constructor(
        credentialsRepo,
        clientErrors,
        serverErrors,
        credentialsValidator = null,
        nanoid,
        jwt,
        bcrypt
    ) {
        this.credentialsRepo = credentialsRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.credentialsValidator = credentialsValidator;
        this.nanoid = nanoid;
        this.jwt = jwt;
        this.bcrypt = bcrypt;
    }

    // POST: "/login"
    login = async (req, res) => {
        try {
            let {identifier, password} = req.body;

            // Validate if email is not null
                // validate if email exists in the database
            // Validate if password is not null
            
            let result = await this.credentialsRepo.getHashedPassword(identifier);

            let {hashedPassword, userID} = result;

            let isPasswordCorrect = await this.bcrypt.compare(password, hashedPassword);

            if (!isPasswordCorrect) {
                // TODO: Implement error handling
                console.log('Password is incorrect');
            }

            let user = {
                userID: userID,
            }

            let accessToken = this.jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            let refreshToken = this.jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

            res.cookie('access_token', accessToken, {
                maxAge: 900000
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
            console.log(error);
        }   
    };

    // DELETE: "/logout"
    logout = async (req, res) => {
        try {
            // TODO: Validate if token exists in cookies
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({
                message: "Logout successful",
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/user/:userID/email"
    patchEmail = async (req, res) => {
        try {
            let {email} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;

            // Validate if email is not null
                // validate if email follows correct format
                // validate if email exists in the database
            // Validate if userID is not null
                // validate if userID exists in the database

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

            if (!credentialsID) {
                // TODO: Implement error handling
                console.log('Email does not exist');
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
            console.log(error);
        }
    };

    // PATCH: "/user/:userID/phone-number"
    patchPhoneNumber = async (req, res) => {
        try {
            let {phoneNumber} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;
            
            // Validate if phoneNumber is not null
                // validate if phoneNumber follows correct format
                // validate if phoneNumber exists in the database
            // Validate if userID is not null
                // validate if userID exists in the database

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

            if (!credentialsID) {
                // TODO: Implement error handling
                console.log('Phone number does not exist');
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
            console.log(error);
        }
    };

    // PATCH: "/user/:userID/password"
    patchPassword = async (req, res) => {
        try {
            let {password} = req.body;

            let {userID} = req.params;
                // let {userID} = req.user;

            // Validate if password is not null
                // validate if password exists in the database
            // Validate if userID is not null
                // validate if userID exists in the database
            
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
            console.log(error);
        }
    };

    // GET: "/user/:userID"
    getUserCredentials = async (req, res) => {
        try {
            let {userID} = req.params;
                // let {userID} = req.user;

            // Validate if userID is not null
                // validate if userID exists in the database

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
            console.log(error);
        }
    };
}

module.exports = CredentialsController;