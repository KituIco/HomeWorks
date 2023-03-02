class ProviderController {
    constructor (
        providerRepo,
        credentialsRepo,
        userRepo,
        clientErrors,
        serverErrors,
        providerValidator = null,
        nanoid,
        bcrypt,
        jwt
    ) {
        this.providerRepo = providerRepo;
        this.credentialsRepo = credentialsRepo;
        this.userRepo = userRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.providerValidator = providerValidator;
        this.nanoid = nanoid;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    // POST: ""
    createProvider = async (req, res) => {
        try {
            let {
                email,
                username,
                phoneNumber,
                password,
                firstName,
                lastName,
                birthDate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
                // validate if email, username, or phoneNumber follows the correct format
                // validate if email, username, or phoneNumber already exists in database

            // TODO: refactor line 45-47 when validation is implemented
            if (password !== null) {
                password = await this.bcrypt.hash(password, 10);
            }

            let providerID = this.nanoid(14);

            await this.userRepo.createUser(providerID);

            if (email !== null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    providerID,
                    email,
                    password
                );
            }

            if (phoneNumber !== null) {
                let credentialsID = this.nanoid(14);
                await this.credentialsRepo.createCredentials(
                    credentialsID,
                    providerID,
                    phoneNumber,
                    password
                );
            }

            if (username !== null) {
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
                birthDate,
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
                birthDate: birthDate,
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

            let token = this.jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m'
            })

            res.cookie('token', token, {
                maxAge: 900000,
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
            console.log(error);
        }
    };

    // PATCH: "/:providerID"
    patchProvider = async (req, res) => {
        try {
            let {
                firstName,
                lastName,
                birthDate,
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
                // validate if providerID exists
                // validate if necessary fields are not null

            await this.providerRepo.patchProvider(
                providerID,
                firstName,
                lastName,
                birthDate,
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
            console.log(error);
        }
    };

    // DELETE: "/:providerID"
    deleteProvider = async (req, res) => {
        try {
            let { providerID } = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
                // validate if providerID exists

            await this.providerRepo.deleteProvider(providerID);

            res.status(204)
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getProviders = async (req, res) => {
        try {
            let providers = await this.providerRepo.getProviders();

            res.status(200).json({
                message: "Providers retrieved successfully",
                body: providers
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:providerID"
    getProvider = async (req, res) => {
        try {
            let { providerID } = req.params;

            // TODO: Pre-query validation
                // validate if providerID is not null
            
            let provider = await this.providerRepo.getProvider(providerID);

            // TODO: Post-query validation
                // validate if provider exists

            res.status(200).json({
                message: `Provider ${providerID} retrieved successfully`,
                body: provider
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = ProviderController;