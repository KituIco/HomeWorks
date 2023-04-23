class ServiceController {
    constructor(
        serviceRepo,
        clientErrors,
        serviceValidator,
        nanoid
    ) {
        this.serviceRepo = serviceRepo;
        this.clientErrors = clientErrors;
        this.serviceValidator = serviceValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createService = async (req, res, next) => {
        try {
            let {
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceRating
            } = req.body;

            // TODO: Pre-query validation
                // validate if necessary fields are not null
            this.serviceValidator.validateCreatePayload(req.body, ['providerID', 'typeID', 'typeName']);
                // validate if providerID exists in the database
            await this.serviceValidator.validateExistence(providerID, 'provider');
                // validate if typeID exists in the database
            await this.serviceValidator.validateExistence(typeID, 'type');

            let serviceID = this.nanoid(14);

            await this.serviceRepo.createService(
                serviceID,
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceRating
            );

            let createdService = {
                ...req.body,
            }

            createdService.serviceID = serviceID;

            res.status(201).json({
                message: "Service created successfully",
                body: createdService
            });
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };

    // PATCH: "/:serviceID"
    patchService = async (req, res, next) => {
        try {
            let {
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceEnabled,
                serviceRating,
                totalReviews,
                reviewsCount,
                fiveStar,
                fourStar,
                threeStar,
                twoStar,
                oneStar
            } = req.body;

            let {serviceID} = req.params;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['serviceID']);
                // validate if serviceID exists
            await this.serviceValidator.validateExistence(serviceID, 'service');
                // validate if necessary fields are not null
            this.serviceValidator.validatePatchPayload(req.body);
                // validate if providerID exists in the database
            providerID != null && await this.serviceValidator.validateExistence(providerID, 'provider');
                // validate if typeID exists in the database
            typeID != null && await this.serviceValidator.validateExistence(typeID, 'type');

            await this.serviceRepo.patchService(
                serviceID,
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceEnabled,
                serviceRating,
                totalReviews,
                reviewsCount,
                fiveStar,
                fourStar,
                threeStar,
                twoStar,
                oneStar
            );

            let patchedService = {
                ...req.body,
            }

            patchedService.serviceID = serviceID;

            res.status(200).json({
                message: `Service with ID ${serviceID} patched successfully`,
                body: patchedService
            });
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };

    // DELETE: "/:serviceID"
    deleteService = async (req, res, next) => {
        try {
            let {serviceID} = req.params;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['serviceID']);
                // validate if serviceID exists
            await this.serviceValidator.validateExistence(serviceID, 'service');
            
            await this.serviceRepo.deleteService(serviceID);

            res.status(204);
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };

    // GET: ""
    getAllServices = async (req, res, next) => {
        try {
            let services = await this.serviceRepo.getAllServices();

            res.status(200).json({
                message: "All services retrieved successfully",
                body: services
            });
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };

    // GET: "/provider/:providerID?sorted=?&searchKey="
    getProviderServiceByKeyword = async (req, res, next) => {
        try {
            let { providerID } = req.params;
            let { searchKey, sorted } = req.query;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.serviceValidator.validateExistence(providerID, 'provider');

            if (searchKey == null) {
                return next();
            }

            // TODO: Validate if sorted is not null otherwise throw error

            let services = await this.serviceRepo.getProviderServiceByKeyword(providerID, searchKey);

            res.status(200).json({
                message: `Services of provider ${providerID} retrieved successfully fitlered by keyword ${searchKey}`,
                body: services
            });
        } catch (error) {
            // TODO: Implement error handling
            next();
        }
    }

    // GET: "/provider/:providerID?sorted="
    getProviderServicesSorted = async (req, res, next) => {
        try {
            let { providerID } = req.params;
            let { sorted } = req.query;

            // TODO: Pre-query validation
                // validate if providerID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.serviceValidator.validateExistence(providerID, 'provider');

            if (sorted == null) {
                return next();
            }

            let services = null;
            if (sorted === 'asc') {
                services = await this.serviceRepo.getProviderServicesAsc(providerID);
            } else if (sorted === 'desc') {
                services = await this.serviceRepo.getProviderServicesDesc(providerID);
            }

            res.status(200).json({
                message: `Services of provider ${providerID} retrieved successfully sorted in ${sorted} order`,
                body: services
            });
        } catch (error) {
            // TODO: Implement error handling
            next();
        }
    };

    // GET: "/provider/:providerID"
    getProviderServices = async (req, res, next) => {
        try {
            let { providerID } = req.params;
            
            // TODO: Pre-query validation
                // validate if providerID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['providerID']);
                // validate if providerID exists
            await this.serviceValidator.validateExistence(providerID, 'provider');
            
            let services = await this.serviceRepo.getProviderServices(providerID);

            res.status(200).json({
                message: `Services of provider ${providerID} retrieved successfully`,
                body: services
            });
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };

    // GET: "/:serviceID"
    getService = async (req, res, next) => {
        try {
            let { serviceID } = req.params;

            // TODO: Pre-query validation
                // validate if serviceID is not null
            this.serviceValidator.checkRequiredParameters(req.params, ['serviceID']);
            
            let service = await this.serviceRepo.getService(serviceID);

            // TODO: Post-query validation
                // validate if serviceID exists
            
            res.status(200).json({
                message: `Service with ID ${serviceID} retrieved successfully`,
                body: service
            });
        } catch (error) {
            // TODO: Implement error handling
            next(error);
        }
    };
}

module.exports = ServiceController;