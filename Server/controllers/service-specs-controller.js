class ServiceSpecsController {
    constructor(
        serviceSpecsRepo,
        clientErrors,
        serviceSpecsValidator,
        nanoid
    ) {
        this.serviceSpecsRepo = serviceSpecsRepo;
        this.clientErrors = clientErrors;
        this.serviceSpecsValidator = serviceSpecsValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createServiceSpecs = async (req, res, next) => {
        try {
            let {
                seekerID,
                typeID,
                addressID,
                specsDesc,
                images,
                specsStatus,
                specsTimeStamp
            } = req.body;

            // TODO: Pre-query validation
                // Validate if necessary values are not null
            this.serviceSpecsValidator.validateCreatePayload(req.body, ['seekerID', 'typeID'])
                // Validate if seekerID exists in database
            await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');
                // Validate if typeID exists in database
            await this.serviceSpecsValidator.validateExistence(typeID, 'type');
                // Validate if addressID exists in database
            await this.serviceSpecsValidator.validateExistence(addressID, 'address');
            
            let specsID = this.nanoid(14);

            await this.serviceSpecsRepo.createServiceSpecs(
                specsID,
                seekerID,
                typeID,
                addressID,
                specsDesc,
                images,
                specsStatus,
                specsTimeStamp
            );

            let createServiceSpecs = {
                ...req.body
            }

            createServiceSpecs.specsID = specsID;

            res.status(201).json({
                message: "Service Specs created successfully",
                body: createServiceSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:specsID"
    patchServiceSpecs = async (req, res, next) => {
        try {
            let { specsID } = req.params;
            let {
                seekerID,
                typeID,
                addressID,
                specsDesc,
                images,
                specsStatus,
                specsTimeStamp
            } = req.body;

            // TODO: Pre-query validation
                // Validate if specsID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['specsID'])
                // Validate if specsID exists in database
            await this.serviceSpecsValidator.validateExistence(specsID, 'specs');
                // Validate if necessary values are not null
            this.serviceSpecsValidator.validatePatchPayload(req.body);
                // Validate if seekerID exists in database
            seekerID != null && await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');
                // Validate if typeID exists in database
            typeID != null && await this.serviceSpecsValidator.validateExistence(typeID, 'type');
                // Validate if addressID exists in database
            addressID != null && await this.serviceSpecsValidator.validateExistence(addressID, 'address');
            
            await this.serviceSpecsRepo.patchServiceSpecs(
                specsID,
                seekerID,
                typeID,
                addressID,
                specsDesc,
                images,
                specsStatus,
                specsTimeStamp
            );

            let patchServiceSpecs = {
                ...req.body
            }

            patchServiceSpecs.specsID = specsID;

            res.status(200).json({
                message: `Service Specs ${specsID} patched successfully`,
                body: patchServiceSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:specsID"
    deleteServiceSpecs = async (req, res, next) => {
        try {
            let { specsID } = req.params;

            // TODO: Pre-query validation
                // Validate if specsID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['specsID'])
                // Validate if specsID exists in database
            await this.serviceSpecsValidator.validateExistence(specsID, 'specs');
            
            await this.serviceSpecsRepo.deleteServiceSpecs(specsID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllServiceSpecs = async (req, res, next) => {
        try {
            let serviceSpecs = await this.serviceSpecsRepo.getAllServiceSpecs();

            res.status(200).json({
                message: "All Service Specs retrieved successfully",
                body: serviceSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
    
    // GET: "/seeker/:seekerID?sorted="
    getSortedSeekerSpecs = async (req, res, next) => {
        try {
            let { seekerID } = req.params;
            let { sorted } = req.query;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['seekerID'])
                // Validate if seekerID exists in database
            await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');

            if (sorted == null) {
                return next();
            }

            let seekerSpecs = null

            if (sorted === 'asc') {
                seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByDateAsc(seekerID);
            } else if (sorted === 'desc') {
                seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByDateDesc(seekerID);
            }

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} ordered by ${sorted} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next();
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerSpecs = async (req, res, next) => {
        try {
            let { seekerID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['seekerID'])
                // Validate if seekerID exists in database
            await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');

            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecs(seekerID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/seeker/:seekerID/type/:typeID"
    getSeekerSpecsByType = async (req, res, next) => {
        try {
            let { seekerID, typeID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID and typeID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['seekerID', 'typeID'])
                // Validate if seekerID exists in database
            await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');
                // Validate if typeID exists in database
            await this.serviceSpecsValidator.validateExistence(typeID, 'type');
            
            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByType(seekerID, typeID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} with Type ${typeID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/seeker/:seekerID/status/:statusID"
    getSeekerSpecsByStatus = async (req, res, next) => {
        try {
            let { seekerID, statusID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['seekerID', 'statusID'])
                // Validate if seekerID exists in database
            await this.serviceSpecsValidator.validateExistence(seekerID, 'seeker');
            
            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByStatus(seekerID, statusID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} with Status ${statusID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/type/:typeID"
    getSpecsByType = async (req, res, next) => {
        try {
            let { typeID } = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['typeID'])
                // Validate if typeID exists in database
            await this.serviceSpecsValidator.validateExistence(typeID, 'type');
            
            let specsByType = await this.serviceSpecsRepo.getSpecsByType(typeID);

            res.status(200).json({
                message: `All Service Specs with Type ${typeID} retrieved successfully`,
                body: specsByType
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/status/:statusID"
    getSpecsByStatus = async (req, res, next) => {
        try {
            let { statusID } = req.params;

            // TODO: Pre-query validation
                // Validate if statusID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['statusID'])
            
            let specsByStatus = await this.serviceSpecsRepo.getSpecsByStatus(statusID);

            res.status(200).json({
                message: `All Service Specs with Status ${statusID} retrieved successfully`,
                body: specsByStatus
            });

        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:specsID"
    getSpecsByID = async (req, res) => {
        try {
            let { specsID } = req.params;

            // TODO: Pre-query validation
                // Validate if specsID is not null
            this.serviceSpecsValidator.checkRequiredParameters(req.params, ['specsID'])
            
            let specsByID = await this.serviceSpecsRepo.getSpecsByID(specsID);

            // TODO: Post-query validation
                // Validate if specsID exists in database
            
            res.status(200).json({
                message: `Service Specs with ID ${specsID} retrieved successfully`,
                body: specsByID
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = ServiceSpecsController;