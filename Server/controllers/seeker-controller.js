class SeekerController {
    constructor (
        seekerRepo,
        credentialsRepo,
        userRepo,
        clientErrors,
        seekerValidator,
        nanoid,
        bcrypt,
        jwt
    ) {
        this.seekerRepo = seekerRepo;
        this.credentialsRepo = credentialsRepo;
        this.userRepo = userRepo;
        this.clientErrors = clientErrors;
        this.seekerValidator = seekerValidator;
        this.nanoid = nanoid;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }
    
    // POST: ""
    createSeeker = async (req, res, next) => {
        try {
            let {
                email,
                username,
                phoneNumber,
                password,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDp,
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.seekerValidator.validateCreatePayload(req.body, ['username', 'password', 'firstName', 'lastName']);
                // validate if email, username, or phoneNumber follows the correct format
                // validate if email, username, or phoneNumber already exists in database
            await this.seekerValidator.validateIdentifiers({
                    email,
                    username,
                    phoneNumber
            })
            
            this.seekerValidator.validateIdentifierOrPassword(password, 'password');

            password = await this.bcrypt.hash(password, 10);

            let seekerID = this.nanoid(14);

            await this.userRepo.createUser(seekerID,);

            if (email != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    seekerID,
                    email,
                    password
                );
            };

            if (username != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    seekerID,
                    username,
                    password
                );
            };

            if (phoneNumber != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    seekerID,
                    phoneNumber,
                    password
                );
            };

            await this.seekerRepo.createSeeker(
                seekerID,
                firstName,
                lastName,
                birthdate || null,
                gender,
                seekerDp
            );

            let createdSeeker = {
                seekerID: seekerID,
                firstName: firstName,
                lastName: lastName,
                birthdate: birthdate,
                gender: gender,
                seekerDp: seekerDp
            };

            let user = {
                userID: seekerID
            }

            let accessToken = this.jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m'
            })

            let refreshToken = this.jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d'
            })

            res.cookie('access_token', accessToken, {
                maxAge: 900000,
                // httpOnly: true,
                // secure: true
                // domain: 'correct domain'
            });

            res.cookie('refresh_token', refreshToken, {
                maxAge: 604800000,
                // httpOnly: true,
                // secure: true
                // domain: 'correct domain'
            });

            res.status(201).json({
                message: "Seeker created successfully",
                body: createdSeeker
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:seekerId"
        // can get seekerID from req.user.userID
    patchSeeker = async (req, res, next) => {
        try {
            let {
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDp
            } = req.body;

            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // validate if seekerID is not null
            this.seekerValidator.checkRequiredParameters(req.params, ['seekerID']);
                // validate if seekerID exists
            await this.seekerValidator.validateExistence(seekerID);
                // validate if necessary fields are not null
            this.seekerValidator.validatePatchPayload(req.body);
            
            await this.seekerRepo.patchSeeker(
                seekerID,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDp
            );

            let patchedSeeker = {
                ...req.body,
            }

            patchedSeeker.seekerID = seekerID;

            res.status(200).json({
                message: `Seeker ${seekerID} patched successfully`,
                body: patchedSeeker
            });    
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:seekerId"
    deleteSeeker = async (req, res, next) => {
        try{
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // validate if seekerID is not null
            this.seekerValidator.checkRequiredParameters(req.params, ['seekerID']);
                // validate if seekerID exists
            await this.seekerValidator.validateExistence(seekerID);
            
            await this.seekerRepo.deleteSeeker(seekerID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getSeekers = async (req, res, next) => {
        try {
            let seekers = await this.seekerRepo.getSeekers();

            res.status(200).json({
                message: "Seekers retrieved successfully",
                body: seekers
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:seekerId"
    getSeeker = async (req, res, next) => {
        try {
            let {seekerID} = req.params;

            // TODO: Pre-query validation
                // validate if seekerID is not null
            this.seekerValidator.checkRequiredParameters(req.params, ['seekerID']);

            let seeker = await this.seekerRepo.getSeeker(seekerID);

            // TODO: Post-query validation
                // validate if seekerID exists
            
            res.status(200).json({
                message: `Seeker ${seekerID} retrieved successfully`,
                body: seeker
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // POST: "/mail"
    checkSeekerMail = async (req, res, next) => {
        try {
            let {
                email,
            } = req.body;

            // validate if email already exists in database
            await this.seekerValidator.validateIdentifiers({ email })
            
            res.status(201).json({
                message: "Email not yet Taken",
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = SeekerController;