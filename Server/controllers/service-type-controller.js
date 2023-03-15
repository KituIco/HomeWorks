class ServiceTypeController {
    constructor(
        serviceTypeRepo,
        clientErrors,
        serviceTypeValidator,
        nanoid
    ) {
        this.serviceTypeRepo = serviceTypeRepo;
        this.clientErrors = clientErrors;
        this.serviceTypeValidator = serviceTypeValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createServiceType = async (req, res, next) => {
        try {
            let {
                typeName,
                typeDesc,
                minServiceCost
            } = req.body;

            let typeID = this.nanoid(14);

            // TODO: Pre-query validation
            this.serviceTypeValidator.validateCreatePayload(req.body, ['typeName', 'typeDesc']);

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
            next(error);
        }
    };

    // PATCH: "/:typeID"
    patchServiceType = async (req, res, next) => {
        try {
            let {
                typeName,
                typeDesc,
                minServiceCost
            } = req.body;

            let {typeID} = req.params;

            // TODO: Pre-query validation
            this.serviceTypeValidator.checkRequiredParameters(req.params, ['typeID']);
            await this.serviceTypeValidator.validateExistence(typeID);
            this.serviceTypeValidator.validatePatchPayload(req.body);

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
            next(error);
        }
    };

    // DELETE: "/:typeID"
    deleteServiceType = async (req, res, next) => {
        try {
            let {typeID} = req.params;

            // TODO: Pre-query validation
            this.serviceTypeValidator.checkRequiredParameters(req.params, ['typeID']);
            await this.serviceTypeValidator.validateExistence(typeID);

            await this.serviceTypeRepo.deleteServiceType(typeID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getServiceTypes = async (req, res, next) => {
        try {
            let serviceTypes = await this.serviceTypeRepo.getServiceTypes();

            res.status(200).json({
                message: "Service Types retrieved successfully",
                body: serviceTypes
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:typeID"
    getServiceTypeByID = async (req, res, next) => {
        try {
            let {typeID} = req.params;

            // TODO: Pre-query validation
                // Validate if typeID is not null
            this.serviceTypeValidator.checkRequiredParameters(req.params, ['typeID']);

            let serviceType = await this.serviceTypeRepo.getServiceTypeByID(typeID);

            // TODO: Post-query validation
                // Validate if typeID exists in the database

            res.status(200).json({
                message: `Service Type ${typeID} retrieved successfully`,
                body: serviceType
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = ServiceTypeController;