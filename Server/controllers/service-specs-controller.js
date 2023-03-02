class ServiceSpecsController {
    constructor(
        serviceSpecsRepo,
        clientErrors,
        serverErrors,
        serviceSpecsValidator = null,
        nanoid
    ) {
        this.serviceSpecsRepo = serviceSpecsRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.serviceSpecsValidator = serviceSpecsValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createServiceSpecs = async (req, res) => {
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
                // Validate if seekerID exists in database
                // Validate if typeID exists in database
                // Validate if addressID exists in database
            
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
            console.log(error);
        }
    };

    // PATCH: "/:specsID"
    patchServiceSpecs = async (req, res) => {
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
                // Validate if necessary values are not null
                // Validate if specsID is not null
                // Validate if specsID exists in database
                // Validate if seekerID exists in database
                // Validate if typeID exists in database
                // Validate if addressID exists in database
            
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
            console.log(error);
        }
    };

    // DELETE: "/:specsID"
    deleteServiceSpecs = async (req, res) => {
        try {
            let { specsID } = req.params;

            // TODO: Pre-query validation
                // Validate if specsID is not null
                // Validate if specsID exists in database
            
            await this.serviceSpecsRepo.deleteServiceSpecs(specsID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllServiceSpecs = async (req, res) => {
        try {
            let serviceSpecs = await this.serviceSpecsRepo.getAllServiceSpecs();

            res.status(200).json({
                message: "All Service Specs retrieved successfully",
                body: serviceSpecs
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
    
    // GET: "/seeker/:seekerID?sorted="
    getSortedSeekerSpecs = async (req, res, next) => {
        try {
            let { seekerID } = req.params;
            let { sorted } = req.query;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
                // Validate if seekerID exists in database

            if (!sorted) {
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
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID"
    getSeekerSpecs = async (req, res) => {
        try {
            let { seekerID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
                // Validate if seekerID exists in database

            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecs(seekerID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID/type/:typeID"
    getSeekerSpecsByType = async (req, res) => {
        try {
            let { seekerID, typeID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
                // Validate if seekerID exists in database
                // Validate if typeID is not null
                // Validate if typeID exists in database
            
            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByType(seekerID, typeID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} with Type ${typeID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/seeker/:seekerID/status/:statusID"
    getSeekerSpecsByStatus = async (req, res) => {
        try {
            let { seekerID, statusID } = req.params;

            // TODO: Pre-query validation
                // Validate if seekerID is not null
                // Validate if seekerID exists in database
                // Validate if statusID is not null
            
            let seekerSpecs = await this.serviceSpecsRepo.getSeekerSpecsByStatus(seekerID, statusID);

            res.status(200).json({
                message: `All Service Specs of Seeker ${seekerID} with Status ${statusID} retrieved successfully`,
                body: seekerSpecs
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/type/:typeID"
    getSpecsByType = async (req, res) => {
        try {
            let { typeID } = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null
                // Validate if typeID exists in database
            
            let specsByType = await this.serviceSpecsRepo.getSpecsByType(typeID);

            res.status(200).json({
                message: `All Service Specs with Type ${typeID} retrieved successfully`,
                body: specsByType
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/status/:statusID"
    getSpecsByStatus = async (req, res) => {
        try {
            let { statusID } = req.params;

            // TODO: Pre-query validation
                // Validate if statusID is not null
            
            let specsByStatus = await this.serviceSpecsRepo.getSpecsByStatus(statusID);

            res.status(200).json({
                message: `All Service Specs with Status ${statusID} retrieved successfully`,
                body: specsByStatus
            });

        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:specsID"
    getSpecsByID = async (req, res) => {
        try {
            let { specsID } = req.params;

            // TODO: Pre-query validation
                // Validate if specsID is not null
            
            let specsByID = await this.serviceSpecsRepo.getSpecsByID(specsID);

            // TODO: Post-query validation
                // Validate if specsID exists in database
            
            res.status(200).json({
                message: `Service Specs with ID ${specsID} retrieved successfully`,
                body: specsByID
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = ServiceSpecsController;