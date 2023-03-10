class ServiceTypeController {
    constructor(
        serviceTypeRepo,
        clientErrors,
        serverErrors,
        serviceTypeValidator = null,
        nanoid
    ) {
        this.serviceTypeRepo = serviceTypeRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.serviceTypeValidator = serviceTypeValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createServiceType = async (req, res) => {
        try {
            let {
                typeName,
                typeDesc,
                minServiceCost
            } = req.body;

            let typeID = this.nanoid(14);

            // TODO: Pre-query validation
                // Validate if typeName is not null
                // Validate if typeDesc is not null

            await this.serviceTypeRepo.createServiceType(
                typeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            let createServiceType = {
                ...req.body
            }

            createServiceType.typeID = typeID;

            res.status(201).json({
                message: "Service Type created successfully",
                body: createServiceType
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/:typeID"
    patchServiceType = async (req, res) => {
        try {
            let {
                typeName,
                typeDesc,
                minServiceCost
            } = req.body;

            let {typeID} = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null
                // Validate if typeID exists in the database
                // Validate if typeName is not null
                // Validate if typeDesc is not null

            await this.serviceTypeRepo.patchServiceType(
                typeID,
                typeName,
                typeDesc,
                minServiceCost
            );

            let patchServiceType = {
                ...req.body
            }

            patchServiceType.typeID = typeID;

            res.status(200).json({
                message: `Service Type ${typeID} patched successfully`,
                body: patchServiceType
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // DELETE: "/:typeID"
    deleteServiceType = async (req, res) => {
        try {
            let {typeID} = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null
                // Validate if typeID exists in the database

            await this.serviceTypeRepo.deleteServiceType(typeID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getServiceTypes = async (req, res) => {
        try {
            let serviceTypes = await this.serviceTypeRepo.getServiceTypes();

            res.status(200).json({
                message: "Service Types retrieved successfully",
                body: serviceTypes
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:typeID"
    getServiceTypeByID = async (req, res) => {
        try {
            let {typeID} = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null

            let serviceType = await this.serviceTypeRepo.getServiceTypeByID(typeID);

            // TODO: Post-query validation
                // Validate if typeID exists in the database

            res.status(200).json({
                message: `Service Type ${typeID} retrieved successfully`,
                body: serviceType
            });
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = ServiceTypeController;