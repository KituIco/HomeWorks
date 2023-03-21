class ProviderController {
    constructor (
        providerRepo,
        credentialsRepo,
        userRepo,
        clientErrors,
        providerValidator,
        nanoid,
        bcrypt,
        jwt
    ) {
        this.providerRepo = providerRepo;
        this.credentialsRepo = credentialsRepo;
        this.userRepo = userRepo;
        this.clientErrors = clientErrors;
        this.providerValidator = providerValidator;
        this.nanoid = nanoid;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    // POST: ""
    createProvider = async (req, res, next) => {
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
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.providerValidator.validateCreatePayload(req.body, ['username', 'password', 'firstName', 'lastName'])
                // validate if email, username, or phoneNumber follows the correct format
                // validate if email, username, or phoneNumber already exists in database
            await this.providerValidator.validateIdentifiers({
                email,
                username,
                phoneNumber
            })

            this.providerValidator.validateIdentifierOrPassword(password, 'password');

            password = await this.bcrypt.hash(password, 10);

            let providerID = this.nanoid(14);

            await this.userRepo.createUser(providerID);

            if (email != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    providerID,
                    email,
                    password
                );
            }

            if (phoneNumber != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    providerID,
                    phoneNumber,
                    password
                );
            }

            if (username != null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    providerID,
                    username,
                    password
                );
            }

            await this.providerRepo.createProvider(
                providerID,
                firstName,
                lastName,
                birthdate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            );

            let createdProvider = {
                providerID: providerID,
                firstName: firstName,
                lastName: lastName,
                birthdate: birthdate,
                gender: gender,
                providerDp: providerDp,
                validID: validID,
                agencyID: agencyID,
                verified: verified,
                aveRating: aveRating
            };

            let user = {
                userID: providerID,
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
                message: "Provider created successfully",
                body: createdProvider
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:providerID"
    patchProvider = async (req, res, next) => {
        try {
            let {
                firstName,
                lastName,
                birthdate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            } = req.body;

            let { providerID } = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.providerValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.providerValidator.validateExistence(providerID);
                // validate if necessary fields are not null
            this.providerValidator.validatePatchPayload(req.body)

            await this.providerRepo.patchProvider(
                providerID,
                firstName,
                lastName,
                birthdate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            );

            let patchedProvider = {
                ...req.body
            };
            patchedProvider.providerID = providerID;

            res.status(200).json({
                message: `Provider ${providerID} patched successfully`,
                body: patchedProvider
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:providerID"
    deleteProvider = async (req, res, next) => {
        try {
            let { providerID } = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.providerValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.providerValidator.validateExistence(providerID);

            await this.providerRepo.deleteProvider(providerID);

            res.status(204)
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getProviders = async (req, res, next) => {
        try {
            let providers = await this.providerRepo.getProviders();

            res.status(200).json({
                message: "Providers retrieved successfully",
                body: providers
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:providerID"
    getProvider = async (req, res, next) => {
        try {
            let { providerID } = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.providerValidator.checkRequiredParameters(req.params, ['providerID']);
            
            let provider = await this.providerRepo.getProvider(providerID);

            // TODO: Post-query validation
                // validate if provider exists

            res.status(200).json({
                message: `Provider ${providerID} retrieved successfully`,
                body: provider
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

}

module.exports = ProviderController;