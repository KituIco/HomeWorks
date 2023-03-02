class AgencyController {
    constructor(
        agencyRepo,
        clientErrors,
        serverErrors,
        agencyValidator = null,
        nanoid
    ) {
        this.agencyRepo = agencyRepo;
        this.clientErrors = clientErrors;
        this.serverErrors = serverErrors;
        this.agencyValidator = agencyValidator;
        this.nanoid = nanoid;
    }
    // POST: ""
    createAgency = async(req, res) => {
        try {
            let {
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            } = req.body;

            // TODO: Pre-query validations
                // Validate if necessary fields are not null
            
            let agencyID = this.nanoid(14);

            await this.agencyRepo.createAgency(
                agencyID,
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            );
            
            let newAgency = {
                ...req.body
            }
            newAgency.agencyID = agencyID;

            res.status(201).json({
                message: 'Agency created successfully',
                body: newAgency
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/:agencyID"
    patchAgency = async(req, res) => {
        try {
            let {
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            } = req.body;
            
            let {agencyID} = req.params;

            // TODO: Pre-query validations
                // Validate if necessary fields are not null
                // Validate if agencyID is not null
                // Validate if agencyID exists in database
            
            await this.agencyRepo.patchAgency(
                agencyID,
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating
            );

            let updatedAgency = {
                ...req.body
            }
            updatedAgency.agencyID = agencyID;

            res.status(200).json({
                message: `Agency ${agencyID} updated successfully`,
                body: updatedAgency
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // DELETE: "/:agencyID"
    deleteAgency = async(req, res) => {
        try {
            let {agencyID} = req.params;

            // TODO: Pre-query validations
                // Validate if agencyID is not null
                // Validate if agencyID exists in database

            await this.agencyRepo.deleteAgency(agencyID);
            res.status(204)
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:agencyID"
    getAgencyByID = async(req, res) => {
        try {
            let {agencyID} = req.params;

            // TODO: Pre-query validations
                // Validate if agencyID is not null

            let agency = await this.agencyRepo.getAgencyByID(agencyID);

            // TODO: Post-query validations
                // Validate if agency length is not 0
            
            res.status(200).json({
                message: `Agency ${agencyID} retrieved successfully`,
                body: agency
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: ""
    getAllAgency = async(req, res) => {
        try {
            let agencies = await this.agencyRepo.getAllAgency();
            
            res.status(200).json({
                message: 'Agencies retrieved successfully',
                body: agencies
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:agencyID/providers"
    getAgencyProviders = async(req, res) => {
        try {
            let {agencyID} = req.params;

            // TODO: Pre-query validations
                // Validate if agencyID is not null
                // Validate if agencyID exists in database
            
            let providers = await this.agencyRepo.getAgencyProviders(agencyID);
            res.status(200).json({
                message: `Providers of agency ${agencyID} retrieved successfully`,
                body: providers
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:agencyID/service-types"
    getAgencyServiceTypes = async(req, res) => {
        try {
            let {agencyID} = req.params;

            // TODO: Pre-query validations
                // Validate if agencyID is not null
                // Validate if agencyID exists in database
            
            let serviceTypes = await this.agencyRepo.getAgencyServiceTypes(agencyID);

            res.status(200).json({
                message: `Service types of agency ${agencyID} retrieved successfully`,
                body: serviceTypes
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/:agencyID/providers?providerID="
    addProviderToAgency = async(req, res) => {
        try {
            let {agencyID} = req.params;
            let {providerID} = req.query;

            // TODO: Pre-query validations
                // Validate if agencyID is not null
                // Validate if providerID is not null
                // Validate if agencyID exists in database
                // Validate if providerID exists in database

            await this.agencyRepo.addProviderToAgency(agencyID, providerID);

            // TODO: Post-query validations
                // Get updated provider
            res.status(200).json({
                message: `Provider ${providerID} added to agency ${agencyID} successfully`
                // body: updatedProvider
            });

        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // PATCH: "/providers/:providerID"
    removeProviderFromAgency = async(req, res) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validations
                // Validate if providerID is not null
                // Validate if providerID exists in database
            
            await this.agencyRepo.removeProviderFromAgency(providerID);

            // TODO: Post-query validations
                // Get updated provider
            res.status(200).json({
                message: `Provider ${providerID} removed from agency successfully`
                // body: updatedProvider
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };

    // GET: "/:agencyID/search-name?searchQuery="
    searchProviderInAgency = async(req, res) => {
        try {
            let {agencyID} = req.params;
            let {searchQuery} = req.query;

            // TODO: Pre-query validations
                // Validate if agencyID is not null
                // Validate if searchQuery is not null
                // Validate if agencyID exists in database

            let providers = await this.agencyRepo.searchProviderInAgency(agencyID, searchQuery);

            res.status(200).json({
                message: `Providers of agency ${agencyID} retrieved successfully`,
                body: providers
            });
        } catch (error) {
            //TODO: Handle error
            console.log(error);
        }
    };
}

module.exports = AgencyController;